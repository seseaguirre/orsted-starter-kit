// packages/@orsted/design-system/scripts/build-tokens.js
const fs = require('fs');
const path = require('path');
const { colors, spacing } = require('../tokens');

function toCSSCustomProperties(obj, prefix = '') {
  let result = '';
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const cssKey = `--<span class="math-inline">\{prefix\}</span>{prefix ? '-' : ''}${key}`;
      if (typeof value === 'object') {
        result += toCSSCustomProperties(value, cssKey);
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
      const scssKey = `$<span class="math-inline">\{prefix\}</span>{prefix ? '-' : ''}${key}`;
      if (typeof value === 'object') {
        result += toSCSSVariables(value, scssKey); // No $ for nested
      } else {
        result += `${scssKey}: ${value};\n`;
      }
    }
  }
  return result;
}

const cssVariables = `:root {\n${toCSSCustomProperties(colors, 'color')}${toCSSCustomProperties(spacing, 'spacing')}}\n`;
const scssVariables = `<span class="math-inline">\{toSCSSVariables\(colors, 'color'\)\}</span>{toSCSSVariables(spacing, 'spacing')}`;

const distDir = path.join(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

fs.writeFileSync(path.join(distDir, 'tokens.css'), cssVariables);
fs.writeFileSync(path.join(distDir, 'tokens.scss'), scssVariables);

console.log('CSS Variables generated to dist/tokens.css');
console.log('SCSS Variables generated to dist/tokens.scss');