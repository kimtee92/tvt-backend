﻿require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//put headers for cors
app.use(function (req, res, next) {
  var allowedOrigins = ['https://tvt-driver.herokuapp.com'];
  var origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/drivers', require('./drivers/drivers.controller'));
app.use('/violations', require('./violations/violations.controller'));

// global error handler
app.use(errorHandler);

// start server
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
