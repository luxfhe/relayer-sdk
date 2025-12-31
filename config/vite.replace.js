export const changeLoadingWorker = (basePath) => ({
  name: 'regex-replace', // name of the plugin
  enforce: 'pre', // run before other plugins
  transform(code, id) {
    // Only apply transformations to .js files (or other specific conditions)
    if (id.endsWith('.js')) {
      const searchValue =
        /const worker = new Worker\(\s*new URL\(['"]\.?\/?workerHelpers(?:\.worker)?\.js['"],\s*import\.meta\.url\),\s*\{\s*type:\s*['"]module['"],?\s*\},?\s*\);/;

      const replacement = `let worker;
        try {
          worker = new Worker(
            new URL('./workerHelpers.js', import.meta.url),
            {
              type: 'module'
            }
          );
        } catch (e) {
          const r = await fetch('${basePath}workerHelpers.js');
          const blob = await r.blob();
          const blobUrl = URL.createObjectURL(blob);
          worker = new Worker(blobUrl);
        }`;

      // Check that the worker change works.
      // Note: With @luxfhe/wasm/web, the Worker pattern may not exist
      // as the WASM wrapper handles threading internally
      if (id.match('lib/web.js')) {
        const match = code.match(searchValue);
        if (!match) {
          // No Worker pattern found - this is OK with @luxfhe/wasm/web
          // The WASM module handles its own Worker instantiation
          console.log('Note: No Worker pattern found in lib/web.js - using @luxfhe/wasm/web internal threading');
        }
      }

      // Replace occurrences according to the regex pattern
      const newCode = code.replace(searchValue, replacement);

      return {
        code: newCode,
        map: null, // provide source map if available or required
      };
    }
    // Return null to signify no transformation for non-JS files or uninterested files
    return null;
  },
});

const wasmPattern = /'([a-zA-Z0-9_]+)\.wasm'/g;

export const ignoreURL = (basePath) => ({
  name: 'regex-replace', // name of the plugin
  enforce: 'pre', // run before other plugins
  transform(code, id) {
    // Only apply transformations to .js files (or other specific conditions)
    if (id.endsWith('.js')) {
      const pattern = wasmPattern; // Your regex pattern here
      const replacement = `/* @vite-ignore */ '${basePath}$1.wasm'`; // Your replacement string here

      // Replace occurrences according to the regex pattern
      // const newCode = code.replace(pattern, replacement);
      const newCode = code.replace(wasmPattern, replacement);

      return {
        code: newCode,
        map: null, // provide source map if available or required
      };
    }
    // Return null to signify no transformation for non-JS files or uninterested files
    return null;
  },
});
