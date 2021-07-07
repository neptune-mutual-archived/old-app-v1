const withSvgr = require('next-plugin-svgr')

module.exports = withSvgr({
  webpack(config, options) {
    return config
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  future: {
    webpack5: true,
    strictPostcssConfiguration: false
  }
})
