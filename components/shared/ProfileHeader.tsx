import Image from "next/image"

const ProfileHeader = ({
    userImage,
    username,
    userBio,
    name,
}:{
    userImage:string,
    username:string,
    userBio:string
    name:string
}) => {
  return (
  <div className="space-y-4">
    <div className="flex gap-4 items-center">
        <Image src={userImage} alt='userImg' width={80} height={80} className="rounded-full object-contain" />
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