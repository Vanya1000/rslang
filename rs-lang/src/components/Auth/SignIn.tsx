import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Alert, Link, Stack } from '@mui/material'

import { SignInFormType, StateTypeUseLocation } from '../../types/type';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { login } from '../../store/userSlice';

const SignIn = () => {
	const isAuth = useAppSelector(state => state.user?.user?.message === 'Authenticated');
	const isFetcing = useAppSelector(state => state.user.isFetching);
	const navigate = useNavigate();
	const { state } = useLocation();
	const fromPage = (state as StateTypeUseLocation)?.from || '/';

	const dispatch = useAppDispatch();
	const loginErrorMessage = useAppSelector((state) => state.user.regErrorMessage);

	const { register, handleSubmit, formState: { errors } } = useForm<SignInFormType>();

	const onSubmit: SubmitHandler<SignInFormType> = data => {
		dispatch(login({dataUser: data, cb: () => navigate( fromPage, { replace: true } )}));
	}
	
	useEffect(() => {
	if (isAuth) {
		navigate('/');
	}
	}, []);


	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1 }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				{loginErrorMessage &&
					<Stack sx={{ width: '100%' }} spacing={2}>
						<Alert severity="error">{loginErrorMessage}</Alert>
					</Stack>}
				
				
				<Box >
					<form onSubmit={handleSubmit(onSubmit)}>
						{errors?.email && <Stack sx={{ width: '100%' }} spacing={2}><Alert severity="error">{errors?.email?.message || 'Error'}</Alert></Stack>}
						<TextField
							error={errors.email && true}
							margin="normal"
							fullWidth
							label="Email"
							autoComplete="email"
							autoFocus
							{...register('email', {
								required: 'Field login is required', pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: 'Invalid email address'
								}
							})}
						/>
						{errors?.password && <Stack sx={{ width: '100%' }} spacing={2}><Alert severity="error">{errors?.password?.message || 'Error'}</Alert></Stack>}
						<TextField
							error={errors.password && true}
							margin="normal"
							fullWidth
							label="Password"
							type="password"
							autoComplete="current-password"
							{...register('password', {
								required: 'Field password is required', pattern: {
									value: /^[^А-Яа-я]+$/i,
									message: 'Use only English characters'
								}
							})}
						/>
						<LoadingButton
							loading={isFetcing}
							loadingPosition="end"
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</LoadingButton>
					</form>
					<Grid container>
						<Grid item xs>
							<Link component={RouterLink} to="/signup" variant="body2">
								{'Don\'t have an account? Sign Up'}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
export default SignIn;