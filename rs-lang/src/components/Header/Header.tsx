import React, { useEffect, useState } from 'react'
import { AppBar, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material'
import { NavLink, Link as RLink, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import DrawerLayout from './DrawerLayout';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getUser, logout } from '../../store/userSlice';
import Setting from '../Common/Setting';
import { setCurrentGroup, setCurrentPage } from '../../store/bookSlice';


const linkColor = (isActive: any) => (isActive ? '#FFFFFF' : '#b0b0b0');
const underLine = (isActive: any) => (isActive ? 'underline' : 'none');

const Header = () => {
  const dispatch = useAppDispatch();
  const redirect = useNavigate();
  const isAuth = useAppSelector(state => state.user?.user?.message === 'Authenticated');
  const userName = useAppSelector(state => state.user?.user?.name);

  const [menuOpen, setMenuOpen] = useState(false);

  const logoutCb = () => {
    dispatch(logout());
    dispatch(setCurrentPage(0))
    dispatch(setCurrentGroup(0))
  }

  useEffect(() => {
    if (isAuth) {
      redirect('/');
    }
  }, [isAuth])

  return (
    <>
    <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
              
              onClick={() => setMenuOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
            >
              RS Lang
            </Typography>
            <Box sx={{ 
              flexWrap: 'wrap',
              justifyContent: 'center',
              typography: 'body1',
              '& > :not(style) + :not(style)': {
                ml: 2,
              },
              display: { xs: 'none', sm: 'flex' }}}  >
                <NavLink to='/' style={({isActive}) => ({color: linkColor(isActive), textDecoration: underLine(isActive)})}>Main</NavLink>
                <NavLink style={({isActive}) => ({color: linkColor(isActive), textDecoration: underLine(isActive) })} to='/book'>Textbook</NavLink>
                <NavLink style={({isActive}) => ({color: linkColor(isActive), textDecoration: underLine(isActive)})} to='/game'>Mini games</NavLink>
                <NavLink style={({isActive}) => ({color: linkColor(isActive), textDecoration: underLine(isActive)})} to='/stat'>Statistics</NavLink>
                <NavLink style={({isActive}) => ({color: linkColor(isActive), textDecoration: underLine(isActive)})} to='/about'>About us</NavLink>
            </Box>
            
            {isAuth 
            ? <Box>
              <span>
              {userName}
              <Setting />
            <IconButton aria-label="delete" size="large" onClick={logoutCb}>
            <LogoutIcon sx={{color: '#FFFFFF'}}/>
          </IconButton>
            </span>
            </Box>
            : <Box>
            <Setting />
            <Button color="inherit">
            <RLink style={{ textDecoration: 'none', color: 'white' }} to='/signin'>Sign in</RLink>
            </Button> 
            </Box>
            }
            
        </Toolbar>
      </AppBar>
      <DrawerLayout menuOpen={menuOpen} closeMenu={() => setMenuOpen(false) }  />
      </>
  )
}

export default Header