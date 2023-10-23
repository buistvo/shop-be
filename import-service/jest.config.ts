import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  // [...]
  // Replace `ts-jest` with the preset you want to use
  // from the above list
  preset: 'ts-jest',
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.spec.json',
      },
    ],
  },
  moduleDirectories: ['node_modules', 'src', 'src/libs'],
  moduleNameMapper: {
    '^@libs/(.*)$': '<rootDir>/src/libs/$1',
  },
};

export default jestConfig;
