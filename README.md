# RemitChain: A Cross-Border Blockchain Remittance Platform for Banks

RemitChain is a prototype cross-border blockchain retail remittance platform designed to help banks streamline compliance and settlement processes for cross-border remittances. Cross-border remittances are complex and require compliance checks of the remitter and the beneficiary, as well as settlement workflows that involve multiple banks and partners. To address these challenges, RemitChain leverages Stellar blockchain technology and various tools and frameworks, including Node.js, Express.js, React.js, cryptography, and PostgreSQL, among others.

## The following are the key features of the RemitChain platform:

- User/Customer database: stores customer information and transaction history.
- Transactions database: keeps a log of all incoming and outgoing transactions and associated metadata.
- Sanctions database: holds sanction approvals for financial institutions and remitters.
- Compliance module: performs anti-money laundering (AML) and know-your-customer (KYC) checks on payments.
- Federation module: allocates user-friendly payment addresses for customers to send and receive payments, similar to email IDs.
- Bridge module: allows the bank to send payments on the blockchain network and listen for incoming payments to our account on the blockchain network.
- Bank portal: where bank users can log in and submit payment requests, and the bank administration can view KYC/AML details of the received transactions.


## The following technologies were used to develop the RemitChain platform:

- Stellar and stellarsdk: blockchain network and SDK for building on the Stellar network.
- Node.js and Express.js: server-side programming languages.
- HTTPS: secure protocol for web communication.
- React.js: front-end JavaScript library for building user interfaces.
- Cryptography: for secure transaction processing.
- PostgreSQL: database management system.
- Apache2 server: web server for hosting the TOML file.

## The approach to developing the RemitChain platform involved the following steps:

- Set up a private test Stellar network for development.
- Create the USD asset, representing the US dollar asset that will be transferred.
- Create Stellar account IDs for Bank A and Bank B on the network and add a USD balance to try out remittances.
- Set up local domain redirection for the banka.com and bankb.com domains to try out friendly ID resolution (federation) service for customers.
- Set up the Apache2 server that will host a TOML file. This TOML file will guide incoming requests to the bridge, compliance, and federation servers being run by the bank.
- Set up the federation service for Bank A and Bank B for friendly ID resolution.
- Set up the compliance module for Bank A and Bank B to handle all incoming and outgoing compliance requests.
- Set up the bridge server for Bank A and Bank B to be the bank portal's interface with the Stellar network.
- Set up a callback server to implement webhooks that can be invoked when a payment is received or when compliance data needs to be verified with the internal bank database.
- Build a bank portal and backend service in React that will allow customers and the bank to interact with the Stellar network, submit and receive payments, and view KYC details of received transactions.
