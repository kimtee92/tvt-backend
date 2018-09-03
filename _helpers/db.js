const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(config.connectionString).catch((error) => { console.log(error); });
mongoose.Promise = global.Promise;

module.exports = {
    Driver: require('../drivers/driver.model')
};