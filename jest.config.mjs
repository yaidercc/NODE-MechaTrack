export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: 'tsconfig.spec.json'
    }]
  },
  moduleNameMapper: {
    
    "^@common/(.*)$": "<rootDir>/src/common/$1",
    "^@core/(.*)$": "<rootDir>/src/core/$1",
    "^@config/(.*)$": "<rootDir>/src/config/$1"
  }
}
