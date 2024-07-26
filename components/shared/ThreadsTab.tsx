import { fetchUserPosts } from "@/lib/actions/thread.actions"
import ThreadCard from "../cards/ThreadCard"
import { fetchCommunityPosts } from "@/lib/actions/community.actions"

const ThreadsTab = async({
    currentUserId,
    accountId,
    account_id,
    userName,
    userImage
}:{
    currentUserId:string,
    accountId:string
    account_id:string
    userName:string,
    userImage:string,
}) => {
    let result
     result = await fetchUserPosts(accountId)
    if(!result)
        return <p className="text-light-2 text-small-regular">no post</p>
    console.log(result)

  return (
    <div className="space-y-4 py-6">
        {result.threads.map((thread: any)=>{
            return (
                <ThreadCard 
                key={thread._id}
                id={thread._id}
                currentUserId={currentUserId}
                parentId={thread.parentId}
                content={thread.text}
                author={{
                    name: userName,
                    image:userImage,
                    id:accountId
                }}
                community={thread.community}
                createdAt={thread.createdAt}
                comments={thread.children}
                likes={thread.likes}
                userId={account_id}
              />
           )
        })}
    </div>
  )
}

export default ThreadsTab