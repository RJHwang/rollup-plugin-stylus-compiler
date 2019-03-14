# [rollup-plugin-stylus-compiler](https://github.com/RJHwang/rollup-plugin-stylus-compiler) changelog

## 1.0.0 2019-03-15

- Support rollup 1.x version
- Polishing source and test code

## 0.4.1 2019-03-12

- Polishing README - add 0.4.x supported rollup version

## 0.4.0 2019-03-12

- Upgrade to rollup-0.68.2
    > This is the latest supported rollup version on `0.4.x`,
    > because from rollup-1.0.0+, rollup-plugin api changed.
    > Supported rollup version from `0.48.0` to `0.68.2`.

## 0.3.1 2019-03-12

- Update dependencies
- Supported rollup version to 0.47.6
    > This is the latest supported rollup version on `0.3.x`,
    > because from rollup-0.48.0+, in unit test code, 1) the `options` param in `bundle.write(options)`, `options.dest` be renamed to `options.file`. 2) the `options` param in `rollup(options)`, `options.entry` be renamed to `options.input`.


## 0.3.0 2019-01-04

- Support import relative path in stylus file, such as '`@import "../../assets/variables.styl"`'
- Allow passing options to stylus compiler with key `compiler`, such as '`stylus({compiler: {...}})`'

## 0.2.1 2016-12-19

- update css-only to 0.2.0 for test
- add debug code
- polish source code comment

## 0.2.0 2016-12-12

- add default support for .stylus extension

## 0.1.1 2016-12-07

- fixed win platform test failed
- amended plugin name to 'rollup-plugin-stylus-compiler'

## 0.1.0 2016-12-06

- initial: default support for .styl extension
