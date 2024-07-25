'use client'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import LoadingBar from 'react-top-loading-bar'
interface props{
    id:string,
    name:string,
    username:string,
    image:string,
    personType:string
}
const UserCard = ({
    id,
    name,
    username,
    image,
    personType
}: props) => {
    const router = useRouter();
     // for topbar loading
     const ref = useRef(null)
  return (
    <article className="user-card">
              <LoadingBar color='#877EFF' ref={ref} height={4} style={{ borderRadius: '10px' }} />

        <div className="user-card_avatar">
            <Image src={image} alt='profile' width={48} height={48} className="rounded-full" />
            <div className="flex-1 text-ellipsis">
                <h4 className="text-base-semibold text-light-1">{name}</h4>
                <p className="text-small-medium text-gray-1">{username}</p>
            </div>
        </div>

        <Button className="user-card_btn" onClick={()=>{
             ref?.current?.staticStart()
             router.push(`/profile/${id}`)
             ref?.current?.complete();
        }}>
            view
        </Button>
    </article>
  )
}

export default UserCard