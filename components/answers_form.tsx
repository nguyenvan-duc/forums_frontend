import React, { useState} from 'react'
import dynamic from 'next/dynamic'
import { useAuth } from '@/hooks'
import { ComponentRequestAuth } from './layouts/common'
import { EditorMarkdown } from './editor_markdown'
const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false,
})
interface AnswerFormProp{
  onChange:any,
  handleSend:any,
  value:string
}
export function AnswersForm({onChange,handleSend,value}:AnswerFormProp) {
  const { profile, fistLoading } = useAuth()
  // const onChange = useCallback((value: any) => {
  //   setValue(value)
  // }, [])
  return (
    <>
      {fistLoading ? (
        <>
          <div className='bg-gray-200 animate-pulse rounded-lg w-full h-24' />
        </>
      ) : (
        <ComponentRequestAuth>
          <h1 className='py-3'>Câu trả lời của bạn:</h1>
          {!profile?.name ? (
            <div className='w-full cursor-text p-2 h-24 border border-gray-300 rounded-lg bg-gray-50'>
              <span className='text-sm text-gray-500'>Nhập câu trả lời</span>
            </div>
          ) : (
            <>
              {value ? (
                <div className={' mb-3 p-2'}>
                  <MarkdownPreview source={value} />
                </div>
              ) : (
                ''
              )}
              <div className='comment-form border rounded-lg'>
                <EditorMarkdown
                  value={value}
                  onChange={onChange}
                  Option={{
                    maxHeight: '150px',
                  }}
                />
              </div>

              <div className='flex justify-end mt-3'>
                <button
                  onClick={() => handleSend()}
                  className='px-4 rounded-md py-2 border-2 bg-indigo-600 hover:bg-indigo-400 text-gray-200'>
                  Gửi câu trả Lời
                </button>
              </div>
            </>
          )}
        </ComponentRequestAuth>
      )}
    </>
  )
}
