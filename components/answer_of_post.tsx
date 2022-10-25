import React, { useState, useCallback, useEffect } from 'react'
import { commentApi } from '@/api-client/comment-api'
import { Comment } from '@/models/comment'
import _ from 'lodash'
import { Answer } from './answer'
import { AnswersForm } from './answers_form'
import axios from 'axios'
interface AOPProps {
  id: number
}
export function AnswerOfPost({ id }: AOPProps) {
  const [answers, setAnswers] = useState<any>([])
  const [value,setValue] = useState('')
  useEffect(() => {fetchData()},[])
  const fetchData = async () => {
    await commentApi.findCommentByPost(id).then((res:any) => {
      setAnswers(res)
      console.log(answers)
    })
  }
  const onChange = useCallback((value: any) => {
    setValue(value)
  }, [])
  const handleSend = async() =>{
    if(value == ''){
      return;
    }
    await commentApi.replyPost(id,value).then((res:any)=>{
     setAnswers([res,...answers])
    })
  }
  return (
     <>
     {_.map(answers,(item:Comment)=>(
         <Answer key={item?.id} id={item?.id} account={item?.account} content={item?.content} vote={item.vote} voteType={item?.voteType} voteCount={item?.voteCount} bookmark={item?.bookmark}/>
     ))}
     <AnswersForm onChange={onChange} handleSend={handleSend} value={value}/>
     </>
  )
}
