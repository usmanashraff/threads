import Image from 'next/image'
import Link from 'next/link'

import CommentRedirect from '../iconsActions/CommentRedirect'
import LikeAction from '../iconsActions/LikeAction';
import { formatDateString } from '@/lib/utils';
interface props{
    key: string,
    id:string,
    currentUserId?:string | undefined,
    parentId?:string | null,
    content:string,
    author:{
        name:string,
        image:string,
        id:string
    },
    community:{
        name:string,
        image:string,
        id:string,
    } | null,
    createdAt:string,
    comments:{
        author:{
            image:string
        }
    }[],
    likes:[]
    isComment?: boolean,
    userId:string
}
const ThreadCard = ({
    key,
    id,
    currentUserId,
    parentId,
    content,
    author,
    community,
    createdAt,
    comments,
  likes,
    isComment,
    userId,
    
}: props) => {  
    //console.log('likes bro',likes )
   

  return (
    <article
    className={`flex w-full flex-col rounded-xl ${
      isComment ? "px-0 md:px-7" : "bg-dark-2"
    } md:p-7 p-4 `}
  >
    <div className='flex items-start justify-between'>
      <div className='flex w-full flex-1 flex-row gap-4'>
        <div className='flex flex-col items-center'>
        <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
             <div className=" h-20 w-20 flex justify-center items-center overflow-hidden rounded-full">
             <Image
                src={author.image}
                alt='user_community_image'
                fill
                className='cursor-pointer rounded-full object-cover'
              />
             </div>
            </Link>

            <div className='thread-card_bar' />
          </div>

          <div className='flex w-full flex-col'>
            <Link href={`/profile/${author.id}`} className='w-fit'>
              <h4 className='cursor-pointer text-base-semibold text-light-1'>
                {author.name}
              </h4>
            </Link>

          <p className='mt-2 text-small-regular text-light-2'>{content}</p>

                <div className="flex flex-col gap-3 mt-5">
                    <div className="flex gap-3.5 items-center">
                       
                        
                      <LikeAction threadId={id} userId={userId} />
                       <CommentRedirect redirectID={id} />

                       

                        <Image src='/assets/repost.svg' alt='repost' width={24} height={24} className='cursor-pointer object-contain' />

                        <Image src='/assets/share.svg' alt='share' width={24} height={24} className='cursor-pointer object-contain' />


                    </div>
                    <div className="flex items-center gap-3">
                    {likes.length > 0 && (
                        <p className='text-subtle-medium mt-1 text-gray-1'>{likes.length} {likes.length > 1 ? 'likes' : 'like'} </p>
                    )}
                    {comments.length > 0 && (
                        <p className='text-subtle-medium mt-1 text-gray-1'>{comments.length}{comments.length == 1 ? ' reply': ' replies'} </p>
                    )}
                    </div>
                   

                
                </div>

            </div>

           

        </div>

     
    </div>

    {!isComment && community && (
              <Link href={`/communities/${community.id}`} className='mt-5 flex items-center'>
                <p className="text-subtle-medium text-gray-1">{formatDateString(createdAt)} - {community.name}</p>
                <Image src={community.image} alt='community img' width={14} height={14} className='ml-1 rounded-full object-contain' />
              </Link>
            )}




   </article>
)
}

export default ThreadCard