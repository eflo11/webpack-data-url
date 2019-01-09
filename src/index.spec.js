import DataFetch from './index';

test('should properly set options on creation of DataFetch class', () => {
  const options = {
    directory: 'some/dir',
    url: 'https://www.google.com',
  };

  const webpackPlugin = new DataFetch(options);
  expect(webpackPlugin.options).toBe(options);
});
