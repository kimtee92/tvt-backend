const express = require('express');
const router = express.Router();
const violationService = require('./violation.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.get('/view/:ViolationParam', getByLicense);
router.put('/:id', update);

module.exports = router;

function input(req, res, next) {
    violationService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getById(req, res, next) {
    violationService.getById(req.params.id)
        .then(driver => driver ? res.json(driver) : res.sendStatus(404))
        .catch(err => next(err));
}

function getByLicense(req, res, next) {
    violationService.getByLicense(req.params.ViolationParam)
        .then(violations => violations ? res.json(violations) : res.sendStatus(404))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    violationService.getAll()
        .then(drivers => res.json(drivers))
        .catch(err => next(err));
}

function update(req, res, next) {
    violationService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}