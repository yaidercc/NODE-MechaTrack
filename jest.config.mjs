export default {
    preset: 'ts-jest',                // Here i am using ts-jest as a test engine
    testEnvironment: 'node',          // Simulate the nodejs environment
    roots: ['<rootDir>/tests'],       // Tests folder
    transform: {
        '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.spec.json' }], // Transpilate all the filles inside the tests folder with ts-jest using tsconfig.spec.json
    },
}