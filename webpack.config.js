const isDev = true;

module.exports = (mode) => ({
  mode: isDev ? 'development' : 'production',
  devtool: mode === 'production' ? 'none' : 'source-map',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules\/(?!(swiper|dom7)\/).*/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  },
  output: {
    filename: `main.bundle.js`
  }
});
