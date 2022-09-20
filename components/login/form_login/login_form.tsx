import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Countdown from 'react-countdown'
import { useRouter } from 'next/router'

import { useAuth } from '@/hooks'
type LoginFormProps = {
  email: string
  otpStatus: any
  loginStatus: any
}
type dataPropsSend = {
  password: string
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
export function LoginForm({ email, otpStatus, loginStatus }: LoginFormProps) {
  const { login } = useAuth()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<dataPropsSend>()
  const [loading, setLoading] = useState(false)
  const [timeCountDown] = useState(Date.now() + 5 * 60 * 1000)
  const handleLogin: SubmitHandler<dataPropsSend> = async (data) => {
    const { password } = data
    setLoading(true)
    try {
      await login({ email, password })
      setLoading(false)
      loginStatus(true)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }
  const renderer = ({ minutes, seconds, completed }: any) => {
    if (completed) {
      otpStatus(false)
    } else {
      return (
        <span className='text-red-500'>
          {minutes}:{seconds}
        </span>
      )
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className='mt-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Nhập OTP
          </label>
          <input
            disabled={loading}
            className='bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none'
            type='password'
            {...register('password', {
              required: 'Vui long nhap day du thong tin',
            })}
          />
          <span className='text-red-600 text-xs'>
            {errors.password?.message}
          </span>
          <div className='text-left'>
            <span className='text-sm text-gray-600'>
              Mã otp sẽ hết hạn trong:{' '}
              <Countdown date={timeCountDown} renderer={renderer} />
            </span>
          </div>
        </div>
        <div className='mt-8'>
          <button
            type='submit'
            disabled={loading}
            className={classNames(
              'bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600',
              loading && 'bg-gray-500'
            )}>
            {loading ? (
              <div
                role='status'
                className='w-full flex justify-center items-center text-center'>
                <svg
                  className='mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='currentColor'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentFill'
                  />
                </svg>
              </div>
            ) : (
              <>Đăng nhập</>
            )}
          </button>
        </div>
      </form>
      <div className='text-center mt-3 transition ease-in-out delay-150'>
        <span>
          Mã OTP đã được gửi về email{' '}
          <span className='text-red-500'>{email}</span>, Vui lòng kiểm tra email{' '}
        </span>
      </div>
    </>
  )
}
