const { InjectManifest } = require('workbox-webpack-plugin');
module.exports = {
  mode: 'production',
  entry: './src/sw.js',
  plugins: [
    new InjectManifest({
      swSrc: './src/sw.js',
      swDest: 'sw.js',
      exclude: [/\.map$/, /manifest\.json$/],
      maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
    }),
  ],
};
