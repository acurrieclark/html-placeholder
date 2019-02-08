import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import sass from 'rollup-plugin-sass';
import replace from 'rollup-plugin-replace';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import clean from 'postcss-clean';


import {
  uglify
} from "rollup-plugin-uglify";

import dotenv from 'dotenv';

dotenv.config();

export default [{
  input: 'src/js/main.js',
  output: {
    name: 'htmlPlaceholder',
    file: pkg.browser,
    format: 'iife'
  },
  plugins: [
    replace({
      delimiters: ['<@', '@>'],
      values: {
        UNSPLASH_ID: process.env.UNSPLASH_ID || 'Please place unsplash id in .env file and rebuild',
      }
    }),
    sass({
      output: 'dist/css/main.css',
      processor: process.env.BUILD == 'production' && (css => postcss([autoprefixer, clean])
        .process(css, {
          from: undefined
        })
        .then(result => result.css))
    }),
    builtins(),
    resolve({
      preferBuiltins: true
    }), // so Rollup can find `ms`
    commonjs(), // so Rollup can convert `ms` to an ES module
    babel({
      exclude: ['node_modules/**'],
      plugins: [
        "@babel/plugin-transform-arrow-functions",
      ],
      presets: [
        "@babel/env"
      ]
    }),
    process.env.BUILD == 'production' && uglify()
  ]
}];