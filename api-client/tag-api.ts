import axiosConfig from '@/api-client/axios-config'
export const tagApi = {
    async getAll(){
          return axiosConfig.get('/tags')
     },
     followTag(id:number){
          return axiosConfig.post('/tag/follow',{tag:{id:id}})
     }
}