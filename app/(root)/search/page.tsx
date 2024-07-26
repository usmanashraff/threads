import UserCard from '@/components/shared/UserCard'
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async() => {
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

  const result = await fetchUsers({
    userId: user?.id || '',
    searchString: '',
    pageNumber:1,
    pageSize:25,
  })
  return (
    <section>
      <h1 className="head-text">Search</h1>

      <div className="mt-10 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="no-result">no users to show</p>
        ): (
          <>
          {result.users.map((person)=>(
            <UserCard 
               key={person.id}
               id={person.id}
               username={person.username}
               name={person.name}
               image={person.image}
               personType='user'
            />
          ))}
          </>
        )}
      </div>
    </section>
  )
}

export default page