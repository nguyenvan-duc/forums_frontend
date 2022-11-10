import { getCookie } from 'cookies-next';
import { PostNewModel, PostModel } from '@/models';
import axiosConfig from '@/api-client/axios-config'
import Cookies from 'js-cookie';
const POST_PATH_API = '/posts'

export const postApi = {
  async getAllPostForStaticProps(){
    return await axiosConfig.get<Array<PostModel>>('/posts/list')
  },
  async getAllPost(sort:string) {
    return await axiosConfig.get<Array<PostModel>>(`/posts?sort=${sort}`)
  },
  async createNewPost(data:PostNewModel){
     return await axiosConfig.post<PostModel>("/post/new",data)
  },
  async getDetails(slug:string){
    let token = Cookies.get('access_token')
    return await axiosConfig.get<PostModel>(`/post/${slug}/details`).then(res=>{
      return res;
    })
  },
  async bookmarkPost(id:number){
    return axiosConfig.post(`/post/${id}/bookmark`)
  },
  async votePost(id:number,type:number){
    return axiosConfig.post(`/post/${id}/vote`,{type:type})
  },
  async myPosts(){
    return axiosConfig.get('/my/posts')
  },
  async userPosts(username:string){
    return axiosConfig.get(`/user/${username}/posts`)
  }
}
