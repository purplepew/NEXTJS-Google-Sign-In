import apiSlice from "../apiSlice";
import { logout } from "./authSlice";

const authApiSlice = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
        refreshToken: builder.mutation<{ accessToken: string }, void>({
            query: () => ({
                url: '/api/auth/refresh',
                method: 'GET',
            })
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/api/auth/logout',
                method: 'POST'
            }),
            onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    dispatch(logout())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (err) {
                    console.log(err)
                }
            }
        })
    })
})

export const { useRefreshTokenMutation, useLogoutMutation } = authApiSlice

export default authApiSlice