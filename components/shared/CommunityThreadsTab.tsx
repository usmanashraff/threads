import { fetchUserPosts } from "@/lib/actions/thread.actions"
import ThreadCard from "../cards/ThreadCard"
import { fetchCommunityPosts } from "@/lib/actions/community.actions"

const CommunityThreadsTab = async({
    communityId,
    userId,
    community
}:{
  communityId:string
  ,userId:string,
  community: {
    name:string,
    image:string
    id:string
  }
}) => {
   const communityPosts = await fetchCommunityPosts(communityId)
   

  return (
    <div className="space-y-4 py-6">
        {communityPosts.threads.map((thread: any)=>{
            return (
                <ThreadCard 
                key={thread._id}
                id={thread._id}
                //currentUserId={currentUserId}
                //parentId={thread.parentId}
                content={thread.text}
                author={{
                    name: thread.author.name,
                    image:thread.author.image,
                    id:thread.id
                }}
                community={community}
                createdAt={thread.createdAt}
                comments={thread.children}
                likes={thread.likes}
                userId={userId}
              />
           )
        })}
    </div>
  )
}

export default CommunityThreadsTab