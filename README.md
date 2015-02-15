# mokuai-coffee

Makes your CoffeeScript [mokuai](https://github.com/JimRobs/mokuai)-able.

## Description

This module works with your CoffeeScript to create a [mokuai](https://github.com/JimRobs/mokuai) closure.

Plus, if you want to mix JavaScript and CoffeeScript mokuai modules, you can use the extra-feature **partial**, which
only compiles you CoffeeScript into mokuai modules, without wrappping them into a mokuai closure, so you can use it
as a **prepend** / **append** file in *original* mokuai.

## Usage

### CLI

If you want to use the mokuai-coffee cli, install it globally via npm:

```bash
$ npm install mokuai-coffee --global
```

Then you can use the `mokuai-coffee` command, as follow:

```bash
$ mokuai-coffee --help

  Usage: mokuai-coffee <[modulename:]file ...> [options]

  Wrap your CoffeeScript modules with mokuai.
  If the --output (-o) option is not used, the result is printed into the console.
  Modules are automatically named after files basenames (path/to/file.coffee => file).
  Files can also be prefixed by a custom module name and a colon (custom:path/to/file.js => custom).

  Options:

    -h, --help                 output usage information
    -V, --version              output the version number
    -p, --prepend <value>      (repeatable) add the <value> file to prepended files (files that are prepended to modules)
    -a, --append <value>       (repeatable) add the <value> file to appended files (files that are appended to modules)
    -e, --exports [value]      define the exports mokuai-coffee option ([value] is optional and can be either false, true or any module name)
    -n, --exportsname <value>  set the exportsname mokuai-coffee option to <value>
    -A, --autoexports          set the autoexports mokuai-coffee option to true
    -P, --partial              set the partial mokuai-coffee option to true (do not wrap to mokuai closure, i.e. do it manually with original mokuai)
    -o, --output <output>      set the output file (if not set, print the result in the console)

  Examples:

    $ mokuai-coffee path/to/module.coffee customname:path/to/another/module.coffee
    $ mokuai-coffee <files> --output gen/app.js
    $ mokuai-coffee <files> --partial --output gen/app.js
    $ mokuai-coffee <files> --exports --output gen/app.js
    $ mokuai-coffee <files> --exports --exportsname MyApp --output gen/app.js
    $ mokuai-coffee <files> --exports AppModule --exportsname MyApp --output gen/app.js
    $ mokuai-coffee <files> --exports MainModule --exportsname MyApp --output gen/app.js
    $ mokuai-coffee <files> --append prepare.coffee --append launch.coffee --autoexports --output gen/app.js
    $ mokuai-coffee <files> --prepend prepend.coffee --append append.coffee --exports --output gen/app.js
```

Modules are automatically named after files basenames, unless you prefix the filepath with a custom name followed by a
colon.

For example:

```bash
$ mokuai-coffee path/to/module.coffee customname:path/to/another/module.coffee --output closure.js
```

will create 2 modules named `module` and `customname`.

**prepend** / **append** options are repeatable:

```bash
$ mokuai-coffee <files> --prepend prepend1.coffee --prepend prepend2.coffee --append append1.coffee --append append2.coffee
```

If you want to create a partial file, simply pass the **partial** option:

```bash
$ mokuai-coffee <files> --output closure.js --partial
```

### Node.js library

If you want to use the library in a Node.js project, install it locally via npm:

```bash
$ npm install mokuai-coffee
```

or save it as a dev dependency, adding the `--save-dev` option:

```bash
$ npm install mokuai-coffee --save-dev
```

Then, you can just require  `mokuai-coffee` in your code and use it as follow.

```js
var mokuaiCoffee = require('mokuai-coffee');
var closure = mokuai({
    moduleName1: 'moduleContent1',
    moduleName2: 'moduleContent2',
    // ...
    moduleNameN: 'moduleContentN'
}, {
    prepend: [
        'prependContent1',
        'prependContent2',
        // ...
        'prependContentN'
    ],
    append: [
        'appendContent1',
        'appendContent2',
        // ...
        'appendContentN'
    ],
    autoexports: false,
    exports: 'moduleName1',
    exportsname: 'MyCustomExportsName',
});
// DO whatever you want with 'closure'
```

If you want to compile the modules without wrappipng the result to a mokuai closure, add the partial options:

```js
var mokuaiCoffee = require('mokuai-coffee');
var partial = mokuai({
    moduleName1: 'moduleContent1',
    moduleName2: 'moduleContent2',
    // ...
    moduleNameN: 'moduleContentN'
}, {
    prepend: [
        'prependContent1',
        'prependContent2',
        // ...
        'prependContentN'
    ],
    append: [
        'appendContent1',
        'appendContent2',
        // ...
        'appendContentN'
    ],
    autoexports: false,
    exports: 'moduleName1',
    exportsname: 'MyCustomExportsName',
    partial: true
});
// Do whatever you want with 'partial'
```

If you want to compile from filepaths instead of modules contents:

```js
var mokuaiCoffee = require('mokuai-coffee');
var closure = mokuai.fromFiles({
    moduleName1: 'path/to/module1.coffee',
    moduleName2: 'path/to/module2.coffee',
    // ...
    moduleNameN: 'path/to/moduleContentN.coffee'
}, {
    prepend: [
        'path/to/prependContent1.coffee',
        'path/to/prependContent2.coffee',
        // ...
        'path/to/prependContentN.coffee'
    ],
    append: [
        'path/to/appendContent1.coffee',
        'path/to/appendContent2.coffee',
        // ...
        'path/to/appendContentN.coffee'
    ],
    autoexports: false,
    exports: 'moduleName1',
    exportsname: 'MyCustomExportsName'
});
// Do whatever you want with 'closure'
```

## License

[MIT](LICENSE-MIT)