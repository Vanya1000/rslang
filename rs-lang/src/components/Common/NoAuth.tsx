import { Grid, Card, CardContent, Typography, Button, Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import { StateTypeUseLocation } from '../../types/type';
import { useAppSelector } from '../../hooks/hooks';

const NoAuth = () => {
  const isAuth = useAppSelector(state => state.user?.user?.message === 'Authenticated');
  const navigate = useNavigate();
  const location = useLocation();
  const goToIn = () => {
    navigate('/signin', {state: {from: (location.state as StateTypeUseLocation).from}, replace: true});
  };
  const goToUp = () => {
    navigate('/signup'), {state: {from: (location.state as StateTypeUseLocation).from}, replace: true};
  };

  useEffect(() => {
		if (isAuth ) {
			navigate('/');
		}
		}, []);

  return (
    <Container maxWidth={'xl'}>
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <Grid item sx={{ width: '100%' }}>
          <Card>
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ textAlign: 'center' }}
              >
                <LockIcon fontSize="large" />
              </Typography>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ textAlign: 'center' }}
              >
                You do not have access to this page.
              </Typography>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ textAlign: 'center' }}
              >
                To access please sign in or sign up
              </Typography>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ textAlign: 'center' }}
              >
                <Button variant="outlined" onClick={goToIn} sx={{ mr: 2 }}>
                  Sign in
                </Button>
                <Button variant="outlined" onClick={goToUp}>
                  Sign up
                </Button>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NoAuth;
