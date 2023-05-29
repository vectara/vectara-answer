# inline-source-cli [![NPM Version](http://img.shields.io/npm/v/inline-source-cli.svg?style=flat)](https://npmjs.com/package/inline-source-cli)

> A CLI for [inline-source](https://github.com/popeindustries/inline-source)


## Installation

Available on [npm](https://npmjs.com/package/inline-source-cli):

```sh
npm install inline-source-cli
```


## Usage

```sh
inline-source --compress false --root ./ file.html
```

... or using pipes:

```sh
cat build/index.html | inline-source --root build > build/bundle.html
```
