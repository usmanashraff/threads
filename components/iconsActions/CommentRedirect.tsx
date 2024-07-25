'use client'
import { useRef } from 'react'
import LoadingBar from 'react-top-loading-bar'
import { AiOutlineComment } from "react-icons/ai";

import Image from "next/image"
import { useRouter } from 'next/navigation'

const CommentRedirect = ({redirectID}:{redirectID:string}) => {
       // for topbar loading
       const ref = useRef(null)
       const router = useRouter();
  return (
   <>
    <LoadingBar color='#877EFF' ref={ref} height={4} style={{ borderRadius: '10px' }} />

   <AiOutlineComment className='cursor-pointer object-contain h-5 w-5  text-gray-400' onClick={()=> {
    ref?.current?.staticStart()
    router.push(`/thread/${redirectID}`)
    ref?.current?.complete();
   }} />
   </>
  )
}

export default CommentRedirect