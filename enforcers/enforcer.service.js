const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Enforcer = db.Enforcer;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const enforcer = await Enforcer.findOne({ username });
    if (enforcer && bcrypt.compareSync(password, enforcer.hash)) {
        const { hash, ...enforcerWithoutHash } = enforcer.toObject();
        const token = jwt.sign({ sub: enforcer.id }, config.secret);
        return {
            ...enforcerWithoutHash,
            token
        };
    }
}

async function getAll() {
    return await Enforcer.find().select('-hash');
}

async function getById(id) {
    return await Enforcer.findById(id).select('-hash');
}

async function create(enforcerParam) {
    // validate
    if (await Enforcer.findOne({ username: enforcerParam.username })) {
        throw 'Username "' + enforcerParam.username + '" is already taken';
    }

    if (await Enforcer.findOne({ email: enforcerParam.email })) {
        throw 'Email "' + enforcerParam.email + '" is already taken';
    }

    if (await Enforcer.findOne({ enforcerNo: enforcerParam.enforcerNo })) {
        throw 'Enforcer Number "' + enforcerParam.enforcerNo + '" is already taken';
    }

    const enforcer = new Enforcer(enforcerParam);

    // hash password
    if (enforcerParam.password) {
        enforcer.hash = bcrypt.hashSync(enforcerParam.password, 10);
    }

    // save enforcer
    await enforcer.save();
}

async function update(id, enforcerParam) {
    const enforcer = await Enforcer.findById(id);

    // validate
    if (!enforcer) throw 'Enforcer not found';
    if (enforcer.username !== enforcerParam.username && await Enforcer.findOne({ username: enforcerParam.username })) {
        throw 'Username "' + enforcerParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (enforcerParam.password) {
        enforcerParam.hash = bcrypt.hashSync(enforcerParam.password, 10);
    }

    // copy enforcerParam properties to enforcer
    Object.assign(enforcer, enforcerParam);

    await enforcer.save();
}

async function _delete(id) {
    await Enforcer.findByIdAndRemove(id);
}