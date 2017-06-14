'use strict';

var sellTransactionService = require('../../service/sell_transaction.service.js');

exports.create = function (req, res) {
    var sell_transaction = req.body;
    console.log(sell_transaction);
    sellTransactionService.createSellTransaction(sell_transaction)
        .then(function(created_sell_transaction){
            console.log(created_sell_transaction);
            res.json(200, created_sell_transaction);
        })
        .otherwise(function(err){
           handleError(res, err);
        });
};

function handleError(res, err) {
    return res.send(500, err);
}
