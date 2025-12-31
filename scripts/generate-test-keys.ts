import {
  TfheCompactPublicKey,
  TfheConfigBuilder,
  TfheClientKey,
  ShortintParameters,
  ShortintParametersName,
  CompactPkeCrs,
  ShortintCompactPublicKeyEncryptionParameters,
  ShortintCompactPublicKeyEncryptionParametersName,
} from '@luxfhe/wasm/node';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SERIALIZED_SIZE_LIMIT = BigInt(1024 * 1024 * 1024); // 1GB

console.log('Generating TFHE test keys for tfhe 0.8.7...');

// Generate the keypair
const block_params = new ShortintParameters(
  ShortintParametersName.PARAM_MESSAGE_2_CARRY_2_KS_PBS_TUNIFORM_2M64,
);
const casting_params = new ShortintCompactPublicKeyEncryptionParameters(
  ShortintCompactPublicKeyEncryptionParametersName.SHORTINT_PARAM_PKE_MESSAGE_2_CARRY_2_KS_PBS_TUNIFORM_2M64,
);
const config = TfheConfigBuilder.default()
  .use_custom_parameters(block_params)
  .use_dedicated_compact_public_key_parameters(casting_params)
  .build();

console.log('Generating client key...');
const clientKey = TfheClientKey.generate(config);

console.log('Generating compact public key...');
const publicKey = TfheCompactPublicKey.new(clientKey);

console.log('Generating CRS (2048 inputs)...');
const crs = CompactPkeCrs.from_config(config, 2048);

// Serialize keys using safe_serialize
console.log('Serializing keys...');
const privateKeyBin = clientKey.safe_serialize(SERIALIZED_SIZE_LIMIT);
const publicKeyBin = publicKey.safe_serialize(SERIALIZED_SIZE_LIMIT);
const crsBin = crs.public_params().safe_serialize(SERIALIZED_SIZE_LIMIT);

// Compute IDs (first 20 bytes of SHA-256)
const publicKeyId = crypto.createHash('sha256').update(publicKeyBin).digest('hex').slice(0, 40);
const crsId = crypto.createHash('sha256').update(crsBin).digest('hex').slice(0, 40);

// Write to test/keys directory
const keysDir = path.join(__dirname, '../src/test/keys');
fs.mkdirSync(keysDir, { recursive: true });

fs.writeFileSync(path.join(keysDir, 'privateKey.bin'), privateKeyBin);
fs.writeFileSync(path.join(keysDir, 'publicKey.bin'), publicKeyBin);
fs.writeFileSync(path.join(keysDir, 'crs2048.bin'), crsBin);

console.log('Keys generated and saved to src/test/keys/');
console.log(`  privateKey.bin: ${privateKeyBin.length} bytes`);
console.log(`  publicKey.bin: ${publicKeyBin.length} bytes`);
console.log(`  crs2048.bin: ${crsBin.length} bytes`);
console.log(`  publicKeyId: ${publicKeyId}`);
console.log(`  crsId: ${crsId}`);

// Update the test/index.ts with new IDs
const testIndexPath = path.join(__dirname, '../src/test/index.ts');
let testIndex = fs.readFileSync(testIndexPath, 'utf-8');
testIndex = testIndex.replace(/export const publicKeyId = '[a-f0-9]+';/, `export const publicKeyId = '${publicKeyId}';`);
testIndex = testIndex.replace(/const publicParamsId = '[a-f0-9]+';/, `const publicParamsId = '${crsId}';`);
fs.writeFileSync(testIndexPath, testIndex);

console.log('Updated src/test/index.ts with new key IDs');
console.log('Done!');
