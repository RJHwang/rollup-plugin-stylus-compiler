import test from 'ava'
import fse from 'fs-extra'
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
  await fse.remove(toDir) // clean
  const jsFile = path.join(toDir, 'main.js')
  const cssFile = path.join(toDir, 'main.css')
  const cssMinFile = path.join(toDir, 'main.min.css')

  const bundle = await rollup({
    input: 'main.js',
    plugins: [
      stylus(),
      cssPorter()
    ]
  })

  await bundle.write({
    format: 'es',
    file: jsFile
  });

  t.true(await fse.exists(jsFile))

  t.true(await fse.exists(cssFile))
  let content = await fse.readFile(cssFile, { encoding: 'UTF-8' })
  t.is('.styl {\n  padding: 0;\n}\n', content)

  t.true(await fse.exists(cssMinFile))
  content = await fse.readFile(cssMinFile, { encoding: 'UTF-8' })
  t.is('.styl{padding:0}', content)
});

test("compile and inline into module with postcss plugin", async t => {
  const toDir = path.join(testDir, 'postcss')
  await fse.remove(toDir) // clean
  const jsFile = path.join(toDir, 'main.js')

  const bundle = await rollup({
    input: 'main.js',
    plugins: [
      stylus(),
      postcss({
        include: ['**/*.css'], // only deal css file
        extract: false,        // inject css to head
        plugins: [cssnano]     // minified css
      })
    ]
  })

  await bundle.write({
    format: 'es',
    file: jsFile
  });

  t.true(await fse.exists(jsFile))

  const content = await fse.readFile(jsFile, { encoding: 'UTF-8' })
  t.true(content.includes('var css = ".styl{padding:0}";'))
  t.true(content.includes('styleInject(css);'))
});

test("compile and output to css file with css-only plugin", async t => {
  const toDir = path.join(testDir, 'css-only')
  await fse.remove(toDir) // clean
  const jsFile = path.join(toDir, 'main.js')
  const cssFile = path.join(toDir, 'main.css')

  // css-only plugin need the output dir pre-existing.
  await fse.mkdir(toDir)

  const bundle = await rollup({
    input: 'main.js',
    plugins: [
      stylus(),
      cssOnly({
        output: cssFile
      })
    ]
  })

  await bundle.write({
    format: 'es',
    file: jsFile
  });

  t.true(await fse.exists(jsFile))
  t.true(await fse.exists(cssFile))
  const content = await fse.readFile(cssFile, { encoding: 'UTF-8' })
  t.is('.styl {\n  padding: 0;\n}\n', content)
});