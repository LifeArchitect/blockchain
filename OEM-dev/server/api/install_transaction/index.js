'use strict';

var express = require('express');
var controller = require('./install_transaction.controller');

var router = express.Router();

router.post('/', controller.create);

module.exports = router;
