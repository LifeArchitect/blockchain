'use strict';

var installTransactionService = require('../../service/install_transaction.service.js');

exports.create = function (req, res) {
    var install_transaction = req.body;

    installTransactionService.createInstallTransaction(install_transaction)
        .then(function(created_install_transaction){
            res.json(200, created_install_transaction);
        })
        .otherwise(function(err){
           handleError(res, err);
        });
};

function handleError(res, err) {
    return res.send(500, err);
}
