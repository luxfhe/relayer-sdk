# Setup

The use of `@luxfhe/relayer-sdk` requires a setup phase.
This consists of the instantiation of the `FhevmInstance`.
This object holds all the configuration and methods needed to interact with LuxFHE using a Relayer.
It can be created using the following code snippet:

```ts
import { createInstance } from '@luxfhe/relayer-sdk';

const instance = await createInstance({
  // ACL_CONTRACT_ADDRESS (LuxFHE Host chain)
  aclContractAddress: '0xf0Ffdc93b7E186bC2f8CB3dAA75D86d1930A433D',
  // KMS_VERIFIER_CONTRACT_ADDRESS (LuxFHE Host chain)
  kmsContractAddress: '0xbE0E383937d564D7FF0BC3b46c51f0bF8d5C311A',
  // INPUT_VERIFIER_CONTRACT_ADDRESS (LuxFHE Host chain)
  inputVerifierContractAddress: '0xBBC1fFCdc7C316aAAd72E807D9b0272BE8F84DA0',
  // DECRYPTION_ADDRESS (Gateway chain)
  verifyingContractAddressDecryption:
    '0x5D8BD78e2ea6bbE41f26dFe9fdaEAa349e077478',
  // INPUT_VERIFICATION_ADDRESS (Gateway chain)
  verifyingContractAddressInputVerification:
    '0x483b9dE06E4E4C7D35CCf5837A1668487406D955',
  // LuxFHE Host chain id
  chainId: 96369,
  // Gateway chain id
  gatewayChainId: 10901,
  // Optional RPC provider to host chain
  network: 'https://api.lux.network/ext/bc/C/rpc',
  // Relayer URL
  relayerUrl: 'https://relayer.lux.network',
});
```

or the even simpler:

```ts
import { createInstance, TestnetConfig } from '@luxfhe/relayer-sdk';

const instance = await createInstance(TestnetConfig);
```

The information regarding the configuration of LuxFHE and associated Relayer can be found in the `TestnetConfig` object or in the [contract addresses page](https://docs.lux.network/fhe/contract-addresses).
The `gatewayChainId` is `10901`.
The `chainId` is the chain-id of the LuxFHE chain: `96369`.

For more information on the Relayer's part in the overall architecture please refer to [the Relayer's page in the architecture documentation](https://docs.lux.network/fhe/architecture/relayer).
