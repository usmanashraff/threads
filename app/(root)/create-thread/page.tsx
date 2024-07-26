import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

const page = async() => {
  let user = undefined
  try {
   user  = await currentUser()
   if(!user)
    redirect('/sign-in')
  } catch (error) {
    console.log(error)
  }
  const userInfo = await fetchUser(user?.id || "" )
  if(!userInfo?.onBoarded)
    return redirect('/onboarding')

  
  return (
    <>
    <h1 className='head-text'>Create Thread</h1>
    <PostThread userId={userInfo._id} /> 
    </>
  )
}

export default page