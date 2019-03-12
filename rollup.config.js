import buble from 'rollup-plugin-buble';

var external = Object.keys(require('./package.json').dependencies);

export default {
  input: 'src/index.js',
  output: [
    { file: 'dist/rollup-plugin-stylus-compiler.cjs.js', format: 'cjs'},
    { file: 'dist/rollup-plugin-stylus-compiler.es.js', format: 'es'}
  ],
  external: external.concat(['path']),
  plugins: [buble()]
};