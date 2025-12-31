# Build a web application

This document guides you through building a web application using the `@luxfhe/relayer-sdk` library.

## Using directly the library

### Step 1: Setup the library

`@luxfhe/relayer-sdk` consists of multiple files, including WASM files and WebWorkers, which can make packaging these components correctly in your setup cumbersome. To simplify this process, especially if you're developing a dApp with server-side rendering (SSR), we recommend using our CDN.

#### Using UMD CDN

The LuxFHE CDN url format is `https://raw.githubusercontent.com/luxfhe/relayer-sdk/main/relayer-sdk/bundle/luxfhe-sdk.umd.cjs`

Include this line at the top of your project.

```html
<script
  src="https://raw.githubusercontent.com/luxfhe/relayer-sdk/main/relayer-sdk/bundle/luxfhe-sdk.umd.cjs"
  type="text/javascript"
></script>
```

In your project, you can use the bundle import if you install `@luxfhe/relayer-sdk` package:

```javascript
import {
  initSDK,
  createInstance,
  TestnetConfig,
} from '@luxfhe/relayer-sdk/bundle';
```

#### Using ESM CDN

If you prefer You can also use the `@luxfhe/relayer-sdk` as a ES module:

```html
<script type="module">
  import {
    initSDK,
    createInstance,
    TestnetConfig,
  } from 'https://raw.githubusercontent.com/luxfhe/relayer-sdk/main/relayer-sdk/bundle/luxfhe-sdk.umd.cjs';

  await initSDK();
  const config = { ...TestnetConfig, network: window.ethereum };
  config.network = window.ethereum;
  const instance = await createInstance(config);
</script>
```

#### Using npm package

Install the `@luxfhe/relayer-sdk` library to your project:

```bash
# Using npm
npm install @luxfhe/relayer-sdk

# Using Yarn
yarn add @luxfhe/relayer-sdk

# Using pnpm
pnpm add @luxfhe/relayer-sdk
```

`@luxfhe/relayer-sdk` uses ESM format. You need to set the [type to "module" in your package.json](https://nodejs.org/api/packages.html#type). If your node project use `"type": "commonjs"` or no type, you can force the loading of the web version by using `import { createInstance } from '@luxfhe/relayer-sdk/web';`

```javascript
import { initSDK, createInstance, TestnetConfig } from '@luxfhe/relayer-sdk';
```

### Step 2: Initialize your project

To use the library in your project, you need to load the WASM of [TFHE](https://www.npmjs.com/package/tfhe) first with `initSDK`.

```javascript
import { initSDK } from '@luxfhe/relayer-sdk/bundle';

const init = async () => {
  await initSDK(); // Load needed WASM
};
```

### Step 3: Create an instance

Once the WASM is loaded, you can now create an instance.

```javascript
import {
  initSDK,
  createInstance,
  TestnetConfig,
} from '@luxfhe/relayer-sdk/bundle';

const init = async () => {
  await initSDK(); // Load FHE
  const config = { ...TestnetConfig, network: window.ethereum };
  return createInstance(config);
};

init().then((instance) => {
  console.log(instance);
});
```

You can now use your instance to [encrypt parameters](./input.md), perform [user decryptions](./user-decryption.md) or [public decryptions](./public-decryption.md).
