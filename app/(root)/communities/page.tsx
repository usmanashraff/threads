import CommunityCard from '@/components/cards/CommunityCard'
import { fetchCommunities } from '@/lib/actions/community.actions'
import { fetchUser } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const page = async() => {
  let user;
  try {
   user  = await currentUser()
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
      <h1 className="head-text">Communities</h1>

      <div className="mt-10 flex flex-col gap-9">
        {communities.communities.length === 0 ? (
          <p className="no-result">no communities to show</p>
        ): (
          <>
          {communities.communities.map((community)=> {
            console.log('hehe', community.image)
            return(
              <CommunityCard 
                 key={community.id}
                 id={community.id}
                 username={community.username}
                 name={community.name}
                 imgUrl={community.image}
                 bio={community.bio}
                 members={community.members}
              />
            )
          })}
          </>
        )}
      </div>
    </section>
  )
}

export default page