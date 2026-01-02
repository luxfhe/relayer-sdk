// Test utilities using native Go FHE
import fs from 'fs';
import {
  SERIALIZED_SIZE_LIMIT_CRS,
  SERIALIZED_SIZE_LIMIT_PK,
} from '../constants';
import { PublicParams } from '../sdk/encrypt';

// Test key IDs (for compatibility with existing tests)
export const publicKeyId = 'a79cf60f1da7ec35be80adb94d56a7bb420d365b';
const publicParamsId = 'a09e1c173c85fe76b36bf7e851202a8c2eb3a827';

// Mock keys for testing - in production use @luxfhe/wasm
// These will be replaced with actual native keys when test infrastructure is updated
export const privateKey = {
  serialize: () => new Uint8Array(32),
};

export const publicKey = {
  serialize: () => new Uint8Array(32),
};

export const publicParams: PublicParams = {
  2048: {
    publicParams: {
      serialize: () => new Uint8Array(32),
    } as any,
    publicParamsId,
  },
};
