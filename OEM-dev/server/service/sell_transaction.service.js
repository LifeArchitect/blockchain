/**
 * Service layer for agents
 */
'use strict';

var _ = require('lodash');
var when = require('when');
var config = require('../config/environment');

var transactionDao = require('../dao/transaction.dao');
var sale_transactionDao = require('../dao/sale_transaction.dao');


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

var web3 = new Web3(new Web3.providers.HttpProvider(config.blockchain));

var contract_instance;
Supply.setProvider(web3.currentProvider);
Supply.deployed().then(function (contractInstance) {
    contract_instance = contractInstance;
});

exports.createSellTransaction = function(sell_transaction) {
    var defer = when.defer();
    console.log(sell_transaction);
    console.log('In service...');
    var date = Date.now().toString();
    var serialNo = sell_transaction.serialNo;
    var seller = sell_transaction.seller;
    var buyer = sell_transaction.buyer;

    contract_instance.sell(serialNo, seller, buyer, date, {gas: 1400000, from: web3.eth.accounts[0]}).then(function (trans) {
        // saved in blockchain
        console.log("saving in blockchain...");
        contract_instance.addPartHistory(serialNo, trans.tx, {gas: 140000, from: web3.eth.accounts[0]});
        defer.resolve();
        console.log("saving in db...");
        //saved in mongoDB
        //transactionDao.createTransactionsPromise(sell_transaction)
        sale_transactionDao.createSaleTransactionPromise(sell_transaction);
        console.log("successfully saved in db...");
    }, function(err) {
        console.log(err);
        defer.reject(err);
    });
    return defer.promise;
}
