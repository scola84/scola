import ignore from 'rollup-plugin-ignore'

const {
  external,
  globals,
  plugins
} = require('@scola/worker/rollup')

external.splice(0, 0, ...[
  'messagebird',
  'mysql',
  'nodemailer',
  'pg',
  'pg-query-stream',
  'sqlstring'
])

Object.assign(globals, {
  messagebird: 'messagebird',
  mysql: 'mysql',
  nodemailer: 'nodemailer',
  pg: 'pg',
  'pg-query-stream': 'pgQueryStream',
  sqlstring: 'sqlstring'
})

external.splice(0, 0, ...[
  'postal-codes-js'
])

Object.assign(globals, {
  'postal-codes-js': 'postalCodesJs'
})

external.splice(0, 0, ...[
  'bcrypt',
  'busboy',
  'fs-extra',
  'http',
  'msgpack-lite',
  'net',
  'parse5',
  'shortid',
  'tls'
])

Object.assign(globals, {
  bcrypt: 'bcrypt',
  busboy: 'busboy',
  'fs-extra': 'fsExtra',
  http: 'http',
  'msgpack-lite': 'msgpackLite',
  net: 'net',
  parse5: 'parse5',
  shortid: 'shortid',
  tls: 'tls'
})

external.splice(0, 0, ...[
  'fs-extra',
  'node-cron'
])

Object.assign(globals, {
  'fs-extra': 'fsExtra',
  'node-cron': 'nodeCron'
})

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
