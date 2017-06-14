let multichain = require("multichain-node")({
    port: 6282,
    host: '127.0.0.1',
    user: "multichainrpc",
    pass: "somepass"
});

multichain.getInfo((err, info) => {
    if(err){
        throw err;
    }
    console.log(info);
})

multichain.issue({address: someAddress, asset: "zcoin", qty: 50000, units: 0.01, details: {hello: "world"}}, (err, res) => {
    console.log(res)
})

multichain.sendAssetFrom({from: someAddress, to: someOtherAddress, asset: "zcoin", qty: 5}, (err, tx) => {
    console.log(tx);
})

multichain.getAddresses((err, addresses) => {

    multichain.createMultiSig({nrequired: 2, keys: addresses}, (err, wallet) => {
        console.log(wallet)
    })

})

multichain.getRawTransaction({txid: someTxId}, (err, tx) => {

    multichain.decodeRawTransaction({"hexstring": tx}, (err, dTx) => {
        console.log(dTx)
    })
})
