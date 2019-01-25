module.exports = {
  collectCoverageFrom: [
    'app/**/*.{js,jsx}',
    '!app/**/*.test.{js,jsx}',
    '!app/*/RbGenerated*/*.{js,jsx}',
    '!app/app.js',
    '!app/global-styles.js',
    '!app/*/*/Loadable.{js,jsx}',
  ],
  coverageThreshold: {
    global: {
      statements: 98,
      branches: 91,
      functions: 98,
      lines: 98,
    },
  },
  setupTestFrameworkScriptFile: './utils/setupTests.js',
  moduleDirectories: ['node_modules', 'app'],
  moduleNameMapper: {},
  testRegex: '.*/spec/.*\\.spec\\.js$',
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
