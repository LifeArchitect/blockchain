/**
 * Service layer for agents
 */
'use strict';
// Import libraries we need.
var Web3 = require('web3');
var contract = require('truffle-contract');

// Decode the blockchain hash into input params
const InputDataDecoder = require('ethereum-input-data-decoder');

var supply_artifacts = require('../contracts/Supply.json');
var Supply = contract(supply_artifacts);
// abi definition necessary for the decoding
var supply_abi = supply_artifacts.abi;

var _ = require('lodash');
var when = require('when');
const decoder = new InputDataDecoder(supply_abi);

// var manufactureTransactionDao = require('../dao/manufacture_transaction.dao');
var config = require('../config/environment');
var _this = this;
var web3 = new Web3(new Web3.providers.HttpProvider(config.blockchain));

var contract_instance;
Supply.setProvider(web3.currentProvider);
Supply.deployed().then(function (contractInstance) {
    contract_instance = contractInstance;
});

exports.searchPartHistoryById = function searchPartHistoryById(part_id) {
    var defer = when.defer();
    contract_instance.searchPartHistory(part_id, {gas: 1400000, from: web3.eth.accounts[0]}).then(function(results) {
        var promise = [];
        results.forEach(function(transaction) {
            var hash = transaction;
            var data = web3.eth.getTransaction(transaction).input;
            var result = decoder.decodeData(data);
            var description;
            var time;
            switch(result.name){
                case "manufacture":
                description = "Manufactured by " + result.inputs[3];
                time = result.inputs[4];
                break;
                case "install":
                description = "Installed by " + result.inputs[2] + " on to aircraft with tail number " + result.inputs[1];
                time = result.inputs[3];
                break;
                case "sell":
                description = "Sold <br />Ownership transfered from " + result.inputs[1] + " to " + result.inputs[2];
                time = result.inputs[3];
                break;
                case "loan":
                description = result.inputs[1] + " loaned to " + result.inputs[2] +
                    " until " + result.inputs[3] +
                    "<br />The borrower of the part is now " + result.inputs[2];
                time = result.inputs[4];
                break;
                case "transfer":
                description = "Transfered from " + result.inputs[1] + " to " + result.inputs[2];
                time = result.inputs[3];
                break;
                case "overhaul":
                description = "Overhauled by " + result.inputs[1];
                time = result.inputs[2];
                break;
                case "repair":
                description = "Repaired by " + result.inputs[1];
                time = result.inputs[2];
                break;
                case "inspect":
                description = "Inspected by " + result.inputs[1];
                time = result.inputs[2];
                break;
                case "remove":
                description = "Removed by " + result.inputs[1];
                time = result.inputs[2];
                break;
                default:
                description = "No description";
                break;
            }
            time = new Date(parseInt(time));
            promise.push({hash:hash, description: description, time: time});
        });
        defer.resolve(promise);
    }, function(err) {
        defer.reject(err);
    });
    return defer.promise;
}
