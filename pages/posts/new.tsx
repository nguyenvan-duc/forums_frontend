import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Multiselect from 'multiselect-react-dropdown'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Disclosure } from '@headlessui/react'
import { BlankLayout } from '@/components/layouts'
import { NextPageWithLayout } from '@/models'
import { Modal } from '@/components'

const SimpleMdeReact = dynamic(
  () => import('react-simplemde-editor').then((mod) => mod.default),
  { ssr: false }
)
const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false,
})
type Props = {}
const options = [
  { name: '#Javascript', id: 1 },
  { name: '#Option 2', id: 2 },
  { name: '#Option 3', id: 3 },
  { name: '#Option 4', id: 4 },
  { name: '#Option 5', id: 5 },
  { name: '#Option 6', id: 6 },
  { name: '#Option 7', id: 7 },
]
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const randomid = () => parseInt(String(Math.random() * 1e15), 10).toString(36)
const styleMultiSelect = {
  chips: {
    background: 'white',
    border: '1px solid #e3e3e3',
    color: 'black',
  },
  multiselectContainer: {
    color: 'black',
  },
  searchBox: {
    border: 'none',
  },
  inputField: {
    border: 'none',
    outline: 'none',
  },
  optionContainer: {
    // To change css for option container
    // border: '1px solid #e3e3e3',
    boxShadow: '#e3e3e3 0px 10px 15px -3px',
  },
  option: {
    // border: '1px solid #e3e3e3',
    borderRadius: '5px',
  },
}
const NewPost: NextPageWithLayout = (props: Props) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [preview, setPreview] = useState(false)
  const [value, setValue] = useState('')
  const Router = useRouter()
  const handelButtonModal = () => {
    return Router.push('/')
  }
  const onChange = useCallback((value: any) => {
    setValue(value)
  }, [])
  const customRendererOptions: EasyMDE.Options = useMemo(() => {
    return {
      spellChecker:false,
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
        'preview',
        'guide',
      ],
      placeholder: 'Nhập Nội Dung...',
    }
  }, [])
  return (
    <>
      <div className='bg-gray-primary h-full'>
        <Disclosure as='nav'>
          {({ open }) => (
            <>
              <div className='max-w-7xl mx-auto  sm:px-6 lg:px-8'>
                <div className='relative flex items-center justify-between h-16'>
                  <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                    <div className='flex-shrink-0 flex items-center'>
                      {/* <img
                                                className="block lg:hidden h-8 w-auto"
                                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                                alt="Workflow"
                                            /> */}
                      <img
                        className='hidden lg:block h-8 w-auto'
                        src='https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg'
                        alt='Workflow'
                      />
                    </div>
                  </div>
                  <div className='absolute inset-y-0 right-0 flex items-center px-5 md:px-0 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                    <button
                      onClick={() =>
                        preview ? setPreview(false) : setPreview(true)
                      }
                      type='button'
                      className='text-gray-500 mr-4 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                      data-modal-toggle='defaultModal'>
                      {!preview ? 'Xem Trước Bài Đăng' : 'Quay Lại'}
                    </button>
                    <button
                      onClick={() => setModalOpen(true)}
                      type='button'
                      className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                      data-modal-toggle='defaultModal'>
                      <svg
                        className='w-5 h-5'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          fillRule='evenodd'
                          d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                          clipRule='evenodd'></path>
                      </svg>
                    </button>
                    <Modal
                      title='Bạn Có Muốn Thoát Trang'
                      handelButtonModal={handelButtonModal}
                      buttonTitle='Có, Tôi Muốn Thoát'
                      isOpen={modalOpen}
                      setIsOpen={() => setModalOpen(false)}>
                      this is body
                    </Modal>
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>
        <div className='max-w-7xl m-auto flex justify-end md:pb-32 md:px-8'>
          {!preview ? (
            <div className=' md:w-3/4 w-full rounded-t-2xl md:rounded-2xl border-2 border-gray-300 bg-white h-full py-5 px-6'>
              <input
                className='w-full bg-transparent h-20 text-2xl md:text-4xl font-bold p outline-none'
                placeholder='Nhập Tiêu Đề Câu Hỏi...'
              />
              <div className='h-30 my-3 w-full'>
                <div className='Multiselect'>
                  <Multiselect
                    customCloseIcon={
                      <XMarkIcon className='h-4 w-4 cursor-pointer ml-2 hover:text-red-400  text-gray-800' />
                    }
                    loading={false}
                    selectionLimit={4}
                    style={styleMultiSelect}
                    closeIcon='close'
                    options={options}
                    placeholder='Chọn tối đa 4 thẻ...'
                    displayValue='name' // Property name to display in the dropdown options
                  />
                </div>
              </div>

              <SimpleMdeReact
                value={value}
                onChange={onChange}
                options={customRendererOptions}
              />
            </div>
          ) : (
            <div className=' md:w-3/4 w-full h-screen rounded-2xl border-2 border-gray-300 bg-white py-5 px-6'>
              <MarkdownPreview source={value} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
NewPost.Layout = BlankLayout
NewPost.requestAuth = true
export default NewPost
