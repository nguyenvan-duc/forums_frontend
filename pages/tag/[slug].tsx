import { tagApi } from '@/api-client'
import { Posts } from '@/components'
import { MainLayout } from '@/components/layouts'
import _ from 'lodash'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
type Props = {}
function classNames(...classNames: any) {
     return classNames.filter(Boolean).join(' ')
   }
const Tag = (props: Props) => {
  const router = useRouter()
  const [postsByTag, setPostsByTag] = useState<any>({})
  let slug: string = router?.query?.slug as string
  const { data: tagDetails, error,mutate } = useSWR<any>(
    `/filter/${slug}/posts-by-tag`,
    {
      dedupingInterval: 5 * 60 * 1000,
      revalidateOnFocus: false,
    }
  )
  const [follow, setFollow] = useState(tagDetails?.tag_details?.follow)
  const [loader, setLoader] = useState(false)
  const [followCount, setFollowCount] = useState(tagDetails?.tag_details?.tag_follow_count);
  useEffect(()=>{
     setFollow(tagDetails?.tag_details?.follow)
     setFollowCount(tagDetails?.tag_details?.tag_follow_count)
  },[])
  const handleFollow = async (id: number) => {
    setFollow(!follow)
    setLoader(true)
    if(follow){
      setFollowCount(followCount - 1)
    }else{
      setFollowCount(followCount + 1)
    }
    await tagApi.followTag(id).then((res: any) => {
      setLoader(false)
      setFollow(res?.follow)
      setFollowCount(res?.tag_follow_count)
      mutate();
    })
  }
  let loading = tagDetails === undefined && error === undefined
  return (
    <>
      <div className='min-h-[80vh]'>
        <div className='w-full mb-5 border-t-8 border-indigo-500 bg-white p-4 rounded-md flex items-center justify-between'>
          <div className='flex items-center'>
            {tagDetails?.tag_details?.icon ? (
              <img
                src={tagDetails?.tag_details?.icon}
                className='w-24 h-24 object-contain mr-3'
              />
            ):<h2 className='text-4xl font-semibold mr-3'>#</h2>}

            <div>
              <h2 className='text-2xl font-bold'>
                {tagDetails?.tag_details?.name}
              </h2>
              <p> {tagDetails?.tag_details?.desc}</p>
            </div>
          </div>
          <button
          onClick={() => handleFollow(tagDetails?.tag_details?.id)}
          disabled={loader}
          className={classNames(
            ' py-2 px-4 mt-2 rounded-md border font-medium text-white ',
            follow ? 'bg-indigo-400' : 'bg-indigo-600'
          )}>
          {follow ? 'Đã theo dõi' : 'Theo dõi'}
        </button>
        </div>
        <div>
          <h3 className=' font-semibold mb-2'>Danh sách bài viết</h3>
          {_.map(tagDetails?.posts, (item) => (
            <Posts
              key={item.id}
              id={item.id}
              title={item.title}
              slug={item.slug}
              tags={item.tags}
              content={item.content}
              voteCount={item.voteCount}
              commentCount={item.commentCount}
              isBookmark={item.bookmark}
              author={item.account}
              createdAt={item.createdAt}
            />
          ))}
        </div>
      </div>
    </>
  )
}
Tag.Layout = MainLayout
Tag.sidebarRight = true
Tag.SidebarLeft = true
Tag.requestAuth = false
export default Tag
