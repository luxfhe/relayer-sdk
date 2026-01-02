const { setupGlobalJestFhevmConfig } = require('./setupJestBase.cjs');

const fetchMock = require('fetch-mock');

global.fetch = fetchMock.default.fetchHandler;
// Use npm-installed @luxfhe packages (which bundle node-tfhe/node-tkms)
global.TFHE = require('@luxfhe/wasm/node');
global.TKMS = require('@luxfhe/kms/node');

setupGlobalJestFhevmConfig('fetch-mock');
