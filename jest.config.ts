/** @type {import('ts-jest').JestConfigWithTsJest} **/
export = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/**/*.test.ts'],
    verbose: true,
    clearMocks: true,
    collectCoverage: false,
    collectCoverageFrom: [
        'src/*/*.ts',
        '!src/middlewares/*.ts',
        '!src/populate/*.ts',
        '!src/*/*Tests.ts',
    ],
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: ['/node_modules/'],
};
