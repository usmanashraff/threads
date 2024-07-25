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
import { commentValidation, threadValidation } from "@/lib/validations/thread"
import { Textarea } from "../ui/textarea"
import { addCommentToThread, createThread } from "@/lib/actions/thread.actions"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { Input } from "../ui/input"
import Image from "next/image"
interface props {
    threadId: string,
    currentUserId:string,
    currentUserImg: string,
}
const Comment = ({threadId, currentUserId, currentUserImg}: props) => {
    const router = useRouter()
    const [isloading, setisloading] = useState(false)
    const path = usePathname()
  
       // 1. Define your form.
    const form = useForm<z.infer<typeof commentValidation>>({
      resolver: zodResolver(commentValidation),
      defaultValues: {
        thread: '',
      },
    })
   
    // 2. Define a submit handler.
     const onSubmit = async(values: z.infer<typeof commentValidation>)=> {
    setisloading(true)
    await addCommentToThread({
        threadId,
        commentText: values.thread,
        userId:currentUserId,
        path

    })
    form.reset()
    setisloading(false)
      
    }
  
  
  
    return (
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
         {/* thread content */}
         <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="flex items-center w-full">
                <FormLabel>
                 <Image src={currentUserImg} alt='currentUserImg' width={36} height={36} className="rounded-full object-contain" />
                </FormLabel>
                <FormControl className="flex-1 min-w-80 text-base-semibold mt-4 text-gray-200 max-w-xl">
                  <Input
                   type='text'
                   {...field}
                   className="no-focus outline-none bg-transparent border-none  text-small-regular"
                   placeholder="comment here ..."
                   />
                </FormControl>
              </FormItem>
            )}
          />
        <Button type="submit" className={`bg-primary-500 comment-form_btn capitalize ${isloading ? 'disabled':''}`}>
       {isloading ? (  <ColorRing
          visible={true}
          height="35"
          width="40"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#fffff', '#fffff', '#fffff', '#fffff','#fffff']}
    />): 'reply'}
        </Button>
      </form>
    </Form>
  )
}

export default Comment