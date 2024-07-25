"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { ColorRing } from 'react-loader-spinner'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { threadValidation } from "@/lib/validations/thread"
import { Textarea } from "../ui/textarea"
import { createThread } from "@/lib/actions/thread.actions"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

const PostThread = ({userId}: {userId: string}) => {
  const path = usePathname()
  const router = useRouter()
  const [isloading, setisloading] = useState(false)

     // 1. Define your form.
  const form = useForm<z.infer<typeof threadValidation>>({
    resolver: zodResolver(threadValidation),
    defaultValues: {
      thread: '',
      accountId: userId,
    },
  })
 
  // 2. Define a submit handler.
   const onSubmit = async(values: z.infer<typeof threadValidation>)=> {
  setisloading(true)
   await createThread({
      text: values.thread,
      author: userId,
      communityId: null,
      path,
    })
    
    router.push('/')
    setisloading(false)
  }



  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-10">
       {/* thread content */}
       <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel className="text-base-semibold text-light-2">
               Thread Content
              </FormLabel>
              <FormControl className="flex-1 min-w-80 text-base-semibold mt-4 text-gray-200 max-w-xl">
                <Textarea
                 rows={10}
                 {...field}
                 className="account-form_input no-focus"
                 />
              </FormControl>
              
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />
      <Button type="submit" className={`bg-primary-500 capitalize w-28 ${isloading ? 'disabled':''}`}>
     {isloading ? (  <ColorRing
        visible={true}
        height="45"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#fffff', '#fffff', '#fffff', '#fffff','#fffff']}
  />): 'create'}
      </Button>
    </form>
  </Form>
  )
}

export default PostThread