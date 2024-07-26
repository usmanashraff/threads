import ProfileHeader from "@/components/shared/ProfileHeader";
import { currentUser } from "@clerk/nextjs/server"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { communityTabs, profileTabs } from "@/constants";
import Image from "next/image";
import { fetchCommunityDetails } from "@/lib/actions/community.actions";
import CommunityThreadsTab from "@/components/shared/CommunityThreadsTab";
import { fetchUser } from "@/lib/actions/user.actions";
import MembersTab from "@/components/shared/MembersTab";

const page = async({params}: {params: {id: string}}) => {
 

    const user = await currentUser()
    const userInfo = await fetchUser(user.id)

    const details = await fetchCommunityDetails(params.id)
  return (
    <section>
       <ProfileHeader
      userImage={details.image}
      username={details.username}
      userBio={details.bio}
      name={details.name}
    />


<div className="mt-10 ">

   
<Tabs defaultValue="threads" className="w-full">
  <TabsList className="tab">
    {communityTabs.map((tab)=>(
      <TabsTrigger key={tab.label} value={tab.value} className="tab">
        <Image src={tab.icon} alt={tab.label} width={24} height={24} className="object-contain" />
        <p className="max-sm:hidden">{tab.label}</p>
        {tab.label === 'Threads' && (
          <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 text-tiny-medium text-light-2">
            {details?.threads?.length}
          </p>
        )}
      </TabsTrigger>
    ))}
  </TabsList>

  {communityTabs.map((tab)=>(
    <TabsContent key={tab.label} value={tab.value} className="w-full text-light-1">
    

     {tab.label === 'Threads' && (
      
      <CommunityThreadsTab 
      communityId={details._id}
      userId={userInfo._id}
      community={details}
    />
     )}

     {tab.label === 'Members' && (
      <MembersTab
       admin={details.createdBy}
       members={details.members}
      />
     )}
   </TabsContent>
     

  ))}
 
</Tabs>



</div>
   </section>
  )
}

export default page