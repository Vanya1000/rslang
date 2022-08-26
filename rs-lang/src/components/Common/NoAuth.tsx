import { Grid, Card, CardContent, Typography, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import LockIcon from '@mui/icons-material/Lock';

const NoAuth = () => {
  const navigate = useNavigate();

  const goToIn =() => {
    navigate('/signin');
  }
  const goToUp =() => {
    navigate('/signup');
  }

  return (
    <Grid container justifyContent="center" sx={{mt: 2}}>
      <Grid item sx={{ width: '100%' }}>
        <Card>
          <CardContent>
          <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
            <LockIcon fontSize='large'/>
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
            You do not have access to this page.
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
            To access please sign in or sign up
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
            <Button variant="outlined" onClick={goToIn} sx={{mr: 2}}>Sign in</Button>
            <Button variant="outlined" onClick={goToUp}>Sign up</Button>
            </Typography>
            
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default NoAuth