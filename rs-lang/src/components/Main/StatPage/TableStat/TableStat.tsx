import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
  }
}

const TableStat:React.FC<TableStatPropsType> = ({dataForTable, isChangeTodayAudioChall, isChangeTodaySprint, avgAllgame}) => {
  const gameData = dataForTable.optional?.gamesStatistics;

  return (
    <TableContainer component={Paper}>
      <Table /* sx={{ minWidth: 350 }} */ aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Game</TableCell>
            <TableCell align="center">New words</TableCell>
            <TableCell align="center">% correct answers</TableCell>
            <TableCell align="center">Longest series of correct</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              Audio challenge
            </TableCell>
            <TableCell align="center">{isChangeTodayAudioChall ? gameData?.audioChallenge?.countNewWords : "-"}</TableCell>
            <TableCell align="center">{avgAllgame.avgAudioChall}</TableCell>
            <TableCell align="center">{isChangeTodayAudioChall ? gameData?.audioChallenge?.longestSeries : "-"}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              Sprint
            </TableCell>
            <TableCell align="center">{isChangeTodaySprint ? gameData?.sprint?.countNewWords : "-"}</TableCell>
            <TableCell align="center">{avgAllgame.avgSprint}</TableCell>
            <TableCell align="center">{isChangeTodaySprint ? gameData?.sprint?.longestSeries : "-"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableStat;
