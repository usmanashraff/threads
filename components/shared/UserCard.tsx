'use client'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import LoadingBar from 'react-top-loading-bar'
import Link from 'next/link'
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
  return( 
        <article className={`user-card ${personType === 'admin' && 'bg-dark-2 p-3 rounded-lg'}`}>
    
    <div className="user-card_avatar">
      <Image src={image} alt='profile' width={48} height={48} className="rounded-full" />
      <div className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold text-light-1">{name}</h4>
          <p className="text-small-medium text-gray-1">{username}</p>
      </div>
    </div>
    
   <Link href={`/profile/${id}`}>
   <Button className="user-card_btn" >
      view
    </Button></Link>
    </article>
    )
  
   
   
   
  
}

export default UserCard