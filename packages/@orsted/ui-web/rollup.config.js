// packages/@orsted/ui-web/rollup.config.js
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
// import postcssImport from 'postcss-import'; // REMOVE THIS
// const path = require('path'); // REMOVE THIS

const packageJson = require('./package.json');

export default {
  input: 'src/index.js',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: ['@babel/plugin-transform-runtime'],
      runtimeHelpers: true,
    }),
    commonjs(),
    postcss({
      extract: true,
      modules: false,
      use: ['sass'],
      // plugins: [ // REMOVE THIS ENTIRE plugins ARRAY
      //   postcssImport({
      //     resolve: (id, basedir) => {
      //       if (id.startsWith('@orsted/design-system')) {
      //         return path.resolve(__dirname, '../../design-system', id.replace('@orsted/design-system', ''));
      //       }
      //       return path.resolve(basedir, id);
      //     }
      //   })
      // ]
    }),
  ],
};