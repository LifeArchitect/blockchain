'use strict';

var express = require('express');
var controller = require('./search_part_history_from_db.controller');

var router = express.Router();

router.get('/:id', controller.searchPartHistory);

module.exports = router;
