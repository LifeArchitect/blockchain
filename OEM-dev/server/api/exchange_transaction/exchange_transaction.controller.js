'use strict';

var exchangeTransactionService = require('../../service/exchange_transaction.service.js');

exports.create = function (req, res) {
    var exchange_transaction = req.body;

    exchangeTransactionService.createExchangeTransaction(exchange_transaction)
        .then(function(created_exchange_transaction){
            res.json(200, created_exchange_transaction);
        })
        .otherwise(function(err){
           handleError(res, err);
        });
};

function handleError(res, err) {
    return res.send(500, err);
}
