import AccountProfile from '@/components/forms/AccountProfile'
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';

const page = async() => {
   let user;
  try {
    user = await currentUser()
  } catch (error) {
    console.log(error)
  }
  if(user === null)
    redirect('/sign-in')
  
  if(!user)
    return null
 

  const userInfo = await fetchUser(user.id)
  if(userInfo)
  {
    if(!userInfo.onBoarded)
        redirect('/onboarding')
  }

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user?.username,
    name: userInfo ? userInfo?.name : user?.firstName,
    bio: userInfo ? userInfo?.bio : '',
    image: userInfo ? userInfo?.image : user?.imageUrl

  }
  return (
    <main className='flex mx-auto flex-col max-w-3xl justify-start '>
      <h1 className="head-text">Edit Profile</h1>
      <p className="text-base-regular text-light-2">Fill new or save previous information</p>


      <section className="bg-dark-2 mt-3 my-4">
        <AccountProfile user={userData} btnTitle='save' redirectUrl='/profile' />
      </section>
    </main>
  )
}

export default page