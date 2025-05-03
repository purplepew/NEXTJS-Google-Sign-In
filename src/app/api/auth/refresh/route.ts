import { NextResponse, NextRequest } from "next/server";
import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { TokenPayload } from "google-auth-library";

export const GET = async (req: NextRequest) => {
    const cookies = req.cookies

    if (!cookies.get('auth_token')) {
        return NextResponse.json({ message: 'Unauthorized'}, {status: 401 })
    }

    const refreshToken = cookies.get('auth_token')?.value

    try {
        const decoded = jwt.verify(refreshToken!, process.env.JWT_SECRET!) as TokenPayload


        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    name: decoded.name,
                    email: decoded.email,
                    picture: decoded.picture
                } as TokenPayload
            },
            process.env.JWT_SECRET!,
            { expiresIn: '30m' }
        )

        return NextResponse.json({ accessToken })

    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return NextResponse.json({ message: 'Token expired' }, { status: 401 })
        }
        NextResponse.json({ message: 'Invalid token' }, { status: 401 })
    }
}