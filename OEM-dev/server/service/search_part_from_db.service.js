var manufactureTransactionDao = require('../dao/manufacture_transaction.dao');
var partDao = require('../dao/part.dao');

var config = require('../config/environment');
var _this = this;

var contract_instance;
var when = require('when');


exports.searchPartHistoryById= function searchPartHistoryById(part_id) {

  console.log(part_id);

  return when(partDao.findPartsPromiseById(part_id));
  
}

