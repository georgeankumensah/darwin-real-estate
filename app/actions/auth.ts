import bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'
import { SignupFormSchema, LoginFormSchema, FormState } from '@/lib/definitions'
import { prisma } from '@/lib/prisma'
import {createSession, deleteSession} from "@/lib/session";

export async function signup(state: FormState, formData: FormData) {
    // 1. Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // 2. Prepare data for insertion into database
    const { firstName, lastName, email, password } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    // 3. Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    })

    if (existingUser) {
        return {
            message: 'User with this email already exists.',
        }
    }

    // 4. Insert the user into the database
    const user = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phoneNumber: "",
            type: 'OWNER'
        },
    })

    if (!user) {
        return {
            message: 'An error occurred while creating your account.',
        }
    }

    // 5. Create user session
    await createSession(user.id.toString())

    // 6. Redirect user
    redirect('/dashboard')
}
