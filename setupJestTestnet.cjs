const { setupGlobalJestFhevmConfig } = require('./setupJestBase.cjs');

// Use npm-installed @luxfhe packages (which bundle node-tfhe/node-tkms)
global.TFHE = require('@luxfhe/wasm/node');
global.TKMS = require('@luxfhe/kms/node');

setupGlobalJestFhevmConfig('testnet', '.env.testnet');
