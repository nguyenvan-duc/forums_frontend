import { PostNewModel, PostModel } from '@/models';
import axiosConfig from '@/api-client/axios-config'
const POST_PATH_API = '/posts'
export const postApi = {
  async getAllPost() {
    return await axiosConfig.get<Array<PostModel>>(POST_PATH_API)
  },
  async createNewPost(data:PostNewModel){
     return await axiosConfig.post<PostModel>("/post/new",data)
  },
  async getDetails(slug:string){
    return await axiosConfig.get<PostModel>(`/post/details?slug=${slug}`)
  }
}
