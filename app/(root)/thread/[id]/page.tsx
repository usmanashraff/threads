import ThreadCard from "@/components/cards/ThreadCard"
import Comment from "@/components/forms/Comment"
import { fetchThread } from "@/lib/actions/thread.actions"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const page = async({params}: {params: {id: string}}) => {
    const user = await currentUser()
    if(!user)
        return null
    const userInfo = await fetchUser(user.id)
    if(!userInfo.onBoarded)
        redirect('/onboarding')
    const thread = await fetchThread(params.id)
  return (
    <section className="relative head-text">
       <div>
       <ThreadCard 
                key={thread._id}
                id={thread._id}
                currentUserId={user?.id}
                parentId={thread.parentId}
                content={thread.text}
                author={thread.author}
                community={thread.community}
                createdAt={thread.createdAt}
                comments={thread.children}
                likes={thread.likes}
                userId={userInfo?._id}
                
              />
       </div>

       <div className="mt-7">
        <Comment
           threadId={thread._id}
           currentUserImg={userInfo?.image}
           currentUserId={userInfo?._id}
         />
       </div>


       <div className="mt-10 space-y-4 pb-4">
        <h3 className="text-heading3-bold">Comments</h3>
        {thread.children.map((child:any)=>(
            <ThreadCard 
            key={child._id}
            id={child._id}
            currentUserId={user?.id}
            parentId={child.parentId}
            content={child.text}
            author={child.author}
            community={child.community}
            createdAt={child.createdAt}
            comments={child.children}
            likes={child.likes}
            isComment={true}
            userId={userInfo?._id}
          />
        ))}
       </div>
    </section>
  )
}

export default page