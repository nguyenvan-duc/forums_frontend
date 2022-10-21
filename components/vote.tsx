import { useState } from 'react'
import {
  ChevronUpIcon,
  ChevronDownIcon,
  BellIcon,
} from '@heroicons/react/24/outline'
import { ShareButton } from './share_button'
type VoteProps = {
  upVote?: any
  downVote?: any
  voteCount?: number
  userVote?: string
  getNotify?: boolean
}
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
export function VoteComponent({ voteCount, userVote, getNotify }: VoteProps) {
  const [number,setNumber] = useState(0)
  return (
    <>
      <ul className='w-full sticky top-0 z-10 block'>
        <li className='text-center flex flex-col justify-center items-center mb-4'>
          <button
            className={classNames(
              'hover:text-red-500 p-1 font-extrabold rounded-md hover:bg-gray-200 text-gray-400',
              userVote == "UPVOTE" && 'text-red-500 bg-gray-200'
            )}>
            <ChevronUpIcon className='h-6 w-6' />
          </button>
        </li>
        <li className='text-center  flex flex-col justify-center items-center mb-4'>
          {voteCount}
        </li>
        <li className='text-center flex flex-col justify-center items-center mb-4'>
          <button
          onClick={()=>setNumber(number+1)}
            className={classNames(
              'hover:text-red-500 p-1 font-extrabold rounded-md hover:bg-gray-200 text-gray-400',
              userVote == "DOWNVOTE" && 'text-red-500 bg-gray-200'
            )}>
            <ChevronDownIcon className='h-6 w-6' />
          </button>
        </li>
      </ul>
    </>
  )
}
