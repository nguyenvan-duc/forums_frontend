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
  userVote?: number
  getNotify?: boolean
}
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
export function VoteComponent({ voteCount, userVote, getNotify }: VoteProps) {
  return (
    <>
      <ul className='w-full sticky top-0 z-10 block'>
        <li className='text-center flex flex-col justify-center items-center mb-4'>
          <button
            className={classNames(
              'hover:text-red-500 p-1 font-extrabold rounded-md hover:bg-gray-100 text-gray-400',
              userVote == 1 && 'text-red-500 bg-gray-100'
            )}>
            <ChevronUpIcon className='h-6 w-6' />
          </button>
        </li>
        <li className='text-center  flex flex-col justify-center items-center mb-4'>
          {voteCount || 0}
        </li>
        <li className='text-center flex flex-col justify-center items-center mb-4'>
          <button
            className={classNames(
              'hover:text-red-500 p-1 font-extrabold rounded-md hover:bg-gray-100 text-gray-400',
              userVote == -1 && 'text-red-500 bg-gray-100'
            )}>
            <ChevronDownIcon className='h-6 w-6' />
          </button>
        </li>
      </ul>
    </>
  )
}
