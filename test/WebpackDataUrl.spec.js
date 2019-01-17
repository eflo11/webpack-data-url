/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import fs from 'fs';
import WebpackDataUrl from '../src/WebpackDataUrl';

describe('WebpackDataUrl', () => {
  const testData = {
    data: 'test',
  };

  afterEach(() => {
    sinon.restore();
  });

  it('should properly set options to an array if passed an object', () => {
    const options = [{
      directory: 'some/dir',
      url: 'https://www.google.com',
    }];

    const webpackPlugin = new WebpackDataUrl(options[0]);
    expect(Array.isArray(webpackPlugin.options)).to.be.true;
    expect(webpackPlugin.options[0]).to.eq(options[0]);
  });

  it('should properly make request to get data', (done) => {
    sinon.stub(axios, 'get').resolves(testData);
    sinon.stub(fs, 'writeFile').yields();

    const options = {
      directory: './test.json',
      url: 'https://www.google.com',
    };

    const webpackPlugin = new WebpackDataUrl(options);
    webpackPlugin.fetchFile()
      .then(() => {
        expect(axios.get.getCall(0).args[0]).to.eq(options.url);
        expect(axios.get.calledOnce).to.be.true;
        done();
      })
      .catch(e => done(e));
  });

  it('should properly write file to location', (done) => {
    sinon.stub(axios, 'get').resolves(testData);
    sinon.stub(fs, 'writeFile').yields();

    const options = {
      directory: './test.json',
      url: 'https://www.google.com',
    };

    const webpackPlugin = new WebpackDataUrl(options);
    webpackPlugin.fetchFile()
      .then(() => {
        const fsWriteFileArgs = fs.writeFile.getCall(0).args;
        expect(fsWriteFileArgs[0]).to.eq(options.directory);
        expect(fsWriteFileArgs[1]).to.eq(JSON.stringify(testData));
        expect(fs.writeFile.calledOnce).to.be.true;
        done();
      })
      .catch(e => done(e));
  });
});
