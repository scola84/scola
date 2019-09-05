const plugins = require('@scola/worker/rollup.plugins')
const ignore = require('rollup-plugin-ignore')

const external = [
  'messagebird',
  'mysql',
  'nodemailer',
  'pg',
  'pg-query-stream',
  'sqlstring',
  'postal-codes-js',
  'bcrypt',
  'busboy',
  'fs-extra',
  'http',
  'msgpack-lite',
  'net',
  'parse5',
  'shortid',
  'tls',
  'fs-extra',
  'node-cron'
]

const globals = {
  messagebird: 'messagebird',
  mysql: 'mysql',
  nodemailer: 'nodemailer',
  pg: 'pg',
  'pg-query-stream': 'pgQueryStream',
  sqlstring: 'sqlstring',
  'postal-codes-js': 'postalCodesJs',
  bcrypt: 'bcrypt',
  busboy: 'busboy',
  'fs-extra': 'fsExtra',
  http: 'http',
  'msgpack-lite': 'msgpackLite',
  net: 'net',
  parse5: 'parse5',
  shortid: 'shortid',
  tls: 'tls',
  'node-cron': 'nodeCron'
}

const input = './index.js'

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
      'dom-shims',
      'fastclick'
    ]),
    ...plugins
  ]
}]
