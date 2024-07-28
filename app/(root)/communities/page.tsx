import SearchForm from '@/components/forms/SearchForm'
import { fetchCommunities } from '@/lib/actions/community.actions'
import { fetchUser } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

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

  const communities = await fetchCommunities({
    searchString: '',
    pageNumber:1,
    pageSize:25,
  })
  return (
    <section>
      <SearchForm result={communities.communities} type='community' />
    </section>
  )
}

export default page