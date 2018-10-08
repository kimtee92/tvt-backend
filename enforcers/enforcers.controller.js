const express = require('express');
const router = express.Router();
const enforcerService = require('./enforcer.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function authenticate(req, res, next) {
    enforcerService.authenticate(req.body)
        .then(driver => driver ? res.json(driver) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    enforcerService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getById(req, res, next) {
    enforcerService.getById(req.params.id)
        .then(driver => driver ? res.json(driver) : res.sendStatus(404))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    enforcerService.getAll()
        .then(drivers => res.json(drivers))
        .catch(err => next(err));
}

function update(req, res, next) {
    enforcerService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    enforcerService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}