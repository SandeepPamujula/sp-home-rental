// web-build-config.js
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: [
          // Add any modules that need to be transpiled here
        ],
      },
    },
    argv
  );
  
  // Customize the config for web
  // Add any web-specific configurations here
  
  return config;
};
