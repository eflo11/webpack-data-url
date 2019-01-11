<h1 align="center">webpack-data-url</h1>

<div align="center">
  This allows you to specify a url that contains data you would like to pull into your project and save to a specific directory before Webpack compiles and bundles your code.
</div>

## Getting Started
These instructions will get you up and running with pulling in your data to your project before you compile your Webpack build.

### **Prerequisites**
- Webpack 4

### **Installing**
1. Install to your dev-dependencies.
    ```javascript
    npm install --save-dev webpack-data-url
    ```

### **Usage**
1. webpack.config.js
    ```javascript
    import WebpackDataUrl from 'webpack-data-url';

    const config = {
      plugins: [
        new WebpackDataUrl(options),
      ],
    }
    ```

### **Options**
|Name|Type|Default|Description|
|--|:--:|:--:|:--:|
|**`url`**| `{String}`| ``|Url that you wish to request data from.|
|**`directory`**| `{String}`|`./data.json`|Directory and name of file you wish to store your data from.|

### **Built With**
- [request](https://github.com/request/request-promise) - Framework used for network requests.
- [fs](https://nodejs.org/api/fs.html) - Used for writing to the file system.
- [util](https://nodejs.org/api/util.html) - Used for promisify
