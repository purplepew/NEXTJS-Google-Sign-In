'use client'
import React from 'react'
import { useRefreshTokenMutation } from '@/app/lib/features/auth/authApiSlice'
import { useAppDispatch } from '@/app/lib/hooks'
import { setCredentials } from '@/app/lib/features/auth/authSlice'

const AuthPersist = ({ children }: { children: React.ReactNode }) => {
    const [refresh] = useRefreshTokenMutation()
    const dispatch = useAppDispatch()

    React.useEffect(
        () => {
            const getToken = async () => {
                try {
                    const { accessToken } = await refresh().unwrap()
                    dispatch(setCredentials({ accessToken }))
                } catch (error) {
                    console.log(error)
                }
            }

            getToken()
        }, [dispatch, refresh]
    )

    return <>{children}</>
}

export default AuthPersist