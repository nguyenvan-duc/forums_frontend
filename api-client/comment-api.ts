import axiosConfig from '@/api-client/axios-config'

export const commentApi = {
  replyPost(id:number,content:string){
    return axiosConfig.post(`/post/${id}/comment`,{content:content})
  },
  bookmarkAnswer(id: number) {
    return axiosConfig.post(`/comment/${id}/bookmark`)
  },
  findCommentByPost(id:number){
    return axiosConfig.get(`/post/${id}/comments`)
  },
  voteComment(id:number,type:number){
    return axiosConfig.post(`/comment/${id}/vote`,{type:type})
  }
}
