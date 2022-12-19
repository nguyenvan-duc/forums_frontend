import React, { useEffect, useState, Fragment } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Multiselect from 'multiselect-react-dropdown'
import { useAuth } from '@/hooks'
import { SORT_POST_NEW, SORT_POST_HOT } from '@/constants'
import { TagModel } from '@/models'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
type Props = {
  sortViewPostsBy?: any,
  sortPostsByTags?: any,
  sortPopularByTime?:any
}
const people = [
  {
    name: 'Tuần',
    value: 'week',
  },
  { name: 'Tháng', value: 'month' },
  { name: 'Năm', value: 'year' },
  { name: 'Tất cả', value: 'all-time' },
]
function classNames(...classNames: any) {
  return classNames.filter(Boolean).join(' ')
}
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
export function Filter({ sortViewPostsBy, sortPostsByTags, sortPopularByTime }: Props) {
  const router = useRouter()
  const [sortType, setSortType] = useState('relevant')
  const { profile, fistLoading } = useAuth()
  const [tagsToParam, setTagsToParam] = useState<any>('')
  const [filterByTags, setFilterByTags] = useState(false)
  const [tagsSelected, setTagsSelected] = useState<Array<TagModel>>([])
  const [selected, setSelected] = useState(people[0])
  const { data: tags } = useSWR<Array<TagModel>>('/tags', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  })
  useEffect(() => {
    if (!profile?.name) {
      setSortType(SORT_POST_NEW)
    } else {
      setSortType(sortType)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.name, sortType])

  const onChangeTags = (tagsSelect: any) => {
    let params = covertToTagsParam(tagsSelect)
    setTagsToParam(params)
  }
  const onRemoveTags = (tagsSelect: any) => {
    let params = covertToTagsParam(tagsSelect)
    setTagsToParam(params)
  }

  const covertToTagsParam = (tagsSelect: any) => {
    let params = ''
    tagsSelect.forEach((element: any) => {
      params = params + element.slug + ','
    })
    return (params = params.substring(0, params.length - 1))
  }
  useEffect(() => {
    sortViewPostsBy(sortType)
  }, [sortType])

  useEffect(() => {
    sortPostsByTags(tagsToParam)
  }, [tagsToParam])

  useEffect(()=>{
    sortPopularByTime(selected)
  },[selected])
  return (
    <div>
      <div className=' flex justify-between items-center'>
        <div className='flex items-center  py-4'>
          {profile?.name && (
            <button
              onClick={() => setSortType('relevant')}
              className={classNames(
                'px-2 py-2 mr-2 hover:bg-gray-50 hover:dark:bg-slate-700  rounded-md',
                sortType == 'relevant' && 'font-medium bg-gray-200  dark:bg-slate-700'
              )}>
              Liên Quan
            </button>
          )}

          <button
            onClick={() => setSortType(SORT_POST_NEW)}
            className={classNames(
              'px-2 py-2 hover:bg-gray-50 hover:dark:bg-slate-700 rounded-md mr-2',
              sortType == SORT_POST_NEW && 'font-medium bg-gray-200 dark:bg-slate-700'
            )}>
            Mới nhất
          </button>
          <button
            onClick={() => setSortType(SORT_POST_HOT)}
            className={classNames(
              'px-2 py-2 hover:bg-gray-50 hover:dark:bg-slate-700 rounded-md',
              sortType == SORT_POST_HOT && 'font-medium bg-gray-200 dark:bg-slate-700'
            )}>
            Phổ biến
          </button>
        </div>

        {filterByTags ? (
          <button
            onClick={() => setFilterByTags(false)}
            className='px-3 py-3 hover:bg-gray-100 hover:dark:bg-slate-700 rounded-full'>
            <XMarkIcon className='h-5 w-5 text-gray-700 dark:text-gray-100' />
          </button>
        ) : (
          <button
            onClick={() => setFilterByTags(true)}
            className='px-3 py-3 hover:bg-gray-100 rounded-full hover:dark:bg-slate-700'>
            <FunnelIcon className='h-5 w-5 text-gray-700 dark:text-gray-100' />
          </button>
        )}
      </div>
      {filterByTags && (
        <div className='mb-2 md:flex md:justify-between items-center'>
          <div className='flex items-center'>
            <Listbox value={selected} onChange={setSelected}>
              <div className='relative mt-1 w-full md:w-[130px]'>
                <Listbox.Button className='relative w-full cursor-default rounded-lg bg-white  dark:bg-slate-700 py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
                  <span className='block truncate'>{selected.name}</span>
                  <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                    <ChevronUpDownIcon
                      className='h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'>
                  <Listbox.Options className='absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white  dark:bg-slate-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                    {people.map((person, personIdx) => (
                      <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? 'bg-amber-100 text-amber-900'
                              : 'text-gray-900'
                          }`
                        }
                        value={person}>
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}>
                              {person.name}
                            </span>
                            {selected ? (
                              <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                                <CheckIcon
                                  className='h-5 w-5'
                                  aria-hidden='true'
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          <div className='md:flex md:items-center mt-3 md:mt-0'>
            <div className='border px-2 rounded-lg w-full'>
              <Multiselect
                customCloseIcon={
                  <XMarkIcon className='h-4 w-4 cursor-pointer ml-2 hover:text-red-400  text-gray-800' />
                }
                selectedValues={tagsSelected}
                onSelect={(selectedList: any) => {
                  onChangeTags(selectedList)
                }}
                onRemove={(removeItem: any) => {
                  onRemoveTags(removeItem)
                }}
                loading={tags == undefined}
                selectionLimit={4}
                style={styleMultiSelect}
                closeIcon='close'
                options={tags}
                placeholder='Chọn tối đa 4 thẻ...'
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
            <button className=' px-14 md:px-4 py-1 border-2 border-indigo-500 rounded-lg md:ml-2 md:rounded-full mt-3 md:mt-0'>
              Lọc
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
