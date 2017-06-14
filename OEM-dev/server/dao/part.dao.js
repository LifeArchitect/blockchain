'use strict';

var mongoose = require('mongoose');
var _ = require('lodash');

var Part = require('./../models/part.model.js');
var ManufactureTransaction = require('./../models/manufacture_transaction.model.js');
var SaleTransaction = require('./../models/sale_transaction.model.js');

var _this = this;

exports.findPartsPromiseById = function (id) {
    console.log(id)
    var part = Part.find({serialNo:id}).exec();
    console.log("finding part...");
    console.log("result =" + part);
    return part;
};

exports.createPartsPromise = function (part) {
    
    console.log("creating part promise...")
    console.log(part);
    //ManufactureTransaction.create(part); 
    Part.create(part); 
    ManufactureTransaction.create(part);
    
};

exports.deletePartsByIdPromise = function (id) {
    return Part.findById(id).remove().exec();
};

exports.findTransactionsPromiseById = function (id) {
    var transactions = JSON.stringify(ManufactureTransaction.find({serialNo:id}).exec()) + JSON.stringify(SaleTransaction.find({serialNo:id}).exec());
    return transactions;
}

