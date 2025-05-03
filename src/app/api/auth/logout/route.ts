import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    console.log("ran")
    const cookies = req.cookies

    if (!cookies.get('auth_token')) {
        return NextResponse.json({ message: 'Cookie already cleared.' }, { status: 204 })
    }

    const response = NextResponse.json({ message: 'Logged out successfully.' })
    response.cookies.set('auth_token', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 0
    })

    return response
}