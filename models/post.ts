import { Account } from '@/models/account';
import { TagModel } from "./tag"

export interface PostNewModel {
     title: string
     tags: Array<TagModel>
     content:string
}
export interface PostModel{
     title: string
     slug:string
     tags: Array<TagModel>
     content:string,
     account:Account,
     commentCount:number,
     voteType:string,
     bookmark:boolean,
     vote:boolean,
     voteCount:number,
     createdAt:string
}