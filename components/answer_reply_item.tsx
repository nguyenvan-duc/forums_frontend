import { Account } from "@/models"

interface AnswerReplyItemProps {
     id: number
     content: string
     account: Account
     voteType: string
     voteCount: number
     vote: boolean
     reply: Array<Comment>
     bookmark: boolean
     post_id: number
     createdAt: string
   }
export function AnswerReplyItem(){
     return(
          <></>
     )
}