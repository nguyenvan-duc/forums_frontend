import axiosConfig from '@/api-client/axios-config'
export const tagApi = {
    async getAll(){
          return axiosConfig.get('/tags')
     }
}