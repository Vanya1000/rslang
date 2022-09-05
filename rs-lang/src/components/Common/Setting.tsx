import React, { useState } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
import { Checkbox, IconButton } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setIsShowTranslation } from '../../store/settingsSlice';

const Setting = () => {
  const dispatch = useAppDispatch();
  const isShowTranslate = useAppSelector(state => state.settings.isShowTranslation);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const changeCheck = () => {
    dispatch(setIsShowTranslation(!isShowTranslate));
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleClosePressMenu = () => {
    changeCheck();
    setAnchorEl(null);
  };
  

  return (
    <>
      <IconButton
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <SettingsIcon color='info' />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClosePressMenu}>
        <Checkbox  checked={isShowTranslate} />
        Display the translation of words
        </MenuItem>
      </Menu>
    </>
  )
}

export default Setting