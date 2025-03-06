// packages/@orsted/design-system/scripts/build-tokens.js
const fs = require('fs');
const path = require('path');
const { colors, spacing } = require('../tokens');

function toCSSCustomProperties(obj, prefix = "") {
  let result = '';

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const cssKey = `--${prefix}${prefix ? '-' : ''}${key}`; // Corrected line

      if (typeof value === 'object') {
        // Recursive call for nested objects
        result += toCSSCustomProperties(value, `${prefix}${prefix ? '-' : ''}${key}`);
      } else {
        result += `${cssKey}: ${value};\n`;
      }
    }
  }
  return result;
}

function toSCSSVariables(obj, prefix = '') {
  let result = '';
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const scssKey = `$${prefix}${prefix ? '-' : ''}${key}`;
      if (typeof value === 'object') {
        result += toSCSSVariables(value, `${prefix}${prefix ? '-' : ''}${key}`);
      } else {
        result += `${scssKey}: ${value};\n`;
      }
    }
  }
  return result;
}
const cssVariables = `:root {\n${toCSSCustomProperties(colors, 'color')}${toCSSCustomProperties(spacing, 'spacing')}}\n`;

const scssVariables = `${toSCSSVariables(colors, 'color')}${toSCSSVariables(spacing, 'spacing')}`;

const distDir = path.join(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

fs.writeFileSync(path.join(distDir, 'tokens.css'), cssVariables);
fs.writeFileSync(path.join(distDir, 'tokens.scss'), scssVariables);

console.log('CSS Variables generated to dist/tokens.css');
console.log('SCSS Variables generated to dist/tokens.scss');