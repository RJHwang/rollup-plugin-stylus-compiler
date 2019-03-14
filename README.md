# rollup-plugin-stylus-compiler

A rollup plugin to compile stylus file (`.styl or .stylus`) to css file. This plugin only integrates [stylus](https://github.com/stylus/stylus) to do the compile job.
Need other plugin to deal with the compiled css content. Such as:

- [rollup-plugin-css-porter] - output css to a standalone file, also with a minified version
- [rollup-plugin-css-only] - output css to a standalone file.
- [rollup-plugin-postcss] - inline css into module

Supported rollup version :

| plugin version | rollup version
|----------------|----------------
| 1.x            | 1.x
| 0.4.x          | 0.48.0~0.68.2
| 0.1.0~0.3.x    | 0.36.0~0.47.6

## Installation

Use `npm`:

```bash
npm install --save-dev rollup-plugin-stylus-compiler
// or
npm i -D rollup-plugin-stylus-compiler
```

Use `yarn`:

```bash
yarn add rollup-plugin-stylus-compiler --dev
```

## Usage

### Case 1: use with [rollup-plugin-css-porter] plugin

```js
import { rollup } from 'rollup';
import stylus from 'rollup-plugin-stylus-compiler';
import css from 'rollup-plugin-css-porter';

rollup({
  input: 'main.js',
  plugins: [ stylus(), css()]
}).then(bundle => {
  bundle.write({
    format: 'es',
    file: 'bundle.js'
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
  input: 'main.js',
  plugins: [ stylus(), postcss({ include: '**/*.css' })]
}).then(bundle => {
  bundle.write({
    format: 'es',
    file: 'bundle.js'
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
  input: 'main.js',
  plugins: [ stylus(), css()]
}).then(bundle => {
  bundle.write({
    format: 'es',
    file: 'bundle.js'
  });
});
```

Output `bundle.css`.

## Build

Use `npm`:

```bash
npm run build
```

Use `yarn`:

```bash
yarn run build
```

## Run test

Use `npm`:

```bash
npm test
```

Use `yarn`:

```bash
yarn test
```


[rollup-plugin-postcss]: https://github.com/egoist/rollup-plugin-postcss
[rollup-plugin-css-porter]: https://github.com/thgh/rollup-plugin-css-porter
[rollup-plugin-css-only]: https://github.com/thgh/rollup-plugin-css-only
