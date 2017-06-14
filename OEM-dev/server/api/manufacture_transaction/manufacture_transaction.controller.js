'use strict';

var manufactureTransactionService = require('../../service/manufacture_transaction.service.js');

exports.create = function (req, res) {
    var manufacture_transaction = req.body;

    manufactureTransactionService.createManufactureTransaction(manufacture_transaction)
        .then(function(created_manufacture_transaction){
            console.log(created_manufacture_transaction);
            res.json(200, created_manufacture_transaction);
        })
        .otherwise(function(err){
           handleError(res, err);
        });
};

function handleError(res, err) {
    return res.send(500, err);
}
