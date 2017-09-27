# metalsmith-components

A [Metalsmith](http://metalsmith.io) plugin that copies bower or node installed component files matching a pattern.

## Installation

```bash
$ npm install metalsmith-components
```

## Usage

If using the CLI for Metalsmith, metalsmith-components can be used like any other plugin by including it in `metalsmith.json`. For example:

```json
{
    "plugins": {
        "metalsmith-components": {
            "componentDirectory": "bower_components",
            "components": {
                "bootstrap": {
                    "dist/css/*.min.css": "assets/css/",
                    "dist/js/*.min.js": "assets/js/",
                    "dist/fonts/": "assets/fonts/"
                }
            }
        }
    }
}
```

For Metalscript's JavaScript API, metalsmith-components can be used like any other plugin, by attaching it to the function invocation chain on the Metalscript object. For example:

```js
var components = require('metalsmith-components');
require('metalsmith')(__dirname)
    .use(components({
        "componentDirectory": "bower_components",
        "components": {
            "bootstrap": {
                "dist/css/*.min.css": "assets/css/",
                "dist/js/*.min.js": "assets/js/",
                "dist/fonts/": "assets/fonts/"
            }
        }
    }))
    .build();
```

## Options

- `componentDirectory`: base component directory, defaults to `bower_components` (optional)
- `components`: list of installed components and patterns to process (required)

### components

#### structure

- `component` is the component name and is used with `componentDirectory` to determine the component base directory
- `pattern` uses [glob](https://www.npmjs.com/package/glob) to find files under the component directory
- `destination` is the location to copy the matching file[s] to

```json
{
    "components": {
        "[component]": {
            "[pattern]": "[destination]"
        }
    }
}
```

#### example

```js
{
    "components": {
        // component name, should match up with the folder name of the component
        "bootstrap": {
            // find all min.css files in the dist/css directory and copy them to the assets/css folder
            "dist/css/*.min.css": "assets/css/",
            // copy all files and folders in the dist/fonts directory to the assets/fonts folder
            // preserves structure
            "dist/fonts": "assets/fonts"
        },
        "jquery": {
            // find all js files and copy them to the assets/js folder
            "**/*.js": "assets/js"
        }
    }

}
```
