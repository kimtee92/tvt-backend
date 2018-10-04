const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    licenseNo: { type: String, required: true },
    violation: { type: String, required: true },
    enforcerId: { type: String, required: true },
    fine: Schema.Types.Decimal128,   
    remarks: { type: String, required: false }, 
    settled: { type: Boolean, default: false }, 
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Violation', schema);