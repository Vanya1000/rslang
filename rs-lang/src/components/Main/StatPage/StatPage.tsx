import React, { useEffect } from "react";
import { Alert, Grid, Paper, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import GraphStat from "./GraphStat/GraphStat";
import TableStat from "./TableStat/TableStat";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { fetchStatistics } from "../../../store/statisticsSlice";
import { getCurrentDate } from "../../../AuxiliaryFunctions/AuxiliaryFunctions";
import NoAuth from "../../Common/NoAuth";

const StatPage = () => {
  const dataStatistics = useAppSelector(state => state.statistics.data);
  const isAuth = useAppSelector(state => state.user?.user?.message === "Authenticated");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchStatistics());
  } , []);

  const optional = dataStatistics?.optional
  const dataForTableLearned = optional?.wordStatistics?.countLearnedWords;
  const dataForTableNewWords = optional?.wordStatistics?.countNewWords;
  const newWordsDaily = optional?.wordStatistics?.countNewWords ? optional?.wordStatistics?.countNewWords?.[getCurrentDate()] : null;
  const learnedWordsDaily = optional?.wordStatistics?.countLearnedWords ? optional?.wordStatistics?.countLearnedWords?.[getCurrentDate()] : null;

  const isChangeTodayAudioChall = optional?.gamesStatistics?.audioChallenge?.lastChanged === getCurrentDate();
  const isChangeTodaySprint = optional?.gamesStatistics?.sprint?.lastChanged === getCurrentDate();
  const avgGameCoorectAnswers = () => {
    let avgAudioChall = '-';
    if (isChangeTodayAudioChall) {
      const right = optional?.gamesStatistics?.audioChallenge?.right || 0;
      const wrong = optional?.gamesStatistics?.audioChallenge?.wrong || 0;
      avgAudioChall = ((right / (right + wrong)) * 100).toFixed(0);
    }
    let avgSprint = '-';
    if (isChangeTodaySprint) {
      const right = optional?.gamesStatistics?.sprint?.right || 0;
      const wrong = optional?.gamesStatistics?.sprint?.wrong || 0;
      avgSprint = ((right / (right + wrong)) * 100).toFixed(0);
    }
    let avgAll = '-';
    if (isChangeTodayAudioChall && isChangeTodaySprint) {
      avgAll = ((parseInt(avgAudioChall) + parseInt(avgSprint)) / 2).toFixed(0);
    } else if (isChangeTodayAudioChall) {
      avgAll = avgAudioChall;
    } else if (isChangeTodaySprint) {
      avgAll = avgSprint;
    }
    return {
      avgAudioChall,
      avgSprint,
      avgAll
    }
  }
  const avgAllgame = avgGameCoorectAnswers();

  return (
    <Container>
      {isAuth ? (
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 2, mb: 2 }}
      >
        <Grid sx={{ p: 2 }} container direction="column" component={Paper}>
          <Grid item>
            <Typography variant="h6">Daily statistics on mini-games</Typography>
            {!isChangeTodaySprint && !isChangeTodayAudioChall  && <Alert severity="info">You haven't played a single game today</Alert>}
          </Grid>
          <Grid item sx={{ pl: 2, pr: 2 }}>
            <TableStat 
            dataForTable={dataStatistics} 
            isChangeTodayAudioChall={isChangeTodayAudioChall} 
            isChangeTodaySprint={isChangeTodaySprint}
            avgAllgame={avgAllgame}
            />
          </Grid>
          <Grid sx={{ pt: 1 }} item>
            <Typography variant="h6">Daily statistics by words</Typography>
            {!learnedWordsDaily && !newWordsDaily  &&  !isChangeTodaySprint && !isChangeTodayAudioChall && <Alert severity="info">There were no such activities today</Alert>}
          </Grid>
          <Grid
            container
            sx={{ pl: 2, pr: 2 }}
            justifyContent="space-between"
            alignItems="center"
            gap={1}
          >
            <Grid xs={12} sm={"auto"} item component={Paper} sx={{ p: 2 }}>
              <Box>
                <Typography variant="overline">new words daily</Typography>
              </Box>
              <Box>
                <Typography align="center" variant="h6">
                {newWordsDaily ? newWordsDaily : '-'}
                </Typography>
              </Box>
            </Grid>
            <Grid xs={12} sm={"auto"} item component={Paper} sx={{ p: 2 }}>
              <Box>
                <Typography variant="overline">% correct answers</Typography>
              </Box>
              <Box>
                <Typography align="center" variant="h6">
                  {avgAllgame.avgAll}
                </Typography>
              </Box>
            </Grid>
            <Grid xs={12} sm={"auto"} item component={Paper} sx={{ p: 2 }}>
              <Box>
                <Typography variant="overline">learned words</Typography>
              </Box>
              <Box>
                <Typography align="center" variant="h6">
                {learnedWordsDaily ? learnedWordsDaily : '-'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid component={Paper} sx={{ mt: 2 }} container>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">
              Long-term statistics for the entire study period
            </Typography>
          </Box>
          <Grid sx={{ pl: 4, pr: 4, pb: 2 }} spacing={3} container justifyContent="space-between" alignItems='center'>
            <Grid item xs={12} md={6} >
              <GraphStat title={'New words'} color={'#f50057'} dataForGraph={dataForTableNewWords} />
            </Grid>
            <Grid item xs={12 } md={6}>
              <GraphStat title={'Increase learned words'} color={'#0288d1'} dataForGraph={dataForTableLearned}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>)
      : (
        <NoAuth/>
      )}
    </Container>
  );
};

export default StatPage;
