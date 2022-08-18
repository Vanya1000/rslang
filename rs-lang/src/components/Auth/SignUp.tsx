import React, { useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Link, Stack } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { DataForRegistration, SignUpFormType } from '../../types/type';
import { registration } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';





const SignUp = () => {
	const dispatch = useAppDispatch()

	const isSuccessRegistration = useAppSelector((state) => state.user.isSuccessRegistration)
	const regErrorMessage = useAppSelector((state) => state.user.regErrorMessage)

	const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<SignUpFormType>();

	const password = useRef({});
	password.current = watch('password', '');

	const onSubmit: SubmitHandler<SignUpFormType> = data => {
		const packData: DataForRegistration = {
			name: data.name,
			email: data.email,
			password: data.password,
		};

		dispatch(registration(packData));
		reset();
	}

	return (
		<Container maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1 }}>
					<AppRegistrationIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Регистрация
				</Typography>
				{regErrorMessage && !isSuccessRegistration && <Stack sx={{ width: '100%' }} spacing={2}><Alert severity="error">{regErrorMessage}</Alert></Stack>}
				{isSuccessRegistration  &&
					<>
						<Stack sx={{ width: '100%' }} spacing={2}>
							<Alert severity="success">Пользователь успешно зарегистрирован! Пожалуйста, войдите в систему, чтобы продолжить.</Alert>
							<Button component={RouterLink} to="/signin" variant="contained" color="success">Войти</Button>
						</Stack>
					</>}
				{!isSuccessRegistration &&
					<Box >
						<form onSubmit={handleSubmit(onSubmit)}>
							{errors?.name && <Alert sx={{ width: '100%' }} severity="error">{errors?.name?.message || 'Error'}</Alert>}
							<TextField
								margin="normal"
								fullWidth
								label="name"
								autoFocus
								error={errors.name && true}
								{...register('name', {
									required: 'Field name is required'
								})}
							/>
							{errors?.email && <Alert sx={{ width: '100%' }} severity="error">{errors?.email?.message || 'Error'}</Alert>}
							<TextField
								margin="normal"
								fullWidth
								label="email"
								error={errors.name && true}
								{...register('email', {
									required: 'Field email is required', pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: 'Invalid email address'
									}
								})}
							/>
							{errors?.password && <Alert sx={{ width: '100%' }} severity="error">{errors?.password?.message || 'Error'}</Alert>}
							<TextField
								margin="normal"
								fullWidth
								label="Password"
								type="password"
								error={errors.password && true}
								{...register('password', {
									required: 'Field password is required', pattern: {
										value: /^[^А-Яа-я]+$/i,
										message: 'Use only English characters'
									},
									minLength: {
										value: 8,
										message: 'Minimum length password: 8'
									}
								})}
							/>
							{errors?.confirmPassword && <Alert sx={{ width: '100%' }} severity="error">{errors?.confirmPassword?.message || 'Error'}</Alert>}
							<TextField
								margin="normal"
								fullWidth
								label="Confirm password"
								type="password"
								error={errors.password && true}
								{...register('confirmPassword', { validate: value => value === password.current || 'The passwords do not match' })}
							/>
							
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Зарегистрироваться
							</Button>
						</form>
						<Grid container>
							<Grid item xs>
								<Link component={RouterLink} to="/signin" variant="body2">
									"У вас уже есть аккаунт? Войти"
								</Link>
							</Grid>
						</Grid>
					</Box>
				}
			</Box>
		</Container>
	);
}
export default SignUp;