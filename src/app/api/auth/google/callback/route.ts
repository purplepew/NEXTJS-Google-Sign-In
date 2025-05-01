import client from "@/app/lib/googleOAuth";
import { NextResponse, NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get('code')

    if (!code) {
        return NextResponse.json({ message: 'Missing code' }, { status: 400 })
    }

    try {
        const { tokens } = await client.getToken(code)
        client.setCredentials(tokens)

        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token!,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        const payload = ticket.getPayload()

        const data = {
            message: 'Login successful',
            user: {
                name: payload?.name,
                email: payload?.email,
                picture: payload?.picture,
            },
        } 

        return NextResponse.redirect('http://localhost:3000/')

    } catch (error) {
        return NextResponse.json({ error: 'Token exchange failed' }, { status: 500 });
    }
}