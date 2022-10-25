import { getCookie } from 'cookies-next';
import { PostNewModel, PostModel } from '@/models';
import axiosConfig from '@/api-client/axios-config'
import Cookies from 'js-cookie';
const POST_PATH_API = '/posts'

export const postApi = {
  async getAllPost() {
    return await axiosConfig.get<Array<PostModel>>(POST_PATH_API)
  },
  async createNewPost(data:PostNewModel){
     return await axiosConfig.post<PostModel>("/post/new",data)
  },
  async getDetails(slug:string){
    let token = Cookies.get('access_token')
    return await axiosConfig.get<PostModel>(`/post/details?slug=${slug}`).then(res=>{
      return res;
    })
  },
  async bookmarkPost(id:number){
    return axiosConfig.post(`/post/${id}/bookmark`)
  },
  async votePost(id:number,type:number){
    return axiosConfig.post(`/post/${id}/vote`,{type:type})
  }
}
