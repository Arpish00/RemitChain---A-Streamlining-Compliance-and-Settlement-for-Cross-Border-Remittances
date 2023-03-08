const StellarSdk = require('stellar-sdk');

const server = new StellarSdk.Server('http://127.0.0.1:8000', {allowHttp: true});

var USD = new StellarSdk.Asset('USD', 'GDS5YGVPMU2NZARH3GKHFFQOOZNIXDFO6KRMORTUQVFPADJB44BYQ3BC');