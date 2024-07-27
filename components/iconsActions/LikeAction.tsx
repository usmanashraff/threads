'use client'
import { addLikeToThread, checkLike, removeLike } from '@/lib/actions/thread.actions'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io'

const LikeAction = ({threadId, userId}: {threadId:string, userId:string}) => {
    const pathname = usePathname()
    const [isLiked, setisLiked] = useState<boolean>()
    
       
        useEffect(()=>{
            const checkForLike = async()=>{
                const isLike = await checkLike(threadId, userId)
                setisLiked(isLike)
            }
            checkForLike()
        },[])
       
    console.log('this post is', isLiked)
    console.log(userId == '66a47d023d165482f191eb99')
    
  return (
    isLiked ?
     <button onClick={async()=>{
        setisLiked(false)
        await removeLike(threadId, userId, pathname)
    }}>
        <IoMdHeart className='text-gray-400 h-5 w-5 cursor-pointer' /> 
    </button>: 

    <button onClick={async()=>{
        setisLiked(true)
        await addLikeToThread(threadId, userId, pathname)
    }}>
        <IoMdHeartEmpty className='text-gray-400 h-5 w-5 cursor-pointer'  />
    </button>
  )
}

export default LikeAction