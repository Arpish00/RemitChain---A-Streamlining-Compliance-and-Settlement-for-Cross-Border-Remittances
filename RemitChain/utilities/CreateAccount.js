const StellarSdk = require('stellar-sdk');

//instance that point to local horizon 
const server = new StellarSdk.Server('http://127.0.0.1:8000', {allowHttp: true});



const pair = StellarSdk.Keypair.random();
const MasterSecret = pair.secret();
const MasterPublicKey = pair.publicKey();

console.log("master account:", MasterSecret, MasterPublicKey);




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
    

    try {
      const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
      var parentAccount = await server.loadAccount(pair.publicKey());
      
      const pair1 = StellarSdk.Keypair.random();
      const pair2 = StellarSdk.Keypair.random();
      const pair3 = StellarSdk.Keypair.random();
      //create a transacion object.
      var createAccountTx = new StellarSdk.TransactionBuilder(parentAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      });
      //add the create account operation to the createAccountTx transaction.
      createAccountTx = await createAccountTx
      .addOperation(
        StellarSdk.Operation.createAccount({
          destination: pair1.publicKey(),
          startingBalance: "5",
        }))	
        .addOperation(
          StellarSdk.Operation.createAccount({
            destination: pair2.publicKey(),
            startingBalance: "5",
          }))	
          .addOperation(
            StellarSdk.Operation.createAccount({
              destination: pair3.publicKey(),
              startingBalance: "5",
            }),)	
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
      console.log("Created the new account", pair1.publicKey(), pair1.secret());
      console.log("Created the new account", pair2.publicKey(), pair2.secret());
      console.log("Created the new account", pair3.publicKey(), pair3.secret());
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


//   Created the new account GA7LFLVNJ77PZGX2KHXUVQVY6ELTYNLKZ55GA7NEWULPTGDABJU4YI6A
// Created the new account GCHLHCY6PNLDCVNWENXI2QOBBZNRARUIH2TGT5KRCBN7D4WMXWC7AZGK
// Created the new account GDQ2H22GEUSCM34IL5EBIKZDZVKSSE7WYSG6RTBAA7Z3E32GBLO4JS57

// SAEZVFMWPKH4ZWBU5KJ5XBE52KR44W6GJRRJWUVJGCNMBK2MCFDPM4TF
// SAXIB7GFQV3SU254NORTL4J2QSHVFXAICCWB6JHPQN6OFZQIR47JGMSR
// SAL2SSJRRMPIRSTL3H4PMMMWODMNGUJCX7YWACRLASPUJSECVPS2UFFQ