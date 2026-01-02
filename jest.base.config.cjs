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
  // Use npm-installed @luxfhe packages (which bundle node-tfhe/node-tkms)
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
