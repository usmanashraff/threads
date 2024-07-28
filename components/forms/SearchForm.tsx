'use client'

import { useState } from "react"
import UserCard from "../shared/UserCard"
import { Input } from "../ui/input"
import CommunityCard from "../cards/CommunityCard"

interface props{
    result:{
        name:string,
        username:string,
        id:string,
        image:string,
        bio:string
        member?:string[]
    }[] ,
    type:'user' | 'community'
}
const SearchForm = ({result, type}: props) => {
    const [search, setSearch] = useState('')
  return (
    <div>
         <Input type="text" placeholder={`search ${type}`} className="outline-none border-none bg-dark-2 text-light-1" onChange={(e)=>setSearch(e.target.value)} />

         
            <div className="mt-10 flex flex-col gap-9">
              <>
              {result.filter((item)=>{
                return item.name.toLowerCase().includes(search.toLowerCase())
              }).map((item)=>{
                if(type === 'user')
                  return <UserCard 
                key={item.id}
                id={item.id}
                username={item.username}
                name={item.name}
                image={item.image}
                personType='user'
             />
             if(type === 'community')
              return <CommunityCard 
                      key={item.id}
                      id={item.id}
                      username={item.username}
                      name={item.name}
                      imgUrl={item.image}
                      bio={item.bio}
                      members={item.members}
          /> 
               
              })}
              </>
          
          </div>
        
    </div>
  )
}

export default SearchForm