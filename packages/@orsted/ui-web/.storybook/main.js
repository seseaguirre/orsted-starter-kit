// packages/@orsted/ui-web/.storybook/main.js
module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  webpackFinal: async (config) => {
    // Add a rule to handle JSX files
    config.module.rules.push({
      test: /\.(js|jsx)$/, // Match .js and .jsx files
      exclude: /node_modules/, // Exclude node_modules
      use: {
        loader: 'babel-loader', // Use babel-loader
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
          ],
          plugins: ['@babel/plugin-transform-runtime'],
        },
      },
    });
    return config;
  },
};