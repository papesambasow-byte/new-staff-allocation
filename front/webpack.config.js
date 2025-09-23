// webpack.config.js
module.exports = {
  // ... other configuration options
  resolve: {
    fallback: {
      "path": false,
      "stream": false,
      "util": false,
      "url": false,
    },
  },
};
