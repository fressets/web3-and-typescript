const keythereum = require("keythereum");

var keyObject = keythereum.importFromFile("6c9931f85d8efa2ab83eb6f11626df43cfb616f6","../data/") // importFromFile("crossChainAdmin's address without 0x", "./")
var privateKey = keythereum.recover('bnm1234bnm', keyObject) // recover("crossChainAdmin's password, keyObject)

console.log(privateKey.toString('hex'))