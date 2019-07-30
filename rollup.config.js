import { writeFileSync } from 'fs';
import buble from 'rollup-plugin-buble';
import builtins from 'rollup-plugin-node-builtins';
import css from 'rollup-plugin-css-only';
import commonjs from 'rollup-plugin-commonjs';
import ignore from 'rollup-plugin-ignore';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';

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
  ]).concat([
    'node-cron'
  ]);

const globals = Object.assign({
  'fs-extra': 'fsExtra',
  'marked': 'marked',
  'messagebird': 'messagebird',
  'mysql': 'mysql',
  'nodemailer': 'mysql'
}, {
  'postal-codes-js': 'postalCodesJs',
  'process': 'process'
}, {
  'bcrypt': 'bcrypt',
  'busboy': 'busboy',
  'fs': 'fs',
  'fs-extra': 'fsExtra',
  'http': 'http',
  'msgpack-lite': 'msgpackLite',
  'net': 'net',
  'parse5': 'parse5',
  'shortid': 'shortid',
  'tls': 'tls'
}, {
  'node-cron': 'nodeCron'
});

const input = './index.js';

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
    globals,
    name: 'scola'
  },
  plugins
}, {
  input,
  external,
  output: {
    file: 'dist/scola.cjs.js',
    format: 'cjs',
    globals
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
