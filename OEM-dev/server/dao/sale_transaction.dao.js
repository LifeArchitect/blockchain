'use strict';

var mongoose = require('mongoose');
var _ = require('lodash');

var SaleTransaction = require('./../models/sale_transaction.model.js');

var _this = this;

exports.findSaleTransactionsPromise = function () {
    return SaleTransaction.find().exec();
}

exports.findSaleTransactionByCustomIdPromise = function (id) {
    return SaleTransaction.findOne({customId:id}).exec();
}

exports.createSaleTransactionPromise = function (sale_transaction) {
    SaleTransaction.create(sale_transaction); 
};