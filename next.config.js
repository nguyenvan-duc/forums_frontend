/** @type {import('next').NextConfig} */
const removeImports = require('next-remove-imports')({
  test: /node_modules([\s\S]*?)\.(tsx|ts|js|mjs|jsx)$/,
  matchImports: "\\.(less|css|scss|sass|styl)$"
})

module.exports = removeImports({
  webpack(config, options) {

      return config
  },
  reactStrictMode: true,
  swcMinify: true,
  env:{
    API_URL:"https://forums-aptech.herokuapp.com"
  },
  images: {
      loader: 'imgix',
      path: '',
  }
})