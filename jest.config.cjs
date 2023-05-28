/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts'],
    testPathIgnorePatterns: ['.js'],
    collectCoverage: true,
    transform: {
        '^.+.ts$': [
            'ts-jest',
            {
                isolatedModules: true,
                tsconfig: 'tests/tsconfig.json',
            },
        ],
    },
    collectCoverageFrom: ['src/resolvers/*.resolvers.{ts}'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
}
