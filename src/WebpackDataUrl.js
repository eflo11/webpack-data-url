// eslint-disable-next-line import/no-extraneous-dependencies
import '@babel/polyfill';
import { get } from 'request';
import { promisify } from 'util';
import fs from 'fs';

const writeFilePs = promisify(fs.writeFile);
const getRequestPs = promisify(get);


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

  /**
   * This will go fetch the desired file and save to specified directory.
   */
  static async fetchFile() {
    try {
      const { body } = await getRequestPs(this.options.url);
      return await writeFilePs(this.options.directory, body);
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
