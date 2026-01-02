#!/usr/bin/env node

/**
 * Generate FHE test keys using native Go FHE via @luxfhe/wasm
 */

import { init, getLuxFHE } from '@luxfhe/wasm';
import fs from 'fs';

const generateKeys = async () => {
  console.log('Initializing native Go FHE...');
  await init();
  const fhe = getLuxFHE();

  console.log('Generating FHE keypair...');
  const keys = fhe.generateKeys();

  // Write keys as base64 strings to files
  fs.writeFileSync(
    'src/test/keys/publicKey.txt',
    keys.publicKey,
  );
  fs.writeFileSync(
    'src/test/keys/secretKey.txt',
    keys.secretKey,
  );
  fs.writeFileSync(
    'src/test/keys/bootstrapKey.txt',
    keys.bootstrapKey,
  );

  console.log('Keys generated successfully:');
  console.log('  - src/test/keys/publicKey.txt');
  console.log('  - src/test/keys/secretKey.txt');
  console.log('  - src/test/keys/bootstrapKey.txt');
};

generateKeys().catch(console.error);
