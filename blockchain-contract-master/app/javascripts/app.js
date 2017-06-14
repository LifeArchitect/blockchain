// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Decode the blockchain hash into input params
const InputDataDecoder = require('ethereum-input-data-decoder');

import supply_artifacts from '../../build/contracts/Supply.json'
import flight_artifacts from '../../build/contracts/Flight.json'
import partpool_artifacts from '../../build/contracts/PartPool.json'

var Supply = contract(supply_artifacts);
var Flight = contract(flight_artifacts);
var PartPool = contract(partpool_artifacts);

// abi definition necessary for the decoding
var supply_abi = supply_artifacts.abi;
var flight_abi = flight_artifacts.abi;
var partpool_abi = partpool_artifacts.abi;

var contract_instance;

window.manufacture = function() {
  var date = Date.now().toString();
  var partNo = $("#partNo_M").val();
  var serialNo = $("#serialNo_M").val();;
  var description = $("#description_M").val();
  var owner = $("#manufacturer").val();
  contract_instance.manufacture(partNo, serialNo, description, owner, date, {gas: 1400000, from: web3.eth.accounts[0]}).then(function (trans) {
    console.log(trans);
    console.log(trans.tx);
    contract_instance.addPartHistory(serialNo, trans.tx, {gas: 140000, from: web3.eth.accounts[0]});
  });
}

window.sell = function() {
  var date = Date.now().toString();
  var serialNo = $("#serialNo_S").val();
  var seller = $("#seller").val();
  var buyer = $("#buyer").val();
  contract_instance.sell(serialNo, seller, buyer, date, {gas: 1400000, from: web3.eth.accounts[0]}).then(function (trans) {
    console.log(trans);
    console.log(trans.tx);
    contract_instance.addPartHistory(serialNo, trans.tx, {gas: 140000, from: web3.eth.accounts[0]});
  });
}

window.exchange = function() {
  var date = Date.now().toString();
  var serialNo1 = $("#serialNo1_E").val();
  var serialNo2 = $("#serialNo2_E").val();
  var from = $("#from").val();
  var to = $("#to").val();
  contract_instance.transfer(serialNo1, from, to, date, {gas: 1400000, from: web3.eth.accounts[0]}).then(function (trans1) {
     contract_instance.transfer(serialNo2, to, from, date, {gas: 1400000, from: web3.eth.accounts[0]}).then(function (trans2) {
      console.log(trans1);
      console.log(trans2);
      console.log(trans1.tx);
      console.log(trans2.tx);
      contract_instance.addPartHistory(serialNo1, trans1.tx, {gas: 140000, from: web3.eth.accounts[0]});
      contract_instance.addPartHistory(serialNo2, trans2.tx, {gas: 140000, from: web3.eth.accounts[0]});
    });
  });
}


window.install = function() {
  var date = Date.now().toString();
  var serialNo = $("#serialNo_I").val();
  var tailNo = $("#tailNo_I").val();;
  var installer = $("#installer").val();
  contract_instance.install(serialNo, tailNo, installer, date, {gas: 1400000, from: web3.eth.accounts[0]}).then(function (trans) {
    console.log(trans);
    console.log(trans.tx);
    contract_instance.addPartHistory(serialNo, trans.tx, {gas: 140000, from: web3.eth.accounts[0]});
  });
}

window.loan = function() {
  var date = Date.now().toString();
  var serialNo = $("#serialNo_L").val();
  var timeToReturn = $("#timeToReturn").val();
  var owner = $("#owner").val();
  var borrower = $("#borrower").val();
  contract_instance.loan(serialNo, owner, borrower, timeToReturn, date, {gas: 1400000, from: web3.eth.accounts[0]}).then(function (trans) {
    console.log(trans);
    console.log(trans.tx);
    contract_instance.addPartHistory(serialNo, trans.tx, {gas: 140000, from: web3.eth.accounts[0]});
  });
}

// 19/5
window.mro_action = function() {
  var date = Date.now().toString();
  var serialNo = $("#serialNo_MRO").val();
  var personel = $("#actor_MRO").val();
  var control = $("#mro-control").val();
  console.log(date, serialNo, personel, control);
  switch(control) {
    case "Overhaul":
      contract_instance.overhaul(serialNo, personel, date, {gas: 1400000, from: web3.eth.accounts[0]}).then(function (trans) {
        console.log(trans);
        console.log(trans.tx);
        contract_instance.addPartHistory(serialNo, trans.tx, {gas: 140000, from: web3.eth.accounts[0]});
      });
      break;
    case "Remove":
      contract_instance.remove(serialNo, personel, date, {gas: 1400000, from: web3.eth.accounts[0]}).then(function (trans) {
        console.log(trans);
        console.log(trans.tx);
        contract_instance.addPartHistory(serialNo, trans.tx, {gas: 140000, from: web3.eth.accounts[0]});
      });
      break;
    case "Repair":
      contract_instance.repair(serialNo, personel, date, {gas: 1400000, from: web3.eth.accounts[0]}).then(function (trans) {
        console.log(trans);
        console.log(trans.tx);
        contract_instance.addPartHistory(serialNo, trans.tx, {gas: 140000, from: web3.eth.accounts[0]});
      });
      break;
    case "Inspect":
      contract_instance.inspect(serialNo, personel, date, {gas: 1400000, from: web3.eth.accounts[0]}).then(function (trans) {
        console.log(trans);
        console.log(trans.tx);
        contract_instance.addPartHistory(serialNo, trans.tx, {gas: 140000, from: web3.eth.accounts[0]});
      });
      break;
    default:
      break;
  }
}

window.search_part_history = function() {
  var date = Date.now().toString();
  const decoder = new InputDataDecoder(supply_abi);
  var id = $("#partIDsearch").val();
  var table = $("#partHistory");
  table.html("<thead class=\"thead-default\"><th>Transactions</th></thead><tbody>");
  contract_instance.searchPartHistory(id, date, {gas: 1400000, from: web3.eth.accounts[0]}).then(function(results) {
    console.log(results);
    results.forEach(function(transaction) {
      var row = "<tr>";
      var hash = transaction;
      var data = web3.eth.getTransaction(transaction).input;
      var result = decoder.decodeData(data);
      var description;
      var time;
      console.log(result);
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
      row += "<td><p><strong>HASH:</strong> " + hash + "</p>";
      row += "<p><strong>Description:</strong> " + description + "</p>";
      row += "<p><strong>Time of transaction:</strong> " + time + "</p>";
      row += "</td></tr>";
      table.append(row);
    });
  });
  table.append("</tbody>");
}



/* The user enters the total no. of tokens to buy. We calculate the total cost and send it in
 * the request. We have to send the value in Wei. So, we use the toWei helper method to convert
 * from Ether to Wei.
 */

$( document ).ready(function() {
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source like Metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  Supply.setProvider(web3.currentProvider);
  Supply.deployed().then(function (contractInstance) {
    contract_instance = contractInstance;
  });
  $("#timeToReturn").val(new Date().toJSON().slice(0,19));
  console.log("19/5");
});
