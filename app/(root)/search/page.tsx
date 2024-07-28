import SearchForm from '@/components/forms/SearchForm'
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
       <SearchForm result={result.users} type='user' />
    </section>
  )
}

export default page