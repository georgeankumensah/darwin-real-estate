'use server'

import {FormState, LoginFormSchema} from "@/app/lib/definitions";
import {prisma} from "@/lib/prisma";
import bcrypt from "bcrypt";
import {createSession} from "@/app/lib/session";
import {redirect} from "next/navigation";

export async function login(state: FormState, formData: FormData) {
    console.log('in login')
    // 1. Validate form fields
    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // 2. Query the database for the user
    const { email, password } = validatedFields.data
    const user = await prisma.user.findUnique({
        where: { email },
    })

    if (!user) {
        console.log('user not found')
        return {
            message: 'Invalid email or password.',
        }
    }

    // 3. Compare the user's password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password!)

    if (!passwordMatch) {
        return {
            message: 'Invalid email or password.',
        }
    }

    // 4. Create user session
    await createSession(user.id.toString())

    // 5. Redirect user
    redirect('/dashboard')
}
