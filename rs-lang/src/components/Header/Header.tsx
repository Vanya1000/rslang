import React, { useEffect, useState } from 'react'
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { NavLink, Link as RLink, useNavigate, useLocation } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import DrawerLayout from './DrawerLayout';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { logout, setIsSuccessRegistration } from '../../store/userSlice';
import Setting from '../Common/Setting';
import { setCurrentGroup, setCurrentPage } from '../../store/bookSlice';


const linkColor = (isActive: unknown) => (isActive ? '#FFFFFF' : '#b0b0b0');
const underLine = (isActive: unknown) => (isActive ? 'underline' : 'none');

const Header = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(state => state.user?.user?.message === 'Authenticated');
  const userName = useAppSelector(state => state.user?.user?.name);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutCb = () => {
    dispatch(logout());
    dispatch(setCurrentPage(0));
    dispatch(setCurrentGroup(0));
    dispatch(setIsSuccessRegistration(false));
  }

  return (
    <>
    <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, display: { xs: 'block',md: 'none' } }}
              onClick={() => setMenuOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: {xs: '1', md:'0'}  }}
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
              display: { xs: 'none', md: 'flex' }}}  >
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
            <RLink style={{ textDecoration: 'none', color: 'white' }} to='/signin' state={{from: location.pathname}}>Sign in</RLink>
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