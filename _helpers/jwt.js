const expressJwt = require('express-jwt');
const config = require('config.json');
const driverService = require('../drivers/driver.service');
const enforcerService = require('../enforcers/enforcer.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            // '/users/authenticate',
            '/drivers/register',
            '/drivers/authenticate',
            '/enforcers/register',
            '/enforcers/authenticate',
        ]
    });
}

async function isRevoked(req, payload, done) {
    const driver = await driverService.getById(payload.sub);
    const enforcer = await enforcerService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!(!driver || !enforcer)) {
        return done(null, true);
    }

    done();
};