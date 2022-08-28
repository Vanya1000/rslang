import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { WordType } from '../../../types/type';

type StatisticOneWordPropsType = {
  isOpenStatistic: boolean;
  setIsOpenStatistic: React.Dispatch<React.SetStateAction<boolean>>;
  word: WordType;
}

const StatisticOneWord: React.FC<StatisticOneWordPropsType> = ({isOpenStatistic, setIsOpenStatistic, word}) => {

  const handleClose = () => {
    setIsOpenStatistic(false);
  };

  return (
    <Dialog open={isOpenStatistic} onClose={handleClose}>
        <DialogTitle sx={{mb: 4}}>Statistics by word <span style={{fontWeight: '900'}}>"{word.word}"</span></DialogTitle>
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
              <TableCell align="right">{word.userWord?.optional?.game?.audioChallenge?.right || '-'}</TableCell>
              <TableCell align="right">{word.userWord?.optional?.game?.audioChallenge?.wrong || '-'}</TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Savannah
              </TableCell>
              <TableCell align="right">{word.userWord?.optional?.game?.sprint?.right || '-'}</TableCell>
              <TableCell align="right">{word.userWord?.optional?.game?.sprint?.wrong || '-'}</TableCell>
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