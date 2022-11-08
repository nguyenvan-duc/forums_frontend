import { accountApi } from '@/api-client/account-api'
import { useAuth } from '@/hooks'
import React from 'react'
import { useForm } from 'react-hook-form'

export function ChangeBaseInfo() {
  const { profile } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
     defaultValues:{
          imageUrl:profile?.avatar,
          name:profile?.name,
          email:profile?.email,
          username:profile?.username,
          bio:profile?.bio,
          skill:profile?.skill
     }
  })
  const onSubmit = async(data: any) => {
     console.log(data)
     await accountApi.profileUpdate(data).then((res:any)=>{
          console.log(res)
     })
  }
  
  return (
    <>
      <div className='p-6  bg-white w-full mb-4 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
        <h2 className='text-lg font-bold mb-3'>Thông tin cá nhân</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-6'>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
              Avatar
            </label>
            <div className='flex items-center'>
              <img
                className=' w-16 h-16 rounded-full mr-2'
                src={profile?.avatar}
              />
              <input
                type='file'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
     
              />
              <input
              {...register('imageUrl')}
              hidden
              />
            </div>
          </div>
          <div className='mb-6'>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
              Tên hiển thị
            </label>
            <input
              type='text'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              {...register('name')}
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
              Email
            </label>
            <input
              disabled
              type='email'
              {...register('email')}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
              Username
            </label>
            <input
              type='text'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              {...register('username')}
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
              Giới thiệu
            </label>
            <textarea
              rows={3}
              {...register('bio')}
              className='w-full rounded-md border p-3 bg-gray-50'></textarea>
          </div>
          <div className='mb-6'>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
              Kỹ năng/Ngôn ngữ
            </label>
            <textarea
              rows={3}
              {...register('skill')}
              placeholder='Ví dụ: Javascript, ReactJs, NextJs, Java.....'
              className='w-full rounded-md border p-3 bg-gray-50'></textarea>
          </div>
          <div className='flex justify-end'>
            <button type='submit' className='py-2 px-10 text-white bg-indigo-600 rounded-md hover:bg-indigo-500'>
              Lưu lại
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
