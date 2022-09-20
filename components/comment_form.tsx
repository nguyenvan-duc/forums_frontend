import React, { useState, useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import EasyMDE from 'easymde'
import { useAuth } from '@/hooks'
import { LoginModal } from '@/components/login'
import { ComponentRequestAuth } from './layouts/common'

const SimpleMdeReact = dynamic(
  () => import('react-simplemde-editor').then((mod) => mod.default),
  { ssr: false }
)
const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false,
})
export function CommentForm() {
  const { profile } = useAuth()
  const [value, setValue] = useState('')
  const [isLogin, setIsLogin] = useState(false)
  const onChange = useCallback((value: any) => {
    setValue(value)
  }, [])
  const customRendererOptions: EasyMDE.Options = useMemo(() => {
    return {
      maxHeight: '150px',
      spellChecker: false,
      toolbar: [
        'bold',
        'italic',
        '|',
        'heading',
        '|',
        'quote',
        'code',
        'horizontal-rule',
        '|',
        'unordered-list',
        'ordered-list',
        'table',
        '|',
        'link',
        'image',
        '|',
        'clean-block',
        '|',
        'guide',
      ],
      placeholder: 'Nhập Nội Dung...',
    }
  }, [])
  return (
    <>
      <ComponentRequestAuth>
        <h1 className='py-3'>Câu trả lời của bạn:</h1>
        {!profile?.name ? (
          <div className='w-full cursor-text p-2 h-24 border border-gray-300 rounded-lg bg-gray-50'>
            <span className='text-sm text-gray-500'>Nhập câu trả lời</span>
          </div>
        ) : (
          <>
            {value ? (
              <div className={'bg-gray-50 mb-3 p-2'}>
                <MarkdownPreview source={value} />
              </div>
            ) : (
              ''
            )}
            <SimpleMdeReact
              onClick={() => {
                !profile?.name ? setIsLogin(false) : setIsLogin(true)
              }}
              value={value}
              onChange={onChange}
              options={customRendererOptions}
            />
            <div className='flex justify-end mt-3'>
              <button
                onClick={() => console.log('hello')}
                className='px-4 rounded-md py-2 border-2 bg-indigo-600 hover:bg-indigo-400 text-gray-200'>
                Gửi câu trả Lời
              </button>
            </div>
          </>
        )}
      </ComponentRequestAuth>
    </>
  )
}
