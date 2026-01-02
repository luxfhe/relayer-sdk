// Use native Go FHE via @luxfhe/wasm
import { init, getLuxFHE, type LuxFHEKeys } from '@luxfhe/wasm';
import { bytesToHexNo0x } from './utils/bytes';

let initialized = false;

/**
 * Initialize the native FHE WASM module
 */
export const initFHE = async (): Promise<void> => {
  if (!initialized) {
    await init();
    initialized = true;
  }
};

/**
 * Create a new FHE keypair using native Go FHE
 */
export const createTfheKeypair = async (): Promise<LuxFHEKeys> => {
  await initFHE();
  const fhe = getLuxFHE();
  return fhe.generateKeys();
};

/**
 * Create a new FHE public key (hex string without 0x prefix)
 */
export const createTfhePublicKey = async (): Promise<string> => {
  const keys = await createTfheKeypair();
  return keys.publicKey; // Already base64, convert if needed
};

// Re-export types for compatibility
export type { LuxFHEKeys };
