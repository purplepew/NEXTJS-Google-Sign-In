'use client'
import React from 'react'
import { useAppSelector } from '../lib/hooks'
import { selectCurrentToken } from '../lib/features/auth/authSlice'
import { useLogoutMutation } from '../lib/features/auth/authApiSlice'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import GoogleIcon from '@mui/icons-material/Google'
import Skeleton from '@mui/material/Skeleton'

const Header = () => {
  const [googleSignInLink, setGoogleSignInLink] = React.useState<string | null>(null)
  const token = useAppSelector(selectCurrentToken)
  const [logout] = useLogoutMutation()

  React.useEffect(() => {
    const getGoogleSignInLink = async () => {
      await fetch('http://localhost:3000//api/auth/google/generateLink', { method: 'GET' })
        .then(response => response.json())
        .then(result => setGoogleSignInLink(result))
    }
    getGoogleSignInLink()
  }, [])

  const handleLogout = async () => {
    try {
      await logout().unwrap()
    } catch (error) {
      console.log(error)
    }
  }

  const SignInButtons = () => {
    const GoogleBtn = googleSignInLink ? (
      <Button startIcon={<GoogleIcon />} size='small' LinkComponent={'a'} href={googleSignInLink} variant='contained'>
        Sign In
      </Button>
    ) : <Skeleton height={50} width={100} />


    return (
      <div>
        {GoogleBtn}
      </div>
    )
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography>Header</Typography>
        <div style={{ marginLeft: 'auto' }}>
          {token ? <Button onClick={handleLogout}>Logout</Button> : <SignInButtons />}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header