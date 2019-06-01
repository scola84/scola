import { writeFileSync } from 'fs';
import buble from 'rollup-plugin-buble';
import builtins from 'rollup-plugin-node-builtins';
import css from 'rollup-plugin-css-only';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';

const cssOptions = {
  include: [new RegExp('.css')],
  output: (styles) => {
    styles = styles.replace(
      /..\/fonts\/ionicons/g,
      'https://unpkg.com/ionicons@4.5.6/dist/fonts/ionicons'
    );

    writeFileSync('dist/scola.css', styles);
  }
};

const bubleOptions = {
  transforms: {
    dangerousForOf: true
  }
};

export default {
  input: './index.js',
  external: []
    .concat([
      'busboy',
      'file-api',
      'fs',
      'fs-extra',
      'msgpack-lite',
      'parse5',
      'shortid'
    ]).concat([
      'bcrypt',
      'fs',
      'http',
      'net',
      'tls'
    ]).concat([
      'mysql'
    ]),
  output: [{
    file: 'dist/scola.cjs.js',
    format: 'cjs'
  }, {
    extend: true,
    file: 'dist/scola.umd.js',
    format: 'umd',
    name: 'scola'
  }],
  plugins: [
    resolve(),
    commonjs(),
    builtins(),
    css(cssOptions),
    json(),
    buble(bubleOptions)
  ]
};
