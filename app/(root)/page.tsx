import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Home = async()=> {
 
  const result = await fetchPosts(1,30)
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
    <div>
       <h1 className="head-text">Home</h1>

       <div className="flex flex-col mt-9 gap-10 pb-6">
        { 
          result.posts.length === 0 ? <p className="no-result">No post to show span </p>: (
            result.posts.map((post)=>{
              console.log(post)
              return (
              
                <ThreadCard 
                  key={post._id}
                  id={post._id}
                  currentUserId={user?.id}
                  parentId={post.parentId}
                  content={post.text}
                  author={post.author}
                  community={post.community}
                  createdAt={post.createdAt}
                  comments={post.children}
                  likes={post.likes}
                  userId={userInfo?._id}
                />
              )
            })
          )
        }
       </div>
    </div>
  );
}
export default Home