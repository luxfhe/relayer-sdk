import OMT from '@surma/rollup-plugin-off-main-thread';

import copy from 'rollup-plugin-copy';
import json from '@rollup/plugin-json';
import url from '@rollup/plugin-url';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import path from 'path';
import fs from 'fs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// Find @luxfhe/wasm package path (native Go FHE)
let luxfheWasmPath;
try {
  // Try to resolve from package.json export
  luxfheWasmPath = path.dirname(require.resolve('@luxfhe/wasm/package.json'));
} catch {
  // Fallback: resolve the main entry and go up
  const mainPath = require.resolve('@luxfhe/wasm');
  luxfheWasmPath = path.resolve(path.dirname(mainPath), '..');
}

const nodePlugins = [
  json(),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.rollup.json',
  }),
];

const webPlugins = [
  json(),
  url(),
  nodePolyfills(),
  typescript({
    tsconfig: './tsconfig.rollup.json',
  }),
  commonjs(),
  resolve({
    browser: true,
    resolveOnly: ['@luxfhe/wasm', '@luxfhe/kms'],
    extensions: ['.js', '.ts', '.wasm'],
  }),
];

export default [
  {
    input: 'src/web.ts',
    output: {
      file: 'lib/web.js',
      name: 'relayer-sdk-js',
      format: 'es',
    },
    plugins: [
      ...webPlugins,
      copy({
        targets: [
          { src: path.join(luxfheWasmPath, 'wasm/luxfhe.wasm'), dest: 'lib/' },
          { src: path.join(luxfheWasmPath, 'wasm/wasm_exec.js'), dest: 'lib/' },
        ],
      }),
    ],
  },
  // Build 'workerHelpers.js' in ESM format
  // Skip this for now - it's optional for worker thread support
  // {
  //   input: path.join(tfhePath, `snippets/${wasmBindgenRayon}/src/workerHelpers.js`),
  //   output: {
  //     file: 'lib/workerHelpers.js',
  //     inlineDynamicImports: true,
  //     name: 'worker',
  //     format: 'esm',
  //   },
  //   plugins: [OMT()],
  // },
  {
    input: 'src/node.ts',
    output: {
      file: 'lib/node.cjs',
      name: 'relayer-sdk-js',
      format: 'cjs',
    },
    plugins: [...nodePlugins],
    // Suppress warning
    // https://rollupjs.org/troubleshooting/#warning-treating-module-as-external-dependency
    external: ['ethers', 'fetch-retry', '@luxfhe/wasm', '@luxfhe/kms', 'keccak'],
  },
  {
    input: 'src/node.ts',
    output: {
      file: 'lib/node.js',
      name: 'relayer-sdk-js',
      format: 'es',
    },
    plugins: [...nodePlugins],
    // Suppress warning
    // https://rollupjs.org/troubleshooting/#warning-treating-module-as-external-dependency
    external: ['ethers', 'fetch-retry', '@luxfhe/wasm', '@luxfhe/kms', 'keccak'],
  },
  // Internal entry point for bin/ scripts (not part of public API)
  {
    input: 'src/internal.ts',
    output: {
      file: 'lib/internal.js',
      name: 'relayer-sdk-internal',
      format: 'es',
    },
    plugins: [...nodePlugins],
    external: ['ethers', 'fetch-retry', '@luxfhe/wasm', '@luxfhe/kms', 'keccak'],
  },
];
