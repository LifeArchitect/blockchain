'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ManufactureTransactionSchema = new Schema({
    date: Date,
    partNo: Number,
    serialNo: Number,
    description: String,
    owner: String,
    cost: Number
});

module.exports = mongoose.model('ManufactureTransaction', ManufactureTransactionSchema);
