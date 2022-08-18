import React from 'react'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'

const linkColor = (isActive: any) => (isActive ? 'cyan' : 'white');

const Header = () => {

  return (
    <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            RS Lang
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Button  sx={{ color: '#fff' }}>
            <NavLink to='/' style={({isActive}) => ({color: linkColor(isActive)})}>Главная</NavLink>
          </Button>
          <Button  sx={{ color: '#fff' }}>
            <NavLink style={({isActive}) => ({color: linkColor(isActive)})} to='/book'>Учебник</NavLink>
          </Button>
          <Button  sx={{ color: '#fff' }}>
            <NavLink style={({isActive}) => ({color: linkColor(isActive)})} to='/game'>Игры</NavLink>
          </Button>
          <Button  sx={{ color: '#fff' }}>
            <NavLink style={({isActive}) => ({color: linkColor(isActive)})} to='/stat'>Статистика</NavLink>
          </Button>
          <Button  sx={{ color: '#fff' }}>
            <NavLink style={({isActive}) => ({color: linkColor(isActive)})} to='/about'>О команде</NavLink>
          </Button>
          <Button  sx={{ color: '#fff' }}>
            <NavLink style={({isActive}) => ({color: linkColor(isActive)})} to='/signup'>Регистрация</NavLink>
          </Button>
          </Box>
        </Toolbar>
      </AppBar>
  )
}

export default Header