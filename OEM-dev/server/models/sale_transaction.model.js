'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SaleTransactionSchema = new Schema({
    serialNo: Number,
    description: String,
    date: Date,
    seller: String,
    buyer: String,
    price: Number
});

module.exports = mongoose.model('SaleTransaction', SaleTransactionSchema);
