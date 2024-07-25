"use client"
import React, { useRef } from 'react'
import LoadingBar from 'react-top-loading-bar'
import { userValidation } from "@/lib/validations/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Image from "next/image"
import { ChangeEvent, useState } from "react"
import { Textarea } from "../ui/textarea"
import { isBase64Image } from "@/lib/utils"
import { useUploadThing } from "@/lib/uploadthing"
import { updateUser } from "@/lib/actions/user.actions"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
 

interface profileProps {
     user: {
        id: string,
        objectId: string,
        name: string,
        username: string,
        bio: string,
        image: string
    },
    btnTitle: string
}


const AccountProfile = ({user, btnTitle}: profileProps) => {
    const [files, setfiles] = useState<File[]>([])
    const { startUpload } = useUploadThing("media")
    const pathname = usePathname();
    const router = useRouter()
    const [isloading, setisloading] = useState(false)

    // for topbar loading
    const ref = useRef(null)

    const form = useForm<z.infer<typeof userValidation>>({
        resolver: zodResolver(userValidation),
        defaultValues: {
          profile_photo: user?.image || '',
          name: user?.name || '',
          bio: user?.bio || '',
          username: user?.username || '',
        },
      })

      const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value:string)=>void) =>{
        e.preventDefault()

        const fileReader = new FileReader()

        if(e.target.files && e.target.files.length > 0){
            const file = e.target.files[0]

            setfiles(Array.from(e.target.files))

            if(!file.type.includes('image')) return

            fileReader.onload = async(event)=>{
                const imgUrl = event.target?.result?.toString() || ''
                fieldChange(imgUrl)
            }

            fileReader.readAsDataURL(file)
        }
      }
     
      const onSubmit = async(values: z.infer<typeof userValidation>)=> {
       try {
        setisloading(true)
        ref?.current?.staticStart()
        const blob = values.profile_photo;

        const hasImageChanged = isBase64Image(blob)

        if(hasImageChanged){
            const imgRes = await startUpload(files)
            if(imgRes && imgRes[0].url){
                values.profile_photo = imgRes[0].url
            }
        }
        await updateUser({
          userId: user?.id,
          name: values.name,
          username:values.username,
          image:values.profile_photo,
          bio:values.bio,
          path: pathname,
        });

        setisloading(false)
        ref?.current?.complete();
        if(pathname === '/profile/edit')
          router.back()
        else
          router.push('/')
        
       } catch (error) {
        console.log(error)
       }
       
     }



  return (
    <Form {...form}>
      <LoadingBar color='#877EFF' ref={ref} height={4} style={{ borderRadius: '10px' }} />
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-10">

        {/* profile photo */}
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center ">
              <FormLabel className="account-form_image-label">
                {field.value ? (
                    <Image src={field.value} alt="profile photo" width={96} height={96} priority className="rounded-full object-contain" />
                ): (
                    <Image src='/assets/profile.svg' alt="profile photo" width={24} height={24} className="object-contain" />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="upload a photo"
                  className="account-form_image-input"
                  onChange={(e)=> handleImage(e, field.onChange)}
                 />
              </FormControl>
              
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />



        {/* name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start w-full">
              <FormLabel className="text-base-semibold text-light-2">
               Name
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                 type="text"
                 {...field}
                 className="account-form_input no-focus"
                 />
              </FormControl>
              
              <FormMessage  className='text-red-500' />
            </FormItem>
          )}
        />


        {/* username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start w-full">
              <FormLabel className="text-base-semibold text-light-2">
               Username
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                 type="text"
                 {...field}
                 className="account-form_input no-focus"
                 />
              </FormControl>
              
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />



        {/* bio */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start w-full">
              <FormLabel className="text-base-semibold text-light-2">
               Bio
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Textarea
                 rows={5}
                 {...field}
                 className="account-form_input no-focus"
                 />
              </FormControl>
              
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />
        <Button type="submit" className={`bg-primary-500 ${isloading ? 'disabled': ''}`}>
          {isloading ? "please wait..." : btnTitle}
        </Button>
      </form>
    </Form>
  )
}

export default AccountProfile