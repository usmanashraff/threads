import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";

const page = async({params}: {params: {id: string}}) => {
  const userInfo = await fetchUser(params.id)
  if(!userInfo?.onBoarded)
    return redirect('/onboarding')
  const user = await currentUser()
  if(!user)
    return null
  if(userInfo?.id === user?.id)
    redirect('/profile')
  return (
   <section>
      <ProfileHeader
      userImage={userInfo.image}
      username={userInfo.username}
      userBio={userInfo.bio}
      name={userInfo.name}
    />


<div className="mt-10 ">

   
<Tabs defaultValue="threads" className="w-full">
  <TabsList className="tab">
    {profileTabs.map((tab)=>(
      <TabsTrigger key={tab.label} value={tab.value} className="tab">
        <Image src={tab.icon} alt={tab.label} width={24} height={24} className="object-contain" />
        <p className="max-sm:hidden">{tab.label}</p>
        {tab.label === 'Threads' && (
          <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 text-tiny-medium text-light-2">
            {userInfo?.threads?.length}
          </p>
        )}
      </TabsTrigger>
    ))}
  </TabsList>
  {profileTabs.map((tab)=>(
    <TabsContent key={tab.label} value={tab.value} className="w-full text-light-1">
      <ThreadsTab 
         currentUserId={user?.id}
         accountId={userInfo?.id}
         account_id={userInfo?._id}
         userName={userInfo?.name}
         userImage={userInfo?.image}
      />
    </TabsContent>
  ))}
</Tabs>



</div>
   </section>
  )
}

export default page