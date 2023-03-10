const StellarSdk = require('stellar-sdk');

const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

var issuingKeys = StellarSdk.Keypair.fromSecret('SDOOFY3SA5YOEW4EQG5YHNB7ZSOOOE3B5SHIMRFHXIZCYCWARRGOH72A');

var receivingKeys1 = StellarSdk.Keypair.fromSecret('SAV5C2B74SZNBU22VR7FFFQ3FU34SMYZ3NJ46YW2FHNYPIJRQEX5Q2G2');
var receivingKeys2 = StellarSdk.Keypair.fromSecret('SA7ESLSTDUAVEZYIY2GETHP2V67PRQCQGXDE5IW3GSDDNMCI7237G24L');

var USD = new StellarSdk.Asset('USD', 'GAW3UMBHWDS2LO6A3WZJSOVJPXCUV6WBYAQ6XP4MWTCKHEWUYI4GGCKS');

    
server
.loadAccount(issuingKeys.publicKey())
.then(function (receiver) {
  var transaction = new StellarSdk.TransactionBuilder(receiver, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: StellarSdk.Networks.TESTNET,
  })
    .addOperation(StellarSdk.Operation.payment({
        destination: receivingKeys1.publicKey(),
        asset: USD,
        amount: '1000',
        }),)
      
    
        .setTimeout(100)
        .build();
        transaction.sign(issuingKeys);
        return server.submitTransaction(transaction);
    })
    .then(console.log)
    .catch(function (error) {
        console.error("Error!", error);
    });

        
server
.loadAccount(issuingKeys.publicKey())
.then(function (receiver) {
  var transaction = new StellarSdk.TransactionBuilder(receiver, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: StellarSdk.Networks.TESTNET,
  })
    .addOperation(StellarSdk.Operation.payment({
        destination: receivingKeys2.publicKey(),
        asset: USD,
        amount: '1000',
        }),)
      
    
        .setTimeout(100)
        .build();
        transaction.sign(issuingKeys);
        return server.submitTransaction(transaction);
    })
    .then(console.log)
    .catch(function (error) {
        console.error("Error!", error);
    });
