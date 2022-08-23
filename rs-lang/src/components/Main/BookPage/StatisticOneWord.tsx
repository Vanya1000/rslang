import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

type StatisticOneWordPropsType = {
  isOpenStatistic: boolean;
  setIsOpenStatistic: React.Dispatch<React.SetStateAction<boolean>>;
  wordName: string
}

const StatisticOneWord: React.FC<StatisticOneWordPropsType> = ({isOpenStatistic, setIsOpenStatistic, wordName}) => {

  const handleClose = () => {
    setIsOpenStatistic(false);
  };

  return (
    <Dialog open={isOpenStatistic} onClose={handleClose}>
        <DialogTitle sx={{mb: 4}}>Statistics by word <span style={{fontWeight: '900'}}>"{wordName}"</span></DialogTitle>
        <DialogContent>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Game</TableCell>
            <TableCell align="right">Correctly</TableCell>
            <TableCell align="right">Wrong</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Audio call
              </TableCell>
              <TableCell align="right">{0}</TableCell>
              <TableCell align="right">{0}</TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Savannah
              </TableCell>
              <TableCell align="right">{0}</TableCell>
              <TableCell align="right">{0}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
  )
}

export default StatisticOneWord