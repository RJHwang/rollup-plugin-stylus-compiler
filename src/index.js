import { createFilter } from 'rollup-pluginutils'
import compiler from 'stylus'

export default function(options = {}) {
  // set default stylus file extensions
  if (!options.include) options.include = ['**/*.styl', '**/*.stylus']

  const filter = createFilter(options.include, options.exclude);

  // use to cache the compiled content
  // structure: {[compiledId]: [compiledContent], originId: [originId]}
  const compiledCache = {}

  return {
    name: 'rollup-plugin-stylus-compiler',
    resolveId(importee, importer) {
      // if importee is a compiled id then return it.
      // This will make it transmit to next plugin directly.
      if (compiledCache[importee]) return importee
    },
    load(id) {
      // if id is a compiled id then return the compiled content. 
      // No need to transform again.
      if (compiledCache[id]) return compiledCache[id]
    },
    transform(code, id) {
      if (!filter(id)) return null
      return new Promise(function(resolve, reject) {
        compiler(code).render(function(err, css) {
          if (err) reject(err)
          else {
            // cache the compiled content
            // use .css extention so next plugin can deal it as pure css
            const compiledId = id + '.css'

            compiledCache[compiledId] = css
            compiledCache['originId'] = id

            resolve({
              // make next css plugin work
              code: `import ${JSON.stringify(compiledId)}`,
              map: { mappings: '' }
            })
          }
        })
      })
    }
  }
}