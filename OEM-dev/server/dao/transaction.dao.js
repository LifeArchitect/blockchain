'use strict';

var mongoose = require('mongoose');
var _ = require('lodash');

var Transactions = require('./../models/transaction.model.js');
var assert = require('assert');
var _this = this;

exports.findTransactionsPromiseById = function (id) {
    var transaction = Transactions[0].find({customId:id}).exec();
    console.log("finding part...");
    console.log(transaction);
    return transaction;
};

exports.createTransactionsPromise = function (transaction) {
  
    console.log("creating transaction promise...");
    console.log(transaction);

    return Transactions.create(transaction,  function(error, transactions) {
        assert.ifError(error);
        assert.ok(transactions[0] instanceof Transactions.Transaction);       

    }); 
};

exports.deleteTransactionsByIdPromise = function (id) {
    return Transactions.find({customId:id}).remove().exec();
};