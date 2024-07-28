
import { fetchUser, getActivity, getLikesActivity } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';


const page = async() => {

  let user;
  try {
    user = await currentUser();
  } catch (error) {
    console.log(error)
  }
  if(!user)
    redirect('/sign-in')
  const userInfo = await fetchUser(user.id)


  if(!userInfo?.onBoarded)
    redirect('/onboarding')

  const activity = await getActivity(userInfo?._id) ;
  const likedThreads = await getLikesActivity(userInfo?._id)
  return (
    <section>
      <h4 className="head-text">Activity</h4>
      <div className="flex flex-col gap-5 mt-10 mb-10">
      <div className="likes">
       {!likedThreads &&  <p className="text-light-1">Likes</p>}
       

       {likedThreads.map((likedThread)=>(
        
        <Link key={likedThread?._id} href={`/thread/${likedThread._id}`}>
           {likedThread.likes.map((liker:any)=>(
            <>
            {liker.id !== userInfo.id && (
               <article className='activity-card'>
               <div className="flex items-center justify-center rounded-full overflow-hidden  w-6 h-6">
               <Image
                 src={liker.image}
                 alt='user_logo'
                 width={28}
                 height={28}
                 className='object-cover'
               />
               </div>
               <p className='!text-small-regular text-light-1'>
                 <span className='mr-1 text-primary-500'>
                   {liker.name}
                 </span>{" "}
                liked your thread
               </p>
             </article>
            )}
            </>
           ))}
           </ Link>
          ))}

       
      
      </div>
      {activity.length > 0 ? (
         <>
         <p className="text-light-1">
           comments
         </p>
           {activity.map((activity) => (
             <Link key={activity._id} href={`/thread/${activity.parentId}`}>
               <article className='activity-card my-0'>
               <div className="flex items-center justify-center rounded-full overflow-hidden  w-6 h-6">
               <Image
                 src={activity.author.image}
                 alt='user_logo'
                 width={28}
                 height={28}
                 className='object-cover'
               />
               </div>
                 <p className='!text-small-regular text-light-1'>
                   <span className='mr-1 text-primary-500'>
                     {activity.author.name}
                   </span>{" "}
                   replied to your thread
                 </p>
               </article>
             </Link>
           ))}
         </>
       ) : (
         <p className='!text-base-regular text-light-3'>No Activity yet</p>
       )}
   </div>
   
    </section>
  )
}

export default page