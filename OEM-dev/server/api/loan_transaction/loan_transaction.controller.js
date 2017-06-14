'use strict';

var loanTransactionService = require('../../service/loan_transaction.service.js');

exports.create = function (req, res) {
    var loan_transaction = req.body;

    loanTransactionService.createLoanTransaction(loan_transaction)
        .then(function(created_loan_transaction){
            res.json(200, created_loan_transaction);
        })
        .otherwise(function(err){
           handleError(res, err);
        });
};

function handleError(res, err) {
    return res.send(500, err);
}
