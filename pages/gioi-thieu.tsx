import { MainLayout } from '@/components/layouts'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import useSWR from 'swr'
import { NextPageWithLayout, PostModel, PostNewModel, TagModel } from '@/models'

type Props = {}
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]

const About: NextPageWithLayout = (props: Props) => {
  const [dataTags, setDataTags] = useState<any>([])
  const [tagsSelected, setTagsSelected] = useState<any>([])
  const { data: tags } = useSWR<Array<TagModel>>('/tags', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  })
  useEffect(()=>{
    convertTag()
  },[tags])
  const convertTag = async () =>{
    let data:any = []
    await tags?.forEach((item)=>{
      let dataMerge = {
        label:item?.name,
        value:item?.id,
        slug:item?.slug,
        isDisabled: false 
      }
      data = [...data,dataMerge]
    })
    setDataTags(data)
  }
  const onSelectedTags = (values:any) =>{
    let data:any = []
    values?.forEach((item:any)=>{
      let convert = {
        id:item?.value,
        slug:item?.slug
      }
      data = [...data,convert]
    })
    setTagsSelected(data)
  
  }
  const filerIfExits = (value:string) =>{
    if(tagsSelected.filter((e:any) => e.slug === value).length > 0){
      return true;
    }
    return false;
  }
  const submit =()=>{
    let isTrue = false
    if(filerIfExits('hoi-dap') && filerIfExits('thao-luan')){
      console.log('nhieu')
      return
    }
    if(filerIfExits('hoi-dap') || filerIfExits('thao-luan')){
      console.log('handle-logic')
      return
    }
    console.log('chon lai')
  }
  console.log(tagsSelected)
  return (
    <div className='w-full min-h-screen bg-white border border-gray-200 rounded-lg'>
      <Select options={dataTags}
       isMulti
       onChange={value=>onSelectedTags(value)}
       
       />
       <button onClick={()=>submit()}>submit</button>
    </div>
  )
}

About.Layout = MainLayout
About.sidebarRight = true
About.SidebarLeft = true
About.requestAuth = false
export default About
