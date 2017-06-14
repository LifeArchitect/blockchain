'use strict';

var mongoose = require('mongoose');
var _ = require('lodash');

var ManufactureTransaction = require('./../models/manufacture_transaction.model.js');

var _this = this;

exports.findManufactureTransactionsPromise = function () {
    return ManufactureTransaction.find().exec();
}

exports.findManufactureTransactionByCustomIdPromise = function (id) {
    return ManufactureTransaction.findOne({customId:id}).exec();
}

exports.createManufactureTransactionPromise = function (manufacture_transaction) {
    return ManufactureTransaction.create(manufacture_transaction); 
};

exports.updateManufactureTransactionPromise = function (manufacture_transaction) {
    var promise = new mongoose.Promise;

    var manufacture_transactionId;
    if (manufacture_transaction._id) {
        manufacture_transactionId = manufacture_transaction._id;
        delete manufacture_transaction._id;
    }

    _this.findManufactureTransactionByUnderscoreIdPromise(manufacture_transactionId)
        .then(function(manufacture_transactionToUpdate){
            if (!manufacture_transactionToUpdate) {
                return promise.reject('No manufacture_transaction with id =' + manufacture_transactionId + ' found to update.');
            }
            var updated = _.merge(manufacture_transactionToUpdate, manufacture_transaction);
            updated.save(function (err) {
                if (err) {
                    return promise.reject(err);
                }
                return promise.complete(manufacture_transactionToUpdate);
            });
        },
        function(err){
            promise.reject(err);
        });
    return promise;
}

exports.deleteManufactureTransactionByIdPromise = function (id) {
    return ManufactureTransaction.findById(id).remove().exec();
}