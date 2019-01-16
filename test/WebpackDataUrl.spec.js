import WebpackDataUrl from '../src/WebpackDataUrl';
import { expect } from 'chai';

describe('WebpackDataUrl', () => {
  it('should properly set options on creation of DataFetch class', () => {
    const options = {
      directory: 'some/dir',
      url: 'https://www.google.com',
    };

    const webpackPlugin = new WebpackDataUrl(options);
    expect(webpackPlugin.options).to.eq(options);
  });
});
