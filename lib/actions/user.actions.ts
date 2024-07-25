'use server'
import { revalidatePath } from "next/cache";
import User from "../models/user.model"
import { connectdb } from "./connectdb"
import { promises } from "fs";
import { FilterQuery, SortOrder } from "mongoose";
import Thread from "../models/thread.mode";
interface UpdateUserProps{
    userId: string,
    name:string,
    username:string,
    bio:string,
    image:string,
    path:string
}
export const updateUser = async ({userId, name, username, image,bio, path}:UpdateUserProps): Promise<void> =>{

  

    try {
        connectdb()
        await User.findOneAndUpdate({
            id: userId
        },
        {
            name,
            username: username.toLowerCase(),
            image,
            bio,
            onBoarded:true
        },
        {
            upsert: true,
        }
    
    );

    if(path === '/profile/edit'){
        revalidatePath(path)
    }
    } catch (error:any) {
        throw new Error(`error in updating user ${error.message}`)
    }
    
}

export const fetchUser = async(userId: string)=>{
    try {
        connectdb()
        return User.findOne({id: userId})
    } catch (error:any) {
        throw new Error(`there was an error in fetching user ${error.message}`)
    }
}


// Almost similar to Thead (search + pagination) and Community (search + pagination)
export async function fetchUsers({
    userId,
    searchString = "",
    pageNumber = 1,
    pageSize = 20,
    sortBy = "desc",
  }: {
    userId: string;
    searchString?: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: SortOrder;
  }) {
    try {
      connectdb();
  
      // Calculate the number of users to skip based on the page number and page size.
      const skipAmount = (pageNumber - 1) * pageSize;
  
      // Create a case-insensitive regular expression for the provided search string.
      const regex = new RegExp(searchString, "i");
  
      // Create an initial query object to filter users.
      const query: FilterQuery<typeof User> = {
        id: { $ne: userId }, // Exclude the current user from the results.
      };
  
      // If the search string is not empty, add the $or operator to match either username or name fields.
      if (searchString.trim() !== "") {
        query.$or = [
          { username: { $regex: regex } },
          { name: { $regex: regex } },
        ];
      }
  
      // Define the sort options for the fetched users based on createdAt field and provided sort order.
      const sortOptions = { createdAt: sortBy };
  
      const usersQuery = User.find(query)
        .sort(sortOptions)
        .skip(skipAmount)
        .limit(pageSize);
  
      // Count the total number of users that match the search criteria (without pagination).
      const totalUsersCount = await User.countDocuments(query);
  
      const users = await usersQuery.exec();
  
      // Check if there are more users beyond the current page.
      const isNext = totalUsersCount > skipAmount + users.length;
  
      return { users, isNext };
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }


  export async function getActivity(userId: string) {
    try {
      connectdb();
  
      // Find all threads created by the user
      const userThreads = await Thread.find({ author: userId });
  
      // Collect all the child thread ids (replies) from the 'children' field of each user thread
      const childThreadIds = userThreads.reduce((acc, userThread) => {
        return acc.concat(userThread.children);
      }, []);
  
      // Find and return the child threads (replies) excluding the ones created by the same user
      const replies = await Thread.find({
        _id: { $in: childThreadIds },
        author: { $ne: userId }, // Exclude threads authored by the same user
      }).populate({
        path: "author",
        model: User,
        select: "name image _id",
      });
  

      return replies;
    } catch (error) {
      console.error("Error fetching replies: ", error);
      throw error;
    }
  }


  export const getLikesActivity = async (userId:string)=>{
    connectdb()

    try {
      const likedThreads = await Thread.find({
        author: userId
      }).populate({
        path: 'likes',
        model: User,
      })

      //console.log(likedThreads)
     return likedThreads;
      

      
      
    } catch (error:any) {
      throw new Error(`error in fetching liker ${error.message}`)
    }
  }