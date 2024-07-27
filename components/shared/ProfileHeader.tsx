import Image from "next/image"
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaPencilAlt } from "react-icons/fa";

const ProfileHeader = ({
    userImage,
    username,
    userBio,
    name,
    type,
}:{
    userImage:string,
    username:string,
    userBio:string
    name:string,
    type?:'currentUser'
}) => {
  return (
  <div className="space-y-4">
    <div className="flex gap-4 items-center relative ">
        <div className="h-20 w-20 flex justify-center items-center overflow-hidden rounded-full  ">
        <Image src={userImage} alt='userImg' width={80} height={80} className="object-cover" />
       
        </div>
        {type === 'currentUser' && ( <Link href='/edit-profile' className="absolute bottom-0 rounded-full left-16 z-10 bg-dark-1 cursor-pointer">
            <FaPencilAlt className="text-white h-8 w-8 p-2" />

        </Link> )}
       
        <div className="flex flex-col justify-between">
            <p className="text-light-1 text-body-bold capitalize">
                {name}
            </p>
            <p className="text-gray-1 text-small-regular">
               @{username}
            </p>
        </div>
    </div>
     <p className="text-light-2 text-small-regular">
        {userBio}
     </p>
    </div>
  )
}

export default ProfileHeader