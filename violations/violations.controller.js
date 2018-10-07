const express = require('express');
const router = express.Router();
const violationService = require('./violation.service');

// routes
router.get('/', getAll);
router.get('/view/:ViolationParam', getByLicense);
router.get('/history/:driverParam', getByLicenseAll);
router.put('/:id', update);
router.get('/paybyid/:id', pay);
router.post('/issue', issueMany);

module.exports = router;

function input(req, res, next) {
    violationService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getByLicense(req, res, next) {
    violationService.getByLicense(req.params.ViolationParam)
        .then(violations => violations ? res.json(violations) : res.sendStatus(404))
        .catch(err => next(err));
}

function getByLicenseAll(req, res, next) {
    violationService.getByLicenseAll(req.params.driverParam)
        .then(history => history ? res.json(history) : res.sendStatus(404))
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

function pay(req, res, next) {
    violationService.pay(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function issueMany(req, res, next) {
    violationService.issueMany(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}