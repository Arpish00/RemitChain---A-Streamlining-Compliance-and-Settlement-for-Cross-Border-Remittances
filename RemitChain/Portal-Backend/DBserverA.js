const express = require("express");
const bodyParser = require("body-parser");
const app = express(); 
const pg = require('pg');
const conString = "postgres://bankauser:bankauser@localhost:5432/banka";
const requestObj = require('request');
const client = new pg.Client(conString);
const USD = 'USD';
const issuer = '';
var txid = 1001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {

// Website you wish to allow to connect
 res.setHeader('Access-Control-Allow-Origin', '*');

// Request methods you wish to allow
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

// Request headers you wish to allow
 res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

// Set to true if you need the website to include cookies in the requests sent
 // to the API (e.g. in case you use sessions)
 res.setHeader('Access-Control-Allow-Credentials', true);

// Pass to next layer of middleware
 next();
});

var server = app.listen(process.env.PORT || 3600, function () {
 var port = server.address().port;
 console.log("App now running on port", port);
 
 });


 //returns data from pssql by quering friendlyid
 app.post('/userdet', function (request, response) {

    var idParts = request.body.friendlyid.split('*');
     var friendlyId = idParts[0];
    
    client.query('SELECT name,balance from users where friendlyid = $1', [friendlyId], (error, results) => {
    if (error) {
     throw error
     } 
     if(results)
     { 
     response.json({
     name: results.rows[0].name,
     balance: results.rows[0].balance 
     });
     response.end(); 
     }});
});


//returns balance from pssql by quering friendlyid
app.post('/userbal', function (request, response) { 
    var idParts = request.body.friendlyid.split('*');
     var friendlyId = idParts[0];
     client.query('SELECT balance from users where friendlyid = $1', [friendlyId], (error, results) => {
    if (error) {
     throw error
    } 
    
     if(results)
     { 
        response.json({
        balance: results.rows[0].balance 
     }); 
     response.end();

     }}
     );
});



app.post('/payment', function (request, response) {

	var idParts = request.body.account.split('*');
    var friendlyId = idParts[0];
	
	client.query('SELECT balance from users where friendlyid = $1', [friendlyId], (error, results) => {
	if (error) {
      response.json({
		msg: "ERROR!",
		error_msg: error
      });
 	response.end();
	}
	
    //check balance first
	if(results)
	  {	  
	  balance =  results.rows[0].balance;	
		
		if(balance < Number(request.body.amount))
	  {
		  response.json({
		msg: "ERROR!",
		error_msg: "Insufficient balance!"
      });

    //If the transfer amount is less than or equal to the balance, we post a new request to the bridge server
 	response.end();
	  } 
    
      requestObj.post({
        url: 'http://localhost:8006/payment',
        form: {
        id: txid.toString(),
        amount: request.body.amount,
        asset_code: USD,
        asset_issuer: issuer,
        destination: request.body.receiver,
        sender: request.body.account,
        use_compliance: true 
        }
       },

       function(err, res, body) {
        if (err || res.statusCode !== 200) {
        console.error('ERROR!', err || body);
        response.json({
        result: body,
        msg: "ERROR!",
        error_msg: err
        }); 
        response.end();
        }

        
        else {

        console.log('SUCCESS!', body);

        client.query('SELECT balance from users where friendlyid = $1', [friendlyId], (error, results) => {
        if (error) {
            console.log(error); 
            response.status(500).end("User Not found");
        } 

        if (results)
        {
            //The user's current balance is fetched and updated. The transaction amount is deducted from the current balance.
            var balance = Number(results.rows[0].balance) 
            balance = balance - request.body.amount;

            client.query('UPDATE users set balance = $1 where friendlyid = $2', [balance, friendlyId], (error, results) => {

                if (error) {
                console.log(error); 
                response.status(500).end("User Not found");
                }

                if (results)
                {
                    //The variable that stores the transaction ID, txid, is incremented by 1 to the next transaction ID.
                    response.json({
                    result: body,
                    msg: 'SUCCESS!'
                    }); 
                    txid++;
                    console.log("Next txid",txid); 
                    response.status(200).end();
                }
            })
        }
        })
        } 
        }); 
        }
        })
    });


    app.get('/bankuser', function (request, response) {
        client.query('SELECT * from transactions', (error, results) => {
            if (error) {
                throw error
            } 
            
            if(results)
            { 
                response.json({
                    tx: results.rows 
                });
                response.end();
            }
        })
    });
            