import { useState, useEffect } from 'react'
import {
  ChevronUpIcon,
  ChevronDownIcon,
  BellIcon,
} from '@heroicons/react/24/outline'
import { ShareButton } from './share_button'
import { postApi } from '@/api-client'
import { commentApi } from '@/api-client/comment-api'
type VoteProps = {
  id: number
  subjectVote: string
  upVote?: any
  downVote?: any
  voteCount: number
  userVote: string
  getNotify?: boolean
  loader?: boolean
}
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
export function VoteComponent({
  id,
  subjectVote,
  voteCount,
  userVote,
  getNotify,
  loader,
}: VoteProps) {
  const [vote, setVoteCount] = useState(voteCount)
  const [voteType, setVoteType] = useState(userVote)
  const [loadWhenVote, setLoadWhenVote] = useState(false)
  useEffect(() => {
    setVoteCount(voteCount)
    setVoteType(userVote)
  }, [userVote, voteCount])
  const handleUpVote = async (e: any) => {
    e.preventDefault()
    setLoadWhenVote(true)
    if (subjectVote === 'POST') {
      voteForPost(id, 1)
    } else if (subjectVote === 'COMMENT') {
      voteAnswers(id, 1)
    }
  }
  const handleDownVote = async (e: any) => {
    e.preventDefault()
    setLoadWhenVote(true)
    if (subjectVote === 'POST') {
      voteForPost(id, -1)
    } else if (subjectVote === 'COMMENT') {
      voteAnswers(id, -1)
    }
  }

  const voteForPost = async (id: number, type: number) => {
    await postApi.votePost(id, type).then((res: any) => {
      setVoteCount(res?.vote_count)
      setVoteType(res?.voteType)
      setLoadWhenVote(false)
    })
  }
  const voteAnswers = async (id: number, type: number) => {
    await commentApi.voteComment(id, type).then((res: any) => {
      console.log(res.voteType)
      setVoteCount(res?.vote_count)
      setVoteType(res?.voteType)
      setLoadWhenVote(false)
    })
  }
  const renderContent = () => {
    if (loader) {
      return (
        <>
          <ul className='w-full sticky top-0 z-10 block'>
            <li className='text-center flex flex-col justify-center items-center mb-4'>
              <div className='animate-pulse bg-gray-300 w-5 h-5 rounded-md' />
            </li>
            <li className='text-center  flex flex-col justify-center items-center mb-4'>
              <div className='animate-pulse bg-gray-300 w-4 h-4 rounded-full' />
            </li>
            <li className='text-center flex flex-col justify-center items-center mb-4'>
              <div className='animate-pulse bg-gray-300 w-5 h-5 rounded-md' />
            </li>
          </ul>
        </>
      )
    }
    return (
      <>
        <ul className='w-full sticky top-0 z-10 block'>
          <li className='text-center flex flex-col justify-center items-center mb-4'>
            <button
              disabled={loadWhenVote}
              onClick={handleUpVote}
              className={classNames(
                'hover:text-red-500 p-1 font-extrabold rounded-md hover:bg-gray-200 text-gray-400',
                voteType == 'UPVOTE' && 'text-red-500 bg-gray-200'
              )}>
              <ChevronUpIcon className='h-6 w-6' />
            </button>
          </li>
          <li className='text-center  flex flex-col justify-center items-center mb-4'>
            {vote}
          </li>
          <li className='text-center flex flex-col justify-center items-center mb-4'>
            <button
              disabled={loadWhenVote}
              onClick={handleDownVote}
              className={classNames(
                'hover:text-red-500 p-1 font-extrabold rounded-md hover:bg-gray-200 text-gray-400',
                voteType == 'DOWN_VOTE' && 'text-red-500 bg-gray-200'
              )}>
              <ChevronDownIcon className='h-6 w-6' />
            </button>
          </li>
        </ul>
      </>
    )
  }
  return <>{renderContent()}</>
}
