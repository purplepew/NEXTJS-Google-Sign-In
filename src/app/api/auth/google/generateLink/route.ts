import client from "@/app/lib/googleOAuth";
import { NextResponse } from "next/server";

export async function GET() {
    const url = client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: ['openid', 'email', 'profile']
    })

    return NextResponse.json(url)
}

