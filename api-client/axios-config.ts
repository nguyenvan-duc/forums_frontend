import axios, { AxiosResponse } from 'axios'
const axiosConfig = axios.create({
  // baseURL: 'https://api-gateway-forums.herokuapp.com/api',
  baseURL:'https://it-forums.vercel.app/api',
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
