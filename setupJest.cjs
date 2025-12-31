const { setupGlobalJestFhevmConfig } = require('./setupJestBase.cjs');
const path = require('path');

const fetchMock = require('fetch-mock');

global.fetch = fetchMock.default.fetchHandler;
// Use the same module paths that jest moduleNameMapper will resolve to
global.TFHE = require(path.resolve(__dirname, '../packages/wasm/dist/node/index.cjs'));
global.TKMS = require(path.resolve(__dirname, '../packages/kms/dist/node/index.cjs'));

setupGlobalJestFhevmConfig('fetch-mock');
