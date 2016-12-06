# rollup-plugin-stylus-compiler

A rollup plugin to compile stylus file (`.styl`) to css file. This plugin only integrates [stylus](https://github.com/stylus/stylus) to do the compile job. 
Need other plugin to deal with the compiled css file. Such as use [rollup-plugin-postcss](https://github.com/egoist/rollup-plugin-postcss) 
to inline css into module, or use [rollup-plugin-css-only](https://github.com/thgh/rollup-plugin-css-only) to save css to a standalone file.

## Installation

```bash
npm install --save-dev rollup-plugin-stylus-compiler
```

## Usage

```js
import { rollup } from 'rollup';
import stylus from 'rollup-plugin-stylus-compiler';
import postcss from 'rollup-plugin-postcss';

rollup({
  entry: 'main.js',
  plugins: [ stylus(), postcss()]
});
```

## Build

```bash
npm run build
```