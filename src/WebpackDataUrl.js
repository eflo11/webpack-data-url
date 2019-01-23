import axios from 'axios';
import fs from 'fs';

class WebpackDataUrl {
  /**
   * This is used to specify configuration used for fetching and writing the file.
   * @param {object} options
   * @param {string} options.directory - Specified directory that you want to write the file to.
   * @param {string} options.url - Url that you are fetching data from.
   */
  constructor(options) {
    // Check to keep compatibility from 1.0.0 to 1.0.1
    if (Array.isArray(options)) {
      this.options = options;
    } else {
      this.options = [];
      this.options.push(options);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  writeFilePromise(directory, data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(directory, data, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  /**
   * This will go fetch the desired file and save to specified directory.
   */
  async fetchFile() {
    try {
      const requests = [];
      for (let i = 0; i < this.options.length; i += 1) {
        requests.push(axios.get(this.options[i].url || ''));
      }
      const data = await axios.all(requests);
      const files = [];
      for (let i = 0; i < this.options.length; i += 1) {
        files.push(this.writeFilePromise(this.options[i].directory || './data.json', JSON.stringify(data[i].data)));
      }
      return await Promise.all(files);
    } catch (e) {
      return new Error(`There was an issue fetching your file: ${e}`);
    }
  }

  /**
   * This executes when the compile hook from Webpack
   * is called right before it starts comipling the project.
   * @param {object} compiler - Webpack compiler.
   */
  apply(compiler) {
    let initializedHook = false;

    compiler.hooks.beforeCompile.tapAsync('WebpackDataUrl', async (compilingParams, cb) => {
      if (initializedHook) return cb();

      initializedHook = true;
      await this.fetchFile();
      return cb();
    });
  }
}

export default WebpackDataUrl;
