import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import url from '@rollup/plugin-url'
import svgr from '@svgr/rollup'
import postcss from 'rollup-plugin-postcss';
import minify from 'rollup-plugin-babel-minify';

import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    minify(),
    external(),
    postcss({
      modules: true
    }),
    url(),
    svgr(),
    babel({
      exclude: 'node_modules/**',
      //plugins: [ 'external-helpers' ]
    }),
    resolve(),
    commonjs()
  ]
}



// import babel from 'rollup-plugin-babel';
// import commonjs from '@rollup/plugin-commonjs'
// import external from 'rollup-plugin-peer-deps-external'
// import resolve from '@rollup/plugin-node-resolve'
// import url from '@rollup/plugin-url'
// import svgr from '@svgr/rollup'
// import postcss from 'rollup-plugin-postcss';
// import minify from 'rollup-plugin-babel-minify';
// import copy from 'rollup-plugin-copy'

// import pkg from './package.json'

// export default {
//   input: 'src/index.js',
//   output: [
//     {
//       file: pkg.main,
//       format: 'cjs',
//       sourcemap: true
//     },
//     {
//       file: pkg.module,
//       format: 'es',
//       sourcemap: true
//     }
//   ],
//   plugins: [
//     minify(),
//     external(),
//     postcss({
//       modules: true
//     }),
//     url(),
//     svgr(),
//     babel({
//       exclude: 'node_modules/**',
//       //plugins: [ 'external-helpers' ]
//     }),
//     resolve(),
//     commonjs(),
//     copy({
//       targets: [
//         { src: 'src/index.d.ts', dest: 'dist' }
//       ]
//     })
//   ]
// }


// SubFolders

// export default {
//   input: {
// 	// 'index': 'src/index.js',
// 	'button':'src/components/button/index.js',
// 	'checkbox': 'src/components/checkbox/index.js',
// 	'input':'src/components/input/index.js',
//   'select':'src/components/select/index.js', 
//   'accountbubble': 'src/components/accountBubble/index.js',
//   'dialog':'src/components/dialog/index.js',
//   'colorpicker': 'src/components/colorPicker/index.js',
//   'pane':'src/components/pane/index.js',
//   'picker':'src/components/picker/index.js',
//   'switch': 'src/components/switch/index.js',
//   'tag': 'src/components/tag/index.js',
//   'slider': 'src/components/slider/index.js',
//   },
//   output: [
// 		{
// 			dir: 'lib',
//       format: 'esm',
//     },
//     {
//       dir: 'lib',
//       format: 'cjs',
//     }
//   ],
//   external: ['halfeind-utils'],
//   plugins: [
//     postcss({
//       modules: true,
//       // extract: 'lib/style/style.css',
//       // sourceMap: true,
//       minimize: true,
//     }),
//     external(),
//     url(),
//     svgr(),
//     babel({
//       exclude: 'node_modules/**',
//       externalHelpers: true,
//       //plugins: [ '@babel/plugin-external-helpers' ]
//     }),
//     resolve(),
//     commonjs()
//   ]
// }