// eslint-disable-next-line @typescript-eslint/no-var-requires
const withImages = require('next-images');

module.exports = withImages({
  images: {
    domains: ['images.prismic.io'],
  },
  webpack(config, options) {
    return config;
  },
});
