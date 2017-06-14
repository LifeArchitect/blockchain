/**
 * Service layer for agents
 */
'use strict';

var _ = require('lodash');
var when = require('when');

// var manufactureTransactionDao = require('../dao/manufacture_transaction.dao');

var _this = this;

// Import libraries we need.
var Web3 = require('web3');
var contract = require('truffle-contract');

// Decode the blockchain hash into input params
const InputDataDecoder = require('ethereum-input-data-decoder');

var supply_artifacts = require('../contracts/Supply.json');
var Supply = contract(supply_artifacts);
// abi definition necessary for the decoding
var supply_abi = supply_artifacts.abi;
var config = require('../config/environment');

const decoder = new InputDataDecoder(supply_abi);

var web3 = new Web3(new Web3.providers.HttpProvider(config.blockchain));

var contract_instance;
Supply.setProvider(web3.currentProvider);
Supply.deployed().then(function (contractInstance) {
    contract_instance = contractInstance;
});

exports.createLoanTransaction = function(loan_transaction) {
    var defer = when.defer();
    console.log(loan_transaction);
    var date = Date.now().toString();
    var serialNo = loan_transaction.serialNo;
    var timeToReturn = loan_transaction.timeToReturn;
    var owner = loan_transaction.owner;
    var borrower = loan_transaction.borrower;

    contract_instance.loan(serialNo, owner, borrower, timeToReturn, date, {gas: 1400000, from: web3.eth.accounts[0]}).then(function (trans) {
        contract_instance.addPartHistory(serialNo, trans.tx, {gas: 140000, from: web3.eth.accounts[0]});
        defer.resolve();
    }, function(err) {
        defer.reject(err);
    });
    return defer.promise;
}
