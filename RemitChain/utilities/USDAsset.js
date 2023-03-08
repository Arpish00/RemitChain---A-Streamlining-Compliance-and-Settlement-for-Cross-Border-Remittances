const StellarSdk = require('stellar-sdk');

const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

var issuingKeys = StellarSdk.Keypair.fromSecret('SAEZVFMWPKH4ZWBU5KJ5XBE52KR44W6GJRRJWUVJGCNMBK2MCFDPM4TF');

var receivingKeys1 = StellarSdk.Keypair.fromSecret('SAXIB7GFQV3SU254NORTL4J2QSHVFXAICCWB6JHPQN6OFZQIR47JGMSR');
var receivingKeys2 = StellarSdk.Keypair.fromSecret('SAL2SSJRRMPIRSTL3H4PMMMWODMNGUJCX7YWACRLASPUJSECVPS2UFFQ');

var USD = new StellarSdk.Asset('USD', 'GB55EOQYN5BP3H4JF5UJAVM6JPVQAQVQDHGTE6KDST33GEL3FQ4VQK3K');

    
server
.loadAccount(receivingKeys1.publicKey())
.then(function (receiver) {
  var transaction = new StellarSdk.TransactionBuilder(receiver, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: StellarSdk.Networks.TESTNET,
  })
    // The `changeTrust` operation creates (or alters) a trustline
    // The `limit` parameter below is optional
    .addOperation(
      StellarSdk.Operation.changeTrust({
        asset: USD,
        limit: "1000",
        source: receivingKeys1.publicKey(),
      }),
    )
    // setTimeout is required for a transaction
    .setTimeout(100)
    .build();
  transaction.sign(receivingKeys1);
  return server.submitTransaction(transaction);
})
.then(console.log)

    
server
.loadAccount(receivingKeys2.publicKey())
.then(function (receiver) {
  var transaction = new StellarSdk.TransactionBuilder(receiver, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: StellarSdk.Networks.TESTNET,
  })
    // The `changeTrust` operation creates (or alters) a trustline
    // The `limit` parameter below is optional
    .addOperation(
      StellarSdk.Operation.changeTrust({
        asset: USD,
        limit: "1000",
        source: receivingKeys2.publicKey(),
      }),
    )
    // setTimeout is required for a transaction
    .setTimeout(100)
    .build();
  transaction.sign(receivingKeys2);
  return server.submitTransaction(transaction);
})
.then(console.log)
