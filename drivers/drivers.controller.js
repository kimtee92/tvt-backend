const express = require('express');
const router = express.Router();
const driverService = require('./driver.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/driver/:num', getDriver);
router.get('/:id', getById);
router.get('/current', getCurrent);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function authenticate(req, res, next) {
    driverService.authenticate(req.body)
        .then(driver => driver ? res.json(driver) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    driverService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getById(req, res, next) {
    driverService.getById(req.params.id)
        .then(driver => driver ? res.json(driver) : res.sendStatus(404))
        .catch(err => next(err));
}

function getDriver(req, res, next) {
    driverService.getDriver(req.params.num)
        .then(driver => driver ? res.json(driver) : res.sendStatus(404))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    driverService.getAll()
        .then(drivers => res.json(drivers))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    driverService.getById(req.params.sub)
        .then(driver => driver ? res.json(driver) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    driverService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    driverService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}