/**
 * Service layer for agents
 */
'use strict';

var _ = require('lodash');
var when = require('when');
var manufactureTransactionDao = require('../dao/manufacture_transaction.dao');
var partDao = require('../dao/part.dao');
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

exports.createManufactureTransaction = function(manufacture_transaction) {
    var defer = when.defer();
    console.log(manufacture_transaction);
    var date = Date.now().toString();
    var partNo = manufacture_transaction.partNo;
    var serialNo = manufacture_transaction.serialNo;
    var description = manufacture_transaction.description;
    var owner = manufacture_transaction.owner;
    var cost = manufacture_transaction.cost;
    manufacture_transaction.date = date;

    contract_instance.manufacture(partNo, serialNo, description, owner, date, {gas: 1400000, from: web3.eth.accounts[0]}).then(function (trans) {
        
        // Store transaction in Blockchain
        contract_instance.addPartHistory(serialNo, trans.tx, {gas: 140000, from: web3.eth.accounts[0]});
        defer.resolve();
        console.log("adding to MongoDB...")

        // Store part & transaction in MongoDB
        var part_result = partDao.createPartsPromise(manufacture_transaction)
        console.log("Successfully saved to MongoDB...")

        //manufactureTransactionDao.createManufactureTransactionPromise(manufacture_transaction);

    }, function(err) {
        defer.reject(err);
    });
    return defer.promise;
}
