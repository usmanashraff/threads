'use client'
import { sidebarLinks } from '@/constants'
import { SignedIn, SignOutButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useRef } from 'react'
import LoadingBar from 'react-top-loading-bar'

const LeftSideBar = () => {


  const pathname = usePathname()
  return (
    <>
     <section className='custom-scrollbar leftsidebar'>

      <div className="flex gap-2 flex-1 flex-col w-full px-4 ">
        {sidebarLinks.map((link)=>{
          const isActive = (pathname.includes(link.route) && link.route.length > 1) || link.route === pathname;
          return (
            <Link href={link.route} key={link.label} className={`leftsidebar_link cursor-pointer ${isActive && "bg-primary-500"} ${isActive && 'disabled'}`}>
              <Image src={link.imgURL} alt={link.label} width={24} height={24} />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          )
        })}
      </div>


      <div className="px-4 mt-10">
      <SignedIn>
            <SignOutButton redirectUrl='/sign-in'>
              <div className="flex cursor-pointer p-4 gap-4">
                <Image src='/assets/logout.svg' alt='logout button' width={24} height={24} />
                <p className="text-light-2 max-lg:hidden">logout</p>
              </div>
            </SignOutButton>
          </SignedIn>
      </div>
    </section>
  </>
  )
}

export default LeftSideBar