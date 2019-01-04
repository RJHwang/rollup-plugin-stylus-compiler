import test from 'ava'
import fsp from 'fs-promise'
import path from 'path'
import { rollup } from 'rollup'
import cssPorter from 'rollup-plugin-css-porter'
import stylus from '../../dist/rollup-plugin-stylus-compiler.cjs.js'

process.chdir(__dirname)
const testDir = path.resolve('../temp/relative-path/')

test("compile and output to css file with relative import", async t => {
  const toDir = path.join(testDir, 'css-only')
  await fsp.remove(toDir) // clean
  const jsFile = path.join(toDir, 'main.js')
  const cssFile = path.join(toDir, 'main.css')

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
  t.is('.styl {\n  padding: 10;\n}\n', content)

});
