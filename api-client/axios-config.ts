import axios, { AxiosResponse } from 'axios'
const axiosConfig = axios.create({
  // baseURL: 'http://localhost:3000/api',
  baseURL:'https://newbiedev-pqvws.appengine.bfcplatform.vn/api',
  headers: {
    'content-type': 'application/json',
  },
})
axiosConfig.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config
})
axiosConfig.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response && response.data) {
      return response.data
    }
    return response
  },
  (error) => {
    // Handle errors
    throw error
  }
)
export default axiosConfig
