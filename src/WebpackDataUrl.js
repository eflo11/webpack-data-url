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
    this.options = options;
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
      const data = await axios.get(this.options.url || '');
      return await this.writeFilePromise(this.options.directory || './data.json', JSON.stringify(data));
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
