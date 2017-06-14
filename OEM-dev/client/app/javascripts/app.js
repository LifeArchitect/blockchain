// Import the page's CSS. Webpack will know what to do with it.
import '../stylesheets/app.css';
// Import libraries we need.

window.manufacture = function() {
  var date = Date.now().toString();
  var partNo = $("#partNo_M").val();
  var serialNo = $("#serialNo_M").val();;
  var description = $("#description_M").val();
  var owner = $("#manufacturer").val();
  var cost = $("#cost").val();

  $.post("/api/manufacture/", 
  {
    "partNo": parseInt(partNo),
    "serialNo": parseInt(serialNo),
    "description": description,
    "owner": owner,
    "cost": cost
  });
}

window.sell = function() {
  var date = Date.now().toString();
  var serialNo = $("#serialNo_S").val();
  var seller = $("#seller").val();
  var buyer = $("#buyer").val();
  var price = $("#price").val();

  var type = "Sell";
  var customId = "123" + price + serialNo;
  var description = "Nil";
  
  $.post("/api/sell/", 
  {
    "type": type,
    "customId": customId,
    "serialNo": parseInt(serialNo),
    "description": description,
    "date": date,
    "seller": seller,
    "buyer": buyer,
    "price": price
  });
        
}

window.install = function() {
  var date = Date.now().toString();
  var serialNo = $("#serialNo_I").val();
  var tailNo = $("#tailNo_I").val();;
  var installer = $("#installer").val();
  $.post("/api/install/", 
  {
    "serialNo": parseInt(serialNo),
    "tailNo": parseInt(tailNo),
    "installer": installer
  });
}

window.loan = function() {
  var date = Date.now().toString();
  var serialNo = $("#serialNo_L").val();
  var timeToReturn = $("#timeToReturn").val();
  var borrower = $("#borrower").val();
  $.post("/api/loan/", 
  {
    "serialNo": parseInt(serialNo),
    "timeToReturn": timeToReturn,
    "borrower": borrower
  });
}

// Search blockchain for transactions

window.search_part_history = function() {
  var date = Date.now().toString();
  var id = $("#partIDsearch").val();
  var table = $("#partHistory");
  table.html("<thead class=\"thead-default\"><th>Transactions</th></thead><tbody>");
  
  $.get("/api/search/"+id, function(result) {
    result.forEach(function(transaction) {
      var row = "<tr>";
      row += "<td><p><strong>HASH:</strong> " + transaction.hash + "</p>";
      row += "<p><strong>Description:</strong> " + transaction.description + "</p>";
      row += "<p><strong>Time of transaction:</strong> " + transaction.time + "</p>";
      row += "</td></tr>";
      table.append(row);
    });
  });
  table.append("</tbody>");
}

// Search MongoDB for parts

window.search_part_from_db = function() {
  var date = Date.now().toString();
  var id = $("#partIDsearchDb").val();
  var table = $("#partCheckDb");
  table.html("<thead class=\"thead-default\"><th>Parts</th></thead><tbody>");
  
  $.get("/api/db/search/part/"+id, function(result) {
    result.forEach(function(part) {
      var row = "<tr>";
      console.log(part);
      console.log(part.owner);
      row += "<td><p><strong>Part No</strong> " + part.partNo + "</p>";
      row += "<p><strong>Serial No</strong> " + part.serialNo + "</p>";
      row += "<p><strong>Description:</strong> " + part.description + "</p>";
      row += "<p><strong>Owner</strong> " + part.owner + "</p>";
      row += "<p><strong>Date Of Manufacture:</strong> " + part.date + "</p>";
      row += "<p><strong>Cost:</strong> " + part.cost + "</p>";

      row += "</td></tr>";
      console.log(row);
      table.append(row);
      console.log(table);
    });
  });
  table.append("</tbody>");
}

// Search MongoDB for all transactions of a part

window.search_part_history_from_db = function() {
  var date = Date.now().toString();
  var id = $("#partIDsearchHistoryDb").val();
  var table = $("#partHistoryDb");
  table.html("<thead class=\"thead-default\"><th>Transaction History</th></thead><tbody>");
  
  $.get("/api/db/search/part_history/"+id, function(result) {
    result.forEach(function(transaction) {
      var row = "<tr>";
      console.log(transaction);
      row += "<td><p><strong>Type</strong> " + transaction.type + "</p>";
      row += "<td><p><strong>Part No</strong> " + transaction.partNo + "</p>";
      row += "<p><strong>Serial No</strong> " + transaction.serialNo + "</p>";
      row += "<p><strong>Description:</strong> " + transaction.description + "</p>";
      row += "<p><strong>Owner</strong> " + transaction.owner + "</p>";
      row += "<p><strong>Date Of Manufacture:</strong> " + transaction.date + "</p>";
      row += "<p><strong>Price:</strong> " + transaction.cost + "</p>";

      row += "</td></tr>";
      console.log(row);
      table.append(row);
      console.log(table);
    });
  });
  table.append("</tbody>");
}
/* The user enters the total no. of tokens to buy. We calculate the total cost and send it in
 * the request. We have to send the value in Wei. So, we use the toWei helper method to convert
 * from Ether to Wei.
 */

$( document ).ready(function() {
  $("#timeToReturn").val(new Date().toJSON().slice(0,16));
});
