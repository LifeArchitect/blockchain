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

const decoder = new InputDataDecoder(supply_abi);
var config = require('../config/environment');

var web3 = new Web3(new Web3.providers.HttpProvider(config.blockchain));

var contract_instance;
Supply.setProvider(web3.currentProvider);
Supply.deployed().then(function (contractInstance) {
    contract_instance = contractInstance;
});

exports.createInstallTransaction = function(install_transaction) {
    var defer = when.defer();
    console.log(install_transaction);
    var date = Date.now().toString();
    var serialNo = install_transaction.serialNo;
    var tailNo = install_transaction.tailNo;
    var installer = install_transaction.installer;

    contract_instance.install(serialNo, tailNo, installer, date, {gas: 1400000, from: web3.eth.accounts[0]}).then(function (trans) {
        contract_instance.addPartHistory(serialNo, trans.tx, {gas: 140000, from: web3.eth.accounts[0]});
        defer.resolve();
    }, function(err) {
        defer.reject(err);
    });
    return defer.promise;
}
