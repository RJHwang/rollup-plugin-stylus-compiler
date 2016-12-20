# rollup-plugin-stylus-compiler

这是一个编译 stylus 文件 (`.styl or .stylus`) 为 css 文件的 rollup 插件。
此插件仅集成 [stylus](https://github.com/stylus/stylus) 执行编译处理，
需要其它插件处理编译后的 css 内容。如：

- [rollup-plugin-css-porter] - 输出 css 为单独文件，同时生成一个压缩版本
- [rollup-plugin-postcss] - 内联 css 到 js 模块内
- [rollup-plugin-css-only] - 输出 css 为单独文件

## 安装

```bash
npm install --save-dev rollup-plugin-stylus-compiler
```

## 使用

### 案例 1: 与 [rollup-plugin-css-porter] 插件一齐使用

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

输出 `bundle.css` 和 `bundle.min.css`。

### 案例 2: 与 [rollup-plugin-postcss] 插件一齐使用

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

内联 css 到 `bundle.js`。


### 案例 3: 与 [rollup-plugin-css-only] 插件一齐使用

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

输出 `bundle.css`。

## 构建

```bash
npm run build
```

## 运行测试

```bash
npm test
```


[rollup-plugin-postcss]: https://github.com/egoist/rollup-plugin-postcss
[rollup-plugin-css-porter]: https://github.com/thgh/rollup-plugin-css-porter
[rollup-plugin-css-only]: https://github.com/thgh/rollup-plugin-css-only