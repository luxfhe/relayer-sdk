module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
    '^.+\\.js$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
    '^.+\\.bin$': ['<rootDir>config/rawLoader.cjs'],
  },
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleNameMapper: {
    '^@luxfhe/wasm/web$': '<rootDir>/../packages/wasm/dist/web/index.cjs',
    '^@luxfhe/wasm/node$': '<rootDir>/../packages/wasm/dist/node/index.cjs',
    '^@luxfhe/kms/web$': '<rootDir>/../packages/kms/dist/web/index.cjs',
    '^@luxfhe/kms/node$': '<rootDir>/../packages/kms/dist/node/index.cjs',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/test/*',
    '!src/test/**/*',
    '!src/**/*.d.ts',
    '!src/kms/*',
    '!src/init.ts',
    '!src/node.ts',
    '!src/web.ts',
    '!src/mock/*',
    '!src/internal.ts',
  ],
  coverageReporters: ['lcov', 'text-summary', 'json'],
  transformIgnorePatterns: ['/node_modules/'],
  coverageThreshold: {
    global: {
      branches: 45,
      functions: 58,
      lines: 60,
    },
  },
  testRegex: '\\.test\\.ts$',
};
