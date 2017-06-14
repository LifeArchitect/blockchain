'use strict';

var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');

var Schema = mongoose.Schema;

var TransactionSchema = mongoose.Schema({ 
  make : String,
}, { collection : 'transactions', discriminatorKey : 'type' });

var SaleSchema = TransactionSchema.extend({
    serialNo: Number,
    description: String,
    date: Date,
    seller: String,
    buyer: String,
    price: Number
});

/*
module.exports = {
    'transaction': mongoose.model('transaction', TransactionSchema),
    'sale_transaction': mongoose.model('sale_transaction', SaleSchema)
};

*/

/* Using discriminators 

var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var TransactionSchema = new Schema({ message: String }, { discriminatorKey: 'type', _id: false });

var Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;
//var batchSchema = new Schema({ transactions: [TransactionSchema]});     

// `batchSchema.path('events')` gets the mongoose `DocumentArray`
//var Transaction = batchSchema.path('transactions');

// The `transactions` array contains 5 different types of transactions:

    // 1.'Manufacture' 
    var Manufacture = Transaction.discriminator('Manufacture', new Schema({
      element: {
        //customId: { type: String, required: true }, 
        serialNo: Number,
        partNo: Number,
        description: String,
        owner: String,
        date: Date,
        cost: Number
      }
    }));

    // 2.'Sell'
    var Sell = Transaction.discriminator('Sell', new Schema({
      product: {   
        //customId: { type: String, required: true },      
        serialNo: Number,
        description: String,
        date: Date,
        seller: String,
        buyer: String,
        price: Number
      }
    }));

    // 3.'Install'
    var Install = Transaction.discriminator('Install', new Schema({
      product: {
        //customId: { type: String, required: true },      
        serialNo: Number,
        partNo: Number,
        description: String,
        date: Date,
        owner: String,
        tailNo: Number,
        installer: String,
        cost: Number
      }
    }));

    // 4.'Loan'
    var Loan = Transaction.discriminator('Loan', new Schema({
      product: {        
        //customId: { type: String, required: true },      
        serialNo: Number,
        partNo: Number,
        description: String,
        borrowedDate: Date,
        dateOfReturn: Date,
        owner: String,
        borrower: String,
      }
    }));

     // 5.'Exchange'
    var Exchange = Transaction.discriminator('Exchange', new Schema({
      product: {      
        //customId: { type: String, required: true },        
        serialNoCurrent: Number,
        serialNoReceiving: Number,
        description: String,
        ownerOfCurrentPart: String,
        ownerOfReceivingPart: String,
      }
    }));

    //module.exports = mongoose.model('Transactions', batchSchema);
    //module.exports = mongoose.model('Part', PartSchema);


    // Create a new batch of events with different kinds
    var batch = {
      transactions: [
        { kind: 'Manufacture', serialNo: "123", partNo: "123",
        description: "Nil", owner: "Boeing", date: "121217", cost: "123"},
        { kind: 'Sell', serialNo: "123", partNo: "123", description: "Nil",
        date: "124314", owner: "Boeing", buyer: "Air France", price: "123"},
        { kind: 'Install', serialNo: "123", partNo: "123", description: "Nil",
        date: "124314",owner: "Nil", tailNo: "123", installer: "Boeing", cost: "123"},
        { kind: 'Loan', serialNo: "123", partNo: "123", description: "Nil",
        borrowedDate: "124314", dateOfReturn: "124314", owner: "Air France", borrower: "Ramco",},
        { kind: 'Exchange', serialNoCurrent: "123", serialNoReceiving: "123",
        description: "Nil", ownerOfCurrentPart: "Air France", ownerOfReceivingPart: "Ramco"},
      ]
    };

    Batch.create(batch).
      then(function(doc) {
        assert.equal(doc.events.length, 2);

        assert.equal(doc.events[0].element, '#hero');
        assert.equal(doc.events[0].message, 'hello');
        assert.ok(doc.events[0] instanceof Clicked);

        assert.equal(doc.events[1].product, 'action-figure-1');
        assert.equal(doc.events[1].message, 'world');
        assert.ok(doc.events[1] instanceof Purchased);

        doc.events.push({ kind: 'Purchased', product: 'action-figure-2' });
        return doc.save();
      }).
      then(function(doc) {
        assert.equal(doc.events.length, 3);

        assert.equal(doc.events[2].product, 'action-figure-2');
        assert.ok(doc.events[2] instanceof Purchased);

        done();
      }).
      catch(done);

      */