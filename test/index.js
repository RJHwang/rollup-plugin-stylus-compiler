import test from 'ava'
import fsp from 'fs-promise'
import { rollup } from 'rollup'
import buble from 'rollup-plugin-buble'
import postcss from 'rollup-plugin-postcss'
import cssnano from 'cssnano'
import cssOnly from 'rollup-plugin-css-only'
import stylus from '../dist/rollup-plugin-stylus-compiler.cjs.js'

process.chdir(__dirname)

test("compile stylus and inline into module with postcss plugin", async t => {
  const jsFile = 'temp/main.js'

  const bundle = await rollup({
    entry: 'samples/main.js',
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
  t.true(content.includes('__$styleInject("body{padding:0}",undefined);'))
});

test("compile stylus and save to css file with css-only plugin", async t => {
  const jsFile = 'temp/main.js'
  const cssFile = 'temp/main.css'

  const bundle = await rollup({
    entry: 'samples/main.js',
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
  t.true(await fsp.exists(cssFile))
  t.is('body {\n  padding: 0;\n}\n', await fsp.readFile(cssFile, { encoding: 'UTF-8' }))
});