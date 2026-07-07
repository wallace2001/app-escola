// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    // dist e componentes gerados pelo CLI do gluestack-ui
    ignores: ["dist/*", "src/components/ui/**"],
  }
]);
