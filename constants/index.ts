
// export const OAUTH2_REDIRECT_URI = 'https://forums-demo.vercel.app/api/oauth2/redirect'
export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/api/oauth2/redirect'

export const GOOGLE_AUTH_URL = process.env.API_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = process.env.API_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = process.env.API_URL + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;