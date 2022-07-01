/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
    moduleNameMapper: {
        '\\.(css|less|scss|svg)$': 'identity-obj-proxy',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    testEnvironment: 'node',
    preset: 'ts-jest',
    setupFilesAfterEnv: ['<rootDir>\\tests\\setupTests.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testPathIgnorePatterns: ['./.next/', './node_modules/'],
    snapshotSerializers: ['enzyme-to-json\\serializer'],

    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.jest.json',
        },
    },
}
