import test from 'ava'
import fsp from 'fs-promise'
import path from 'path'
import { rollup } from 'rollup'
import buble from 'rollup-plugin-buble'
import cssPorter from 'rollup-plugin-css-porter'
import postcss from 'rollup-plugin-postcss'
import cssnano from 'cssnano'
import cssOnly from 'rollup-plugin-css-only'
import stylus from '../../dist/rollup-plugin-stylus-compiler.cjs.js'

process.chdir(__dirname)
const testDir = path.resolve('../temp/stylus/')

test("compile and output to css file with css-porter plugin", async t => {
  const toDir = path.join(testDir, 'css-porter')
  await fsp.remove(toDir) // clean
  const jsFile = path.join(toDir, 'main.js')
  const cssFile = path.join(toDir, 'main.css')
  const cssMinFile = path.join(toDir, 'main.min.css')

  const bundle = await rollup({
    entry: 'main.js',
    plugins: [
      stylus(),
      cssPorter()
    ]
  })

  await bundle.write({
    format: 'es',
    dest: jsFile
  });

  t.true(await fsp.exists(jsFile))

  t.true(await fsp.exists(cssFile))
  let content = await fsp.readFile(cssFile, { encoding: 'UTF-8' })
  t.is('.stylus {\n  padding: 0;\n}\n', content)

  t.true(await fsp.exists(cssMinFile))
  content = await fsp.readFile(cssMinFile, { encoding: 'UTF-8' })
  t.is('.stylus{padding:0}', content)
});

test("compile and inline into module with postcss plugin", async t => {
  const toDir = path.join(testDir, 'postcss')
  await fsp.remove(toDir) // clean
  const jsFile = path.join(toDir, 'main.js')

  const bundle = await rollup({
    entry: 'main.js',
    plugins: [
      stylus(),
      postcss({
        plugins: [cssnano], // minified CSS
        extensions: ['.css']
      })
    ]
  })

  await bundle.write({
    format: 'es',
    dest: jsFile
  });

  t.true(await fsp.exists(jsFile))

  const content = await fsp.readFile(jsFile, { encoding: 'UTF-8' })
  t.true(content.includes('__$styleInject(".stylus{padding:0}",undefined);'))
});

test("compile and output to css file with css-only plugin", async t => {
  const toDir = path.join(testDir, 'css-only')
  await fsp.remove(toDir) // clean
  const jsFile = path.join(toDir, 'main.js')
  const cssFile = path.join(toDir, 'main.css')

  // css-only plugin need the output dir pre-existing.
  await fsp.mkdir(toDir)

  const bundle = await rollup({
    entry: 'main.js',
    plugins: [
      stylus(),
      cssOnly({
        output: cssFile
      })
    ]
  })

  await bundle.write({
    format: 'es',
    dest: jsFile
  });

  t.true(await fsp.exists(jsFile))

  // css-only has a test bug (not return a promise for write css file)
  // so delay to validate the output css file
  await new Promise(function(resolve, reject) {
    setTimeout(() => resolve(), 500);
  })
  t.true(await fsp.exists(cssFile))
  const content = await fsp.readFile(cssFile, { encoding: 'UTF-8' })
  t.is('.stylus {\n  padding: 0;\n}\n', content)
});