import axiosConfig from '@/api-client/axios-config'
export const appApi = {
  uploadImage(file: any) {
    return axiosConfig.post('/upload-image',{
      data:file
    })
  },
  bookmarkList(){
    return axiosConfig.get('/my-bookmarks')
  }
}
