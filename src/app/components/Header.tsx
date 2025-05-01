'use client'
import React from 'react'
import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter()

  const onClickSignIn = async () => {
    try {
      const response = await fetch('/api/auth/google/generateLink', { method: 'GET' });
      const url  = await response.json()
      router.push(url)
    } catch (error) {
      console.log('Error on generating login link')
    }
  }

  return (
    <div style={{ height: '1rem', backgroundColor: 'grey', display: 'flex' }}>
      <p>Header</p>
      <Button onClick={onClickSignIn}>Sign in</Button>
    </div>
  )
}

export default Header