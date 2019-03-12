# rollup-plugin-stylus-compiler

A rollup plugin to compile stylus file (`.styl or .stylus`) to css file. This plugin only integrates [stylus](https://github.com/stylus/stylus) to do the compile job.
Need other plugin to deal with the compiled css content. Such as:

- [rollup-plugin-css-porter] - output css to a standalone file, also with a minified version
- [rollup-plugin-postcss] - inline css into module
- [rollup-plugin-css-only] - output css to a standalone file.

Supported rollup version :

| this version | rollup version
|--------------|----------------
| 0.1.0~0.3.x  | 0.36.0~0.47.6

## Installation

```bash
npm install --save-dev rollup-plugin-stylus-compiler
```

## Usage

### Case 1: use with [rollup-plugin-css-porter] plugin

```js
import { rollup } from 'rollup';
import stylus from 'rollup-plugin-stylus-compiler';
import css from 'rollup-plugin-css-porter';

rollup({
  entry: 'main.js',
  plugins: [ stylus(), css()]
}).then(bundle => {
  bundle.write({
    format: 'es',
    dest: 'bundle.js'
  });
});
```

Output `bundle.css` and `bundle.min.css`.

### Case 2: use with [rollup-plugin-postcss] plugin

```js
import { rollup } from 'rollup';
import stylus from 'rollup-plugin-stylus-compiler';
import postcss from 'rollup-plugin-postcss';

rollup({
  entry: 'main.js',
  plugins: [ stylus(), postcss()]
}).then(bundle => {
  bundle.write({
    format: 'es',
    dest: 'bundle.js'
  });
});
```

Inline css to `bundle.js`.


### Case 3: use with [rollup-plugin-css-only] plugin

```js
import { rollup } from 'rollup';
import stylus from 'rollup-plugin-stylus-compiler';
import css from 'rollup-plugin-css-only';

rollup({
  entry: 'main.js',
  plugins: [ stylus(), css()]
}).then(bundle => {
  bundle.write({
    format: 'es',
    dest: 'bundle.js'
  });
});
```

Output `bundle.css`.

## Build

```bash
npm run build
```

## Run Test

```bash
npm test
```


[rollup-plugin-postcss]: https://github.com/egoist/rollup-plugin-postcss
[rollup-plugin-css-porter]: https://github.com/thgh/rollup-plugin-css-porter
[rollup-plugin-css-only]: https://github.com/thgh/rollup-plugin-css-only
