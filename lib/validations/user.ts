import * as z from 'zod'

export const userValidation = z.object({
    profile_photo: z.string().url().nonempty(),
    name: z.string().min(3, 'name should have minimum 3 characters').max(30, 'name can have maximum of 30 characters'),
    username: z.string().min(2, 'username should have minimum 3 characters').max(30, 'username can have maximum of 30 characters'),
    bio: z.string().min(5, 'bio should have minimum 3 characters').max(1000)
})