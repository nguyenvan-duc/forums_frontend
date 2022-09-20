import Link from 'next/link'
import { useRouter } from 'next/router'
export function Posts() {
  const route = useRouter()
  return (
    <>
      <div
        onClick={() => route.push('/posts/ask/ask')}
        className='overflow-hidden border border-gray-300 shadow-lg rounded-lg w-full mb-3 cursor-pointer m-auto'>
        <div className='w-full block h-full'>
          {/* <img alt="blog photo" src="https://i.pinimg.com/564x/69/18/6a/69186a31ada4b1bf94edae291f54ec85.jpg" className="max-h-40 w-full object-cover" /> */}
          <div className='bg-white hover:bg-gray-50 hover:dark:bg-gray-600 dark:bg-gray-800 w-full p-4'>
            <Link href={'/posts/ask/ask'}>
              <a className='text-gray-800 dark:text-white text-xl font-medium mb-2'>
                This is title post
              </a>
            </Link>
            <div className='flex flex-wrap justify-starts items-center mt-4'>
              <div className='text-xs mr-2 py-1.5 px-4 text-gray-600 bg-blue-100 rounded-2xl'>
                #Car
              </div>
              <div className='text-xs mr-2 py-1.5 px-4 text-gray-600 bg-blue-100 rounded-2xl'>
                #Money
              </div>
            </div>
            <p className='text-gray-400 mt-2 dark:text-gray-300 font-light text-md'>
              The new supercar is here, 543 cv and 140 000$. This is best racing
              GT about 7 years on...
            </p>
            <div className='flex items-center mt-4'>
              <a href='#' className='block relative'>
                <img
                  alt='profil'
                  src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                  className='mx-auto object-cover rounded-full h-10 w-10 '
                />
              </a>
              <div className='flex flex-col justify-between ml-4 text-sm'>
                <p className='text-gray-800 dark:text-white'>Jean Jacques</p>
                <p className='text-gray-400 dark:text-gray-300'>
                  20 mars 2029 - 6 min read
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
