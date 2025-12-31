import { CompactPkePublicParams, TfheClientKey, TfheCompactPublicKey } from '@luxfhe/wasm/node';
import fs from 'fs';
import {
  SERIALIZED_SIZE_LIMIT_CRS,
  SERIALIZED_SIZE_LIMIT_PK,
} from '../constants';
import { PublicParams } from '../sdk/encrypt';

const privKey = fs.readFileSync(`${__dirname}/keys/privateKey.bin`);
const pubKey = fs.readFileSync(`${__dirname}/keys/publicKey.bin`);
const params2048 = fs.readFileSync(`${__dirname}/keys/crs2048.bin`);

export const publicKeyId = 'a79cf60f1da7ec35be80adb94d56a7bb420d365b';
const publicParamsId = 'a09e1c173c85fe76b36bf7e851202a8c2eb3a827';
export const privateKey = TfheClientKey.safe_deserialize(
  privKey,
  SERIALIZED_SIZE_LIMIT_PK,
);
export const publicKey = TfheCompactPublicKey.safe_deserialize(
  pubKey,
  SERIALIZED_SIZE_LIMIT_PK,
);
export const publicParams: PublicParams = {
  2048: {
    publicParams: CompactPkePublicParams.safe_deserialize(
      params2048,
      SERIALIZED_SIZE_LIMIT_CRS,
    ),
    publicParamsId,
  },
};
