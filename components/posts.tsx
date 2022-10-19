import Link from 'next/link'
import { BookmarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
export function Posts() {
  const route = useRouter()
  return (
    <>
      <div className='overflow-hidden border border-gray-300 md:rounded-md w-full mb-4 cursor-pointer m-auto'>
        <div className='w-full block h-full'>
          {/* <img alt="blog photo" src="https://i.pinimg.com/564x/69/18/6a/69186a31ada4b1bf94edae291f54ec85.jpg" className="max-h-40 w-full object-cover" /> */}
          <div className='bg-white hover:bg-gray-50 hover:dark:bg-gray-600 dark:bg-gray-800 w-full p-4'>
            <Link href={'/posts/ask/ask'}>
              <a className='text-gray-800 dark:text-white text-xl font-medium mb-2 hover:text-indigo-600'>
                How can I do set operation checks in a MongoDB query (superset,
                subset, union)
              </a>
            </Link>
            <div className='flex flex-wrap mb-2  justify-starts items-center mt-4'>
              <div className='text-xs mr-2 py-1 px-1.5 text-gray-500 bg-blue-50 hover:bg-blue-100 rounded-md'>
                Car
              </div>
              <div className='text-xs mr-2 py-1 px-1.5 text-gray-500 bg-blue-50 hover:bg-blue-100 rounded-md'>
                Money
              </div>
            </div>
            <Link href={'/posts/ask/ask'}>
              <a className='text-gray-600 mt-2 dark:text-gray-300 font-light text-sm'>
                The new supercar is here, 543 cv and 140 000$. This is best
                racing GT about 7 years on...{' '}
              </a>
            </Link>
            <div className='flex justify-between items-end'>
              <div className='flex items-center mt-4'>
                <a href='#' className='block relative'>
                  <img
                    alt='profil'
                    src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    className='mx-auto object-cover rounded-full h-6 w-6 '
                  />
                </a>
                <div className='flex flex-col justify-between ml-4 text-xs'>
                  <p className='text-gray-800 dark:text-white'>Jean Jacques</p>
                  <p className='text-gray-400 dark:text-gray-300'>
                    20 mars 2029 - 6 min read
                  </p>
                </div>
              </div>
              <button className='p-3 hover:bg-indigo-100 rounded-full'>
                <BookmarkIcon className='h-4 w-4' />
              </button>
            </div>
            <div className='mt-2 p-2 bg-blue-50 rounded-md'>
              <p className='text-sm mb-1'>câu trả lời hữu ích nhất:</p>
              This question shows research effort; it is useful and clear 0 I
              have a requirement to calculate active users in a given a month
              and year by the user type. I have date range for each user with
              start date and end date. A user with an open ended date is an
              active user and has to be counted from the beginning of time till
              current date (year month).
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
