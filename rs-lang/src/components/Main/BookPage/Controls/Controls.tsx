import React, { useState } from 'react'
import { Button, Card, Grid, Pagination, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import GrassIcon from "@mui/icons-material/Grass";
import { useAppDispatch } from '../../../../hooks/hooks';
import { fetchHardWords, setCurrentGroup, setCurrentPage } from '../../../../store/bookSlice';


type ControlsPropsType = {
  isAuth: boolean;
  currentGroup: number;
  currentPage: number;
}

const Controls: React.FC<ControlsPropsType> = ({isAuth, currentGroup, currentPage}) => {
  const dispatch = useAppDispatch();

  const handleChange = ( event: React.MouseEvent<HTMLElement>, newAlignment: string ) => {
    if (newAlignment <= '5' ) {
      dispatch(setCurrentPage(0))
      dispatch(setCurrentGroup(+newAlignment));
    } else if (newAlignment === '6') {
      dispatch(setCurrentPage(0))
      dispatch(setCurrentGroup(+newAlignment));
      dispatch(fetchHardWords());
    }
  };

  const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
      dispatch(setCurrentPage(value - 1))
  }

  return (
    <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Card sx={{ p: 1, m: 1 }}>
          <Tooltip title="Start game" arrow placement="left">
            <Button
              sx={{ mr: 2 }}
              size='large'
              variant="outlined"
              startIcon={<AudiotrackIcon />}
            >
              Audio call
            </Button>
            </Tooltip>
            <Tooltip title="Start game" arrow placement="right">
            <Button variant="outlined" size='large' startIcon={<GrassIcon />}>
              Savannah
            </Button>
            </Tooltip>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ p: 1 }}>
            <ToggleButtonGroup
              value={String(currentGroup)}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton sx={{ backgroundColor: '#ffef62', '&:hover': { background: '#b2a429'}}} value="0">Lvl 1</ToggleButton>
              <ToggleButton sx={{ backgroundColor: '#ffcd38', '&:hover': { background: '#b28704'}}} value="1">Lvl 2</ToggleButton>
              <ToggleButton sx={{ backgroundColor: '#a2cf6e', '&:hover': { background: '#618833'}}} value="2">Lvl 3</ToggleButton>
              <ToggleButton sx={{ backgroundColor: '#33ab9f', '&:hover': { background: '#00695f'}}} value="3">Lvl 4</ToggleButton>
              <ToggleButton sx={{ backgroundColor: '#6573c3', '&:hover': { background: '#2c387e'}}} value="4">Lvl 5</ToggleButton>
              <ToggleButton sx={{ backgroundColor: '#af52bf', '&:hover': { background: '#6d1b7b'}}} value="5">Lvl 6</ToggleButton>
              {isAuth && <ToggleButton sx={{ backgroundColor: '#f6685e', '&:hover': { background: '#aa2e25'}}} value="6">difficult words</ToggleButton>}
            </ToggleButtonGroup>
          </Card>
        </Grid>
        <Grid item xs={12} sx={{mt: 1, mb: 1}}>
        {currentGroup !== 6 &&<Pagination /* color='secondary' */ onChange={changePage} page={currentPage + 1} size='large' count={30}  boundaryCount={2} />}
        </Grid>
      </Grid>
  )
}

export default Controls