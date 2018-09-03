const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Driver = db.Driver;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const driver = await Driver.findOne({ username });
    if (driver && bcrypt.compareSync(password, driver.hash)) {
        const { hash, ...driverWithoutHash } = driver.toObject();
        const token = jwt.sign({ sub: driver.id }, config.secret);
        return {
            ...driverWithoutHash,
            token
        };
    }
}

async function getAll() {
    return await Driver.find().select('-hash');
}

async function getById(id) {
    return await Driver.findById(id).select('-hash');
}

async function create(driverParam) {
    // validate
    if (await Driver.findOne({ username: driverParam.username })) {
        throw 'Username "' + driverParam.username + '" is already taken';
    }

    if (await Driver.findOne({ email: driverParam.email })) {
        throw 'Email "' + driverParam.email + '" is already taken';
    }

    if (await Driver.findOne({ licenseNo: driverParam.licenseNo })) {
        throw 'License Number "' + driverParam.licenseNo + '" is already taken';
    }

    const driver = new Driver(driverParam);

    // hash password
    if (driverParam.password) {
        driver.hash = bcrypt.hashSync(driverParam.password, 10);
    }

    // save driver
    await driver.save();
}

async function update(id, driverParam) {
    const driver = await Driver.findById(id);

    // validate
    if (!driver) throw 'Driver not found';
    if (driver.drivername !== driverParam.drivername && await Driver.findOne({ drivername: driverParam.drivername })) {
        throw 'Drivername "' + driverParam.drivername + '" is already taken';
    }

    // hash password if it was entered
    if (driverParam.password) {
        driverParam.hash = bcrypt.hashSync(driverParam.password, 10);
    }

    // copy driverParam properties to driver
    Object.assign(driver, driverParam);

    await driver.save();
}

async function _delete(id) {
    await Driver.findByIdAndRemove(id);
}