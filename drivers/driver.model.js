const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    nationality: { type: String, required: true },
    licenseNo: { type: String, required: true },
    contactNo: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },    
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Driver', schema);