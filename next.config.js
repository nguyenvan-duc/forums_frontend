/** @type {import('next').NextConfig} */
const path = require('path')
const removeImports = require('next-remove-imports')({
  test: /node_modules([\s\S]*?)\.(tsx|ts|js|mjs|jsx)$/,
  matchImports: "\\.(less|css|scss|sass|styl)$"
})

module.exports = removeImports({
  webpack(config, options) {

    return config
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL: "https://api-gateway-forums.herokuapp.com",
    // API_URL: "http://localhost:8080",
    CLOUDINARY_API_SECRET:"cEgfkcCeMDbDnI_z2UAiUbDLsyo",
    CLOUDINARY_API_KEY:"998596363616345",
    CLOUDINARY_NAME:"dc9c9z2ri",
    CLOUDINARY_API_EV:"CLOUDINARY_URL=cloudinary://998596363616345:cEgfkcCeMDbDnI_z2UAiUbDLsyo@dc9c9z2ri"
  },
  images: {
    loader: 'imgix',
    path: '',
  }
})