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
  if(userInfo !== null)
  {
    if(userInfo.onBoarded)
      redirect('/')
  }

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || '',
    bio: userInfo?.bio || '',
    image: userInfo?.image || user?.imageUrl

  }
  return (
    <main className='flex mx-auto flex-col max-w-3xl justify-start p-10 '>
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">complete your profile to use threads</p>


      <section className="bg-dark-2 mt-3 p-10">
        <AccountProfile user={userData} btnTitle='continue' />
      </section>
    </main>
  )
}

export default page