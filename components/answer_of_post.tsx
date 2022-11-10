import React, { useState, useCallback, useEffect } from 'react'
import { commentApi } from '@/api-client/comment-api'
import { Comment } from '@/models/comment'
import _ from 'lodash'
import { Answer } from './answer'
import { AnswersForm } from './answers_form'
import axios from 'axios'
import { useRouter } from 'next/router'
interface AOPProps {
  id: number
}
export function AnswerOfPost({ id }: AOPProps) {
  const route = useRouter()
  const [answers, setAnswers] = useState<any>([])
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadWhenSend, setLoadWhenSend] = useState(false)
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const fetchData = async () => {
    setLoading(true)
    await commentApi.findCommentByPost(id).then((res: any) => {
      setAnswers(res)
      setLoading(false)
      route?.push(route?.asPath)
    })
  }
  const onChange = useCallback((value: any) => {
    setValue(value)
  }, [])
  const handleSend = async () => {
    if (value == '') {
      return
    }
    setLoadWhenSend(true)
    await commentApi.replyPost(id, value).then((res: any) => {
      setAnswers([...answers, res])
      setValue('')
      setLoadWhenSend(false)
    })
  }
  const renderComments = () => {
    if (loading) {
      return (
        <div>
          <div className='pl-8 mb-3'>
            <div className='flex items-center mb-3'>
              <div className='animate-pulse bg-gray-300 w-6 h-6 mr-2 rounded-full' />
              <div className='animate-pulse bg-gray-300 w-64 h-4 rounded-md' />
            </div>
            <div className='pl-8'>
              <div className='animate-pulse bg-gray-300 w-64 h-7 mb-2 rounded-md' />
              <div className='animate-pulse bg-gray-300 w-80 h-7 mb-2 rounded-md' />
              <div className='animate-pulse bg-gray-300 w-3/5 h-7 mb-2 rounded-md' />
            </div>
          </div>
          <div>
            <div className='animate-pulse bg-gray-300 w-full h-44 rounded-md' />
          </div>
        </div>
      )
    }
    return (
      <>
        <h2 className='text-lg font-semibold'>Có {answers?.length} câu Trả Lời: </h2>
        {_.map(answers, (item: Comment) => (
          <>
            {item?.children == false ? (
              <Answer
                key={item?.id}
                post_id={id}
                id={item?.id}
                reply={item.reply}
                account={item?.account}
                content={item?.content}
                vote={item.vote}
                voteType={item?.voteType}
                voteCount={item?.voteCount}
                bookmark={item?.bookmark}
                createdAt={item?.createdAt}
              />
            ) : (
              ''
            )}
          </>
        ))}
        <AnswersForm
          loading={loadWhenSend}
          onChange={onChange}
          handleSend={handleSend}
          value={value}
        />
      </>
    )
  }
  return <>{renderComments()}</>
}
