import React from "react";
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { StatisticsType } from "../../../../types/type";

type TableStatPropsType = {
  dataForTable: StatisticsType;
  isChangeTodayAudioChall: boolean;
  isChangeTodaySprint: boolean;
  avgAllgame: {
    avgAudioChall: string;
    avgSprint: string;
    avgAll: string;
  };
};

const TableStat: React.FC<TableStatPropsType> = ({
  dataForTable,
  isChangeTodayAudioChall,
  isChangeTodaySprint,
  avgAllgame,
}) => {
  const matches460 = useMediaQuery('(max-width:460px)');
  const gameData = dataForTable.optional?.gamesStatistics;

  return (
    <>
      {matches460 ?
      <>
      <Grid xs={12} sm={"auto"} item component={Paper} sx={{ p: 2, mb: 2 }}>
        <Box>
          <Typography variant="overline">Audio challenge</Typography>
        </Box>
        <Box>
          <Typography align="left" variant="body2">
          New words: {isChangeTodayAudioChall ? gameData?.audioChallenge?.countNewWords : "-"}
          </Typography>
          <Typography align="left" variant="body2">
          % correct answers: {avgAllgame.avgAudioChall}
          </Typography>
          <Typography align="left" variant="body2">
          Longest series of correct: {isChangeTodayAudioChall ? gameData?.audioChallenge?.longestSeries : "-"}
          </Typography>
        </Box>
      </Grid>
      <Grid xs={12} sm={"auto"} item component={Paper} sx={{ p: 2 }}>
        <Box>
          <Typography variant="overline">Sprint</Typography>
        </Box>
        <Box>
          <Typography align="left" variant="body2">
          New words: {isChangeTodayAudioChall ? gameData?.sprint?.countNewWords : "-"}
          </Typography>
          <Typography align="left" variant="body2">
          % correct answers: {avgAllgame.avgSprint}
          </Typography>
          <Typography align="left" variant="body2">
          Longest series of correct: {isChangeTodayAudioChall ? gameData?.sprint?.longestSeries : "-"}
          </Typography>
        </Box>
      </Grid>
      </> 
      : <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell>Game</TableCell>
            <TableCell align="center">New words</TableCell>
            <TableCell align="center">% correct answers</TableCell>
            <TableCell align="center">Longest series of correct</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Audio challenge
            </TableCell>
            <TableCell align="center">
              {isChangeTodayAudioChall
                ? gameData?.audioChallenge?.countNewWords
                : "-"}
            </TableCell>
            <TableCell align="center">{avgAllgame.avgAudioChall}</TableCell>
            <TableCell align="center">
              {isChangeTodayAudioChall
                ? gameData?.audioChallenge?.longestSeries
                : "-"}
            </TableCell>
          </TableRow>
          <TableRow
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Sprint
            </TableCell>
            <TableCell align="center">
              {isChangeTodaySprint ? gameData?.sprint?.countNewWords : "-"}
            </TableCell>
            <TableCell align="center">{avgAllgame.avgSprint}</TableCell>
            <TableCell align="center">
              {isChangeTodaySprint ? gameData?.sprint?.longestSeries : "-"}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>}
      
    </>
  );
};

export default TableStat;
