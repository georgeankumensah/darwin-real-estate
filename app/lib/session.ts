import 'server-only'
import {SignJWT, jwtVerify} from 'jose'
import {cookies} from 'next/headers'
import {SessionPayload} from '@/app/lib/definitions'

const secretKey = process.env.SESSION_SECRET
if (!secretKey) throw new Error('SESSION_SECRET environment variable is not set')
const encodedKey = new TextEncoder().encode(secretKey)

// Helpers
function getExpiryDate() {
    return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
}

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
    try {
        const {payload} = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload as SessionPayload
    } catch (error) {
        console.log('Failed to verify session:', error)
        return null
    }
}

export async function createSession(userId: string) {
    const expiresAt = getExpiryDate()
    const session = await encrypt({userId, expiresAt})
    const cookieStore = await cookies()

    cookieStore.set('session', session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export async function updateSession() {
    const cookieStore = await cookies()
    const session = cookieStore.get('session')?.value
    const payload = await decrypt(session)

    if (!session || !payload) {
        return null
    }

    const expires = getExpiryDate()

    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: 'lax',
        path: '/',
    })
}

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('session')
}

export async function getSession() {
    const session = (await cookies()).get('session')?.value
    if (!session) return null
    return await decrypt(session)
}
