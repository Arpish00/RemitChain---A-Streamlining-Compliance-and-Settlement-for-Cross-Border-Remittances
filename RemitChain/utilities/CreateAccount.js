const StellarSdk = require('stellar-sdk');

//instance that point to local horizon 
const server = new StellarSdk.Server('http://127.0.0.1:8000', {allowHttp: true});



const pair = StellarSdk.Keypair.master('Standalone Network');
const MasterSecret = pair.secret();
const MasterPublicKey = pair.publicKey();

console.log("master account:", MasterSecret, MasterPublicKey);


const pair1 = StellarSdk.Keypair.random();
const pair2 = StellarSdk.Keypair.random();
const pair3 = StellarSdk.Keypair.random();

var SecretKey1 = pair1.secret();
var PublicKey1 = pair1.publicKey();
console.log ('Account1',SecretKey1, PublicKey1);

var SecretKey2 = pair2.secret();
var PublicKey2 = pair2.publicKey();
console.log ('Account2',SecretKey2, PublicKey2);

var SecretKey3 = pair3.secret();
var PublicKey3 = pair3.publicKey();
console.log ('Account3',SecretKey3, PublicKey3);




    // The SDK does not have tools for creating test accounts, so you'll have to
// make your own HTTP request.

// if you're trying this on Node, install the `node-fetch` library and
// uncomment the next line:
// const fetch = require('node-fetch');

(async function main() {
    try {
      const response = await fetch(
        `https://friendbot.stellar.org?addr=${encodeURIComponent(
          pair.publicKey(),
        )}`,
      );
      const responseJSON = await response.json();
      console.log("SUCCESS! You have a new account :)\n", responseJSON);
    } catch (e) {
      console.error("ERROR!", e);
    }
    // After you've got your test lumens from friendbot, we can also use that account to create a new account on the ledger.
    try {
      const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
      var parentAccount = await server.loadAccount(pair.publicKey()); //make sure the parent account exists on ledger
      var childAccount = StellarSdk.Keypair.random(); //generate a random account to create
      //create a transacion object.
      var createAccountTx = new StellarSdk.TransactionBuilder(parentAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      });
      //add the create account operation to the createAccountTx transaction.
      createAccountTx = await createAccountTx
        .addOperation(
          StellarSdk.Operation.createAccount({
            destination: childAccount.publicKey(),
            startingBalance: "5",
          }),
        )
        .setTimeout(180)
        .build();
      //sign the transaction with the account that was created from friendbot.
      await createAccountTx.sign(pair);
      //submit the transaction
      let txResponse = await server
        .submitTransaction(createAccountTx)
        // some simple error handling
        .catch(function (error) {
          console.log("there was an error");
          console.log(error.response);
          console.log(error.status);
          console.log(error.extras);
          return error;
        });
      console.log(txResponse);
      console.log("Created the new account", childAccount.publicKey());
    } catch (e) {
      console.error("ERROR!", e);
    }
    const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

    // the JS SDK uses promises for most actions, such as retrieving an account
    const account = await server.loadAccount(pair.publicKey());
    console.log("Balances for account: " + pair.publicKey());
    account.balances.forEach(function (balance) {
    console.log("Type:", balance.asset_type, ", Balance:", balance.balance);
    });
    
  })();
