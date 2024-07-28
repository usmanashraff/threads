import { fetchUsers } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import UserCard from "./UserCard"
import { fetchCommunities } from "@/lib/actions/community.actions"
import CommunityCard from "../cards/CommunityCard"
import SuggestedCommunityCard from "../cards/SuggestedCommunityCard"

const RightSideBar = async() => {

 let user;  
  try {
   user = await currentUser()
   if(!user)
    redirect('/sign-in')
  } catch (error) {
    console.log(error)
  }
  const result = await fetchUsers({
    userId: user?.id || '',
    searchString: '',
    pageNumber:1,
    pageSize:25,
  })
  const suggestedUsers = result.users.slice(0, 3)

  const communities = await fetchCommunities({
    searchString: '',
    pageNumber:1,
    pageSize:25,
  })

  const suggestedCommunities = communities.communities.slice(0,2)
  return (
    <section className='custom-scrollbar rightsidebar'>
      <div className="flex flex-1 justify-start flex-col space-y-4">
        <h3 className='text-heading4-medium text-light-1'>Suggested Communities</h3>

        {suggestedCommunities.map((community)=>{
          return <SuggestedCommunityCard 
          key={community.id}
          id={community.id}
          username={community.username}
          name={community.name}
          imgUrl={community.image}
          bio={community.bio}
          members={community.members}
/> 
  
        })}
      </div>


      <div className="flex flex-1 justify-start flex-col  space-y-4">
        <h3 className='text-heading4-medium text-light-1'>
          suggested users
        </h3>
        {suggestedUsers.map((s_user)=>(
         <UserCard 
         key={s_user.id}
         id={s_user.id}
         username={s_user.username}
         name={s_user.name}
         image={s_user.image}
         personType='user'
      />
        ))}
      </div>
    </section>
  )
}

export default RightSideBar