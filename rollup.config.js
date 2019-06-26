import { writeFileSync } from 'fs';
import buble from 'rollup-plugin-buble';
import builtins from 'rollup-plugin-node-builtins';
import css from 'rollup-plugin-css-only';
import commonjs from 'rollup-plugin-commonjs';
import ignore from 'rollup-plugin-ignore';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';

const input = './index.js';

const external = []
  .concat([
    'fs-extra',
    'marked',
    'messagebird',
    'mysql',
    'nodemailer'
  ]).concat([
    'postal-codes-js',
    'process'
  ]).concat([
    'bcrypt',
    'busboy',
    'fs',
    'fs-extra',
    'http',
    'msgpack-lite',
    'net',
    'parse5',
    'shortid',
    'tls'
  ]);

const plugins = [
  resolve(),
  commonjs(),
  builtins(),
  css({
    include: [new RegExp('.css')],
    output: (styles) => {
      writeFileSync('dist/scola.css', styles.replace(
        /\.\.\//g, 'https://unpkg.com/ionicons@4.5.6/dist/'
      ));
    }
  }),
  json(),
  buble({
    transforms: {
      dangerousForOf: true
    }
  })
];

export default [{
  input,
  external,
  output: {
    extend: true,
    file: 'dist/scola.umd.js',
    format: 'umd',
    name: 'scola'
  },
  plugins
}, {
  input,
  external,
  output: {
    file: 'dist/scola.cjs.js',
    format: 'cjs'
  },
  plugins: [
    ignore([
      'fastclick',
      'dom-shims',
      'es5-shim',
      'es6-shim',
      'es6-symbol/implement'
    ]),
    ...plugins
  ]
}];
