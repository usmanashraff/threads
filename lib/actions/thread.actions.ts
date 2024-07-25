'use server'

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.mode";
import User from "../models/user.model";
import { connectdb } from "./connectdb"

interface props{
    text: string,
    author: string,
    communityId: string | null,
    path:string,
}
export const createThread = async({
    text,
    author,
    communityId,
    path,
}: props) =>{

    connectdb();

    try {
        const createdThread = await Thread.create({
            text,
            author,
            community: null
        });

        // update user model as well
        await User.findByIdAndUpdate(author, {
            $push:{
                threads: createdThread?._id
            }
        })

        revalidatePath(path)
    } catch (error:any) {
        throw new Error(`there was an error in creating thread ${error.message}`)
    }
}



export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    connectdb()
  
    // Calculate the number of posts to skip based on the page number and page size.
    const skipAmount = (pageNumber - 1) * pageSize;
  
    // Create a query to fetch the posts that have no parent (top-level threads) (a thread that is not a comment/reply).
    const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({
        path: "author",
        model: User,
      })
      .populate({
        path: "children", // Populate the children field
        populate: {
          path: "author", // Populate the author field within children
          model: User,
          select: "_id name parentId image", // Select only _id and username fields of the author
        },
      })
      .populate({
        path:'likes',
        model:User,
      })
  
    // Count the total number of top-level posts (threads) i.e., threads that are not comments.
    const totalPostsCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    }); // Get the total count of posts
  
    const posts = await postsQuery.exec();
  
    const isNext = totalPostsCount > skipAmount + posts.length;
  
    return { posts, isNext };
  }
  


  export async function fetchThread(threadId: string) {
    connectdb();
  
    try {
      const thread = await Thread.findById(threadId)
        .populate({
          path: "author",
          model: User,
          select: "_id id name image",
        })// Populate the community field with _id and name
        .populate({
          path: "children", // Populate the children field
          populate: [
            {
              path: "author", // Populate the author field within children
              model: User,
              select: "_id id name parentId image", // Select only _id and username fields of the author
            },
            {
              path: "children", // Populate the children field within children
              model: Thread, // The model of the nested children (assuming it's the same "Thread" model)
              populate: {
                path: "author", // Populate the author field within nested children
                model: User,
                select: "_id id name parentId image", // Select only _id and username fields of the author
              },
            },
          ],
        })
        .exec();
  
      return thread;
    } catch (err) {
      console.error("Error while fetching thread:", err);
      throw new Error("Unable to fetch thread");
    }
  }


export async function addCommentToThread({
  threadId,
  commentText,
  userId,
  path,
}:{threadId:string,
  commentText:string,
  userId:string,
  path:string}){


    connectdb()
    try {
      console.log('threadid',threadId)
       const orignalThread = await Thread.findById(threadId)

      if (!orignalThread) {
        throw new Error("Thread not found");
      }

      const newCommentThread = new Thread({
        text: commentText,
        author:userId,
        parentId:threadId
      })

      const savedNewCommentThread = await newCommentThread.save()
      console.log('saved comment', savedNewCommentThread)
     // update the orignal thread to have children thread

      orignalThread.children.push(savedNewCommentThread._id)
      await orignalThread.save()

     revalidatePath(path)

    } catch (error:any) {
      throw new Error(`error in adding comment error: ${error.message}`)
    }

}

export async function addLikeToThread(threadId:string, userId:string, pathname:string){

  connectdb()

  try {
    const orignalThread = await Thread.findById(threadId);
    if(!orignalThread)
      throw new Error(`thread not found`)

    orignalThread.likes.push(userId)

   await orignalThread.save()
   revalidatePath(pathname)
  } catch (error:any) {
    throw new Error(`error in adding like to thread ${error.message}`)
  }
}

export async function checkLike(threadId:string,userId:string){
  connectdb()

  try {
    const thread = await Thread.findById(threadId)
    if(!thread){
      throw new Error(`thread not found for checking is liked`)
    }

    const isliked = thread.likes.includes(userId)
    return isliked;
    
  } catch (error:any) {
    throw new Error(`error in checking like ${error.message}`)
  }
}

export const removeLike = async(threadId:string, userId:string, pathname:string) =>{
  connectdb()

 
  try {
    const thread = await Thread.findById(threadId)
    if(!thread){
      throw new Error(`thread not found for checking is liked`)
    }

    const res = thread.likes.indexOf(userId)
    console.log('hello world', res)

    if(res !== -1){
      thread.likes.splice(res, 1)

      await thread.save()
      revalidatePath(pathname)
    }
   
    
  } catch (error:any) {
    throw new Error(`error in disliking ${error.message}`)
  }
}

export const fetchUserPosts = async(userId:string)=>{

  connectdb()

  try {
    const threads = await User.findOne({id: userId}).
    populate({
      path: 'threads',
      model:Thread,
      populate:{
        path: 'children',
        model: Thread,
        populate:{
          path:'author',
          model:User,
          select: 'name image, id'
        }
      }
    }) 
    return threads;
  } catch (error :any) {
    throw new Error(`error in fetching user posts ${error.message}`)
  }
}

