'use strict';

var express = require('express');
var controller = require('./sell_transaction.controller');

var router = express.Router();

router.post('/', controller.create);

module.exports = router;
