import { createFilter } from 'rollup-pluginutils'
import compiler from 'stylus'

export default function(options = {}) {
  // set default stylus file extensions
  if (!options.include) options.include = ['**/*.styl', '**/*.stylus']

  const filter = createFilter(options.include, options.exclude);

  // use to cache the compiled content
  // structure: {[compiledId]: [compiledContent]}
  const compiledCache = {}

  return {
    name: 'rollup-plugin-stylus-compiler',
    /**
     * Rollup default to defer to the next plugin `resolveId` function (return 
     * null or undefined). Because of the compiled id (importee) is created by 
     * this plugin and is not originally exists. So for compiled id (importee), 
     * for avoid transmit it to the next plugin to resolve it again, here need 
     * to return the compiled id itself. That means all next plugins `resolveId` 
     * function will not call any more for the compiled id.
     */
    resolveId(importee, importer) {
      if (compiledCache[importee]) return importee
    },
    /**
     * Rollup default to load content from file system (return null or undefined).
     * Because of the compiled id is created by this plugin and is not really 
     * exists in the file system. So for compiled id, here need to return the c
     * ompiled content directly (The compiled content is created and cached by 
     * the `transform` function). That means all next plugins `load` function 
     * will not call any more for the compiled id.
     */
    load(id) {
      if (compiledCache[id]) return compiledCache[id]
    },
    transform(code, id) {
      if (!filter(id)) return
      return new Promise(function(resolve, reject) {
        compiler(code).render(function(err, css) {
          if (err) reject(err)
          else {
            // cache the compiled content
            // use `.css` extention so next plugin can deal it as pure css
            const compiledId = id + '.css'

            compiledCache[compiledId] = css

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