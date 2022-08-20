import React from 'react'
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import { Link } from 'react-router-dom';


type DrawerLayoutPropsType = {
  menuOpen: boolean;
  closeMenu: () => void;
};



const DrawerLayout: React.FC<DrawerLayoutPropsType> = ({menuOpen, closeMenu}) => {


  const linkStyle = {
    textDecoration: 'none',
    color: 'rgb(0,0,0,0.8)',
  };

  return (
    <Drawer
    anchor='left'
    open={menuOpen}
    onClose={closeMenu}
    >
      <Box
      sx={{ width: 250 }}
      onClick={closeMenu}
    >
      <List>
        <Link style={linkStyle} to='/' >
          <ListItem key={'Main'} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={'Main'} />
            </ListItemButton>
          </ListItem>
          </Link>
      </List>
      <List>
        <Link style={linkStyle} to='/book' >
          <ListItem key={'Textbook'} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MenuBookOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={'Textbook'} />
            </ListItemButton>
          </ListItem>
          </Link>
      </List>
      <List>
        <Link style={linkStyle} to='/game' >
          <ListItem key={'Mini games'} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SportsEsportsOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={'Mini games'} />
            </ListItemButton>
          </ListItem>
          </Link>
      </List>
      <List>
        <Link style={linkStyle} to='/stat' >
          <ListItem key={'Statistics'} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LeaderboardOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={'Statistics'} />
            </ListItemButton>
          </ListItem>
          </Link>
      </List>
      <List>
        <Link style={linkStyle} to='/about' >
          <ListItem key={'About us'} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InfoOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={'About us'} />
            </ListItemButton>
          </ListItem>
          </Link>
      </List>
      <Divider />
    </Box>
    </Drawer>
  );
}

export default DrawerLayout