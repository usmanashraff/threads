import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

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

  
  return (
    <>
    <h1 className='head-text'>Create Thread</h1>
    <PostThread userId={userInfo._id} /> 
    </>
  )
}

export default page