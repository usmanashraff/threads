import UserCard from "./UserCard"

interface props{
    admin: {
        _id:string,
        name:string,
        image:string,
        username:string,
        id:string
    },
    members: {
        _id:string,
        name:string,
        image:string,
        username:string,
        id:string
    }[],
    
}
const MembersTab = ({admin, members}: props) => {
  return (
    <div className="mt-10">
        <h4 className="text-light-1 text-small-semibold mb-2">Admin</h4>
        <UserCard name={admin.name} 
                     image={admin.image}
                     username={admin.username}
                     id={admin._id}
                     personType="admin"
        />
                <h4 className="text-light-1 text-small-semibold mb-2 mt-10">Members</h4>

        {
        members.length !== 0 ? 
        members.map((member)=>(
            <UserCard key={member._id}
            name={member.name} 
            image={member.image}
            username={member.username}
            id={member._id}
            personType="user"
/>
        )): <p className="text-gray-1">No members yet</p>
    }

    </div>
  )
}

export default MembersTab