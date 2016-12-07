import { createFilter } from 'rollup-pluginutils'
import stylus from 'stylus'

const ext = /\.styl$/;
const convertedExt = '.styl.css'

export default function(options = {}) {
  const styles = {}
  if (!options.include) options.include = '**/*.styl'
  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'rollup-plugin-stylus-compiler',
    resolveId(importee, importer) {
      if (importee.endsWith(convertedExt)) return importee
    },
    load(id) {
      if (id.endsWith(convertedExt)) return styles[id] || ''
    },
    transform(code, id) {
      if (!ext.test(id)) return null
      if (!filter(id)) return null
      return new Promise(function(resolve, reject) {
        stylus(code).render(function(err, css) {
          if (err) reject(err)
          else {
            // cache the converted content
            const cssFile = id + '.css'
            styles[cssFile] = css

            resolve({
              // make next css plugin work
              code: `import ${JSON.stringify(cssFile)}`,
              map: { mappings: '' }
            })
          }
        })
      })
    }
  }
}