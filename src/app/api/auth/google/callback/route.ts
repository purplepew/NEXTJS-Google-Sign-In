import client from "@/app/lib/OAuthClient";
import { NextResponse, NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { TokenPayload } from "google-auth-library";
import User from "@/app/lib/models/userModel";

export const GET = async (req: NextRequest) => {
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
                picture: payload?.picture
            } as TokenPayload,
        }

        const foundUser = await User.findOne({ email: data.user.email }).lean().exec()

        if (!foundUser) {
            await User.create({
                email: data.user.email,
                name: data.user.name,
                picture: data.user.picture
            })
        }

        const accessToken = jwt.sign(data.user, process.env.JWT_SECRET!, { expiresIn: '1h' })

        const response = NextResponse.redirect('http://localhost:3000/')
        response.cookies.set('auth_token', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 3600
        })

        return response

    } catch (error) {
        return NextResponse.json({ error: 'Token exchange failed ' + error }, { status: 500 });
    }
}