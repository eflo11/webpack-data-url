<h1 align="center">webpack-data-url</h1>

<div align="center">
  Pull in a remote dependencies that contain data you need before each build.
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
        new WebpackDataUrl([options]),
      ],
    }
    ```

### **Options**
|Name|Type|Default|Description|
|--|:--:|:--:|:--:|
|**`url`**| `{String}`| ``|Url that you wish to request data from.|
|**`directory`**| `{String}`|`./data.json`|Directory and name of file you wish to store your data from.|

### **Built With**
- [axios](https://github.com/axios/axios) - Framework used for network requests.
- [fs](https://nodejs.org/api/fs.html) - Used for writing to the file system.