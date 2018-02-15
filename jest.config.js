const merge = require('webpack-merge');
const paths = require('./tsconfig.json').compilerOptions.paths;

let moduleNameMapper = {};
for (let key in paths) {
  let name = key.replace(/\/\*$/, '(.*)'),
    value = paths[key][0].replace(/\*$/, '$1');
  moduleNameMapper[name] = value.replace(/^./,'<rootDir>')
}

module.exports =  merge({
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  modulePaths: [
    "<rootDir>/FrontEnd/"
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|styl)$": "<rootDir>/__mocks__/styleMock.js"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ]
}, {
    moduleNameMapper: moduleNameMapper
  });