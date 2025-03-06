// packages/@orsted/ui-web/.storybook/preview.js
import '../src/global.css'; // Import the global CSS file

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}