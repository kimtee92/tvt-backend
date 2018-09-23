const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Violation = db.Violation;

module.exports = {
    getAll,
    getById,
    getByLicense,
    create,
    update
};

async function getAll() {
    return await Violation.find().select('-hash');
}

async function getById(id) {
    return await Violation.findById(id).select('-hash');
}

async function getByLicense(ViolationParam) {
    return await Violation.find({ licenseNo: ViolationParam, settled: false});
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