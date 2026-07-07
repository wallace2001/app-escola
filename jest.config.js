module.exports = {
  preset: 'jest-expo',
  setupFiles: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  moduleNameMapper: {
    // o runtime do uniwind depende do transform do metro, que não roda no jest
    '^uniwind$': '<rootDir>/src/test/uniwind-mock.ts',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg|@gluestack-ui/.*|@legendapp/.*|tailwind-variants|lucide-react-native|@shopify/flash-list|react-native-css))',
  ],
};
