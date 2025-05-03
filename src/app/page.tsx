import React from 'react'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'

import AuthPersist from './components/hooks/AuthPersist'

const page = () => {
  return (
    <AuthPersist>

      <Container component={Paper} sx={{ height: '100vh' }}>
        <p>Home</p>
      </Container>
    </AuthPersist>
  )
}

export default page