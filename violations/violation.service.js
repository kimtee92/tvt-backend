const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Violation = db.Violation;

module.exports = {
    getAll,
    getByLicense,
    getByLicenseAll,
    create,
    update,
    pay,
    issueMany
};

async function getAll() {
    return await Violation.find().select('-hash');
}

async function getByLicense(ViolationParam) {
    return await Violation.find({ licenseNo: ViolationParam, settled: false });
}

async function getByLicenseAll(driverParam) {
    return await Violation.find({ licenseNo: driverParam });
}

async function create(ViolationParam) {
    const violation = new Violation(ViolationParam);
    // save Violation
    await violation.save();
}

async function update(id, ViolationParam) {
    const Violation = await Violation.findById(id);

    // validate
    if (!Violation) throw 'Violation not found';

    // copy ViolationParam properties to Violation
    Object.assign(Violation, ViolationParam);

    await Violation.save();
}

async function pay(id) {
    var res = id.split(",");
    return await Violation.updateMany({ _id: { $in: res } }, { $set: { settled: true } });
}

async function issueMany(violations) {
    console.log(violations);
    return await Violation.insertMany(violations)
    .catch(err => {
        throw console.log(`${err}`);
    });
}