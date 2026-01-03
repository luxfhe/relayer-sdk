import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { ignoreURL, changeLoadingWorker } from './vite.replace';

const basePath = process.env.BASE_PATH || '/';

// https://vitejs.dev/config/
export default defineConfig({
  base: basePath,
  build: {
    lib: {
      name: 'relayerSDK',
      fileName: 'relayer-sdk-js',
      entry: ['lib/web.js'],
    },
    outDir: 'bundle',
  },
  plugins: [
    // Patch 'lib/web.js'
    // Replace "const worker = new Worker(new URL('./workerHelpers.js', import.meta.url) ..."
    // by a bunch of code to perform a more complex 'new Worker' object instantiation using a custom url
    // (instead of the hardcoded 'new URL('./workerHelpers.js', import.meta.url)').
    changeLoadingWorker(basePath),
    ignoreURL(basePath),
    nodePolyfills(),
    // NOTE: WASM files are loaded dynamically at runtime from @luxfhe/wasm package
    // No static copy needed - the wasm module handles its own loading
  ],
  worker: {
    format: 'iife',
    plugins: () => [ignoreURL(basePath)],
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
});
