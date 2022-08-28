import { Box, Button, Card, CardContent, CardMedia, Chip, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import { UserWordType, WordType } from '../../../../types/type'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HardwareIcon from '@mui/icons-material/Hardware';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ClearIcon from '@mui/icons-material/Clear';
import PlayAudio from './PlayAudio';
import StatisticOneWord from '../StatisticOneWord';
import { useAppDispatch } from '../../../../hooks/hooks';
import { createUserWord, deleteDifficultUserWord, updateExistUserWord } from '../../../../store/bookSlice';
import { addOneWordAsLearnedOrNew, deleteOneWordAsLearned, sendStatistics } from '../../../../store/statisticsSlice';
const baseUrl = process.env.REACT_APP_API_URL;
const level: {[key: number]: string} = {
  0: '#ffef62',
  1: '#ffcd38',
  2: '#a2cf6e',
  3: '#33ab9f',
  4: '#6573c3',
  5: '#af52bf',
  6: '#f6685e',
}

const dataPayload: UserWordType = {
  "difficulty": "difficult",
  "optional": {
    "countRightAnswers": "0"
  }
}

const lightGreen = '#00ff000e';
const lightRed = '#ff00000e';

type CardItemProps = {
  word: WordType;
  isAuth: boolean;
  isShowTranslate: boolean;
  currentGroup: number;
  isSend: boolean;
}

const CardItem: React.FC<CardItemProps> = ({word, isAuth, isShowTranslate, currentGroup, isSend}) => {
  const dispatch = useAppDispatch();
    const [isOpenStatistic, setIsOpenStatistic] = useState(false);
    const isDifficult = word.userWord?.difficulty === 'difficult'
    const isLearned = word.userWord?.difficulty === 'learned';
    const isDifficultGroup = currentGroup === 6;
    const bgColor = isDifficult ? lightRed : isLearned ? lightGreen : 'none' ;
    const isStatistics = word.userWord?.optional?.isNew === 'false';

    const handleToDifficult = () => {
      if (!isSend) {
        if (word.userWord) {
          if (isDifficult) {
            dispatch(deleteDifficultUserWord({wordId: word._id!, payload: {"difficulty": "none"}}));
          } else {
            dispatch(updateExistUserWord({wordId: word._id!, payload: dataPayload}));
            dispatch(deleteOneWordAsLearned());
          }
        } else {
          dispatch(createUserWord({wordId: word._id!, payload: {"difficulty": "difficult"}}));
          dispatch(deleteOneWordAsLearned());
        }
      }
    }

    const handleToLearn = () => {
      if (!isSend) {
        dispatch(addOneWordAsLearnedOrNew('learned'));
        if (word.userWord) {
          dispatch(updateExistUserWord({wordId: word._id!, payload: {"difficulty": "learned"}}));
        } else {
          dispatch(createUserWord({wordId: word._id!, payload: {"difficulty": "learned"}}));
        }
      }
    }

  return (
    <>
    <Grid item xs={12}>
      <Card sx={{ display: 'flex', p:1, backgroundColor: `${bgColor}`, flexDirection:{xs: 'column', md: 'row'} }}>
      <CardMedia
        component="img"
        sx={{ width: {xs: '100%', md: 300}, height: {xs: 350, md: 250}, objectFit: 'cover' }}
        image={`${baseUrl}${word.image}`}
        alt="Live from space album cover"
      />

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <CardContent >
          <Chip label={`Lvl ${word.group + 1}`} sx={{ bgcolor: `${level[word.group]}`}}/>
          <Typography component="h5" variant="h5">
            {word.word} - {word.transcription}
            <span>
              <PlayAudio audioData={{word: baseUrl + word.audio, firstSent: baseUrl + word.audioMeaning, secondSent: baseUrl + word.audioExample}}/>
            </span>
          </Typography>
          {isShowTranslate && <Typography variant="subtitle1"  color="textSecondary">
            {word.wordTranslate}
          </Typography>}
          <Typography variant="subtitle1" >
            <div dangerouslySetInnerHTML={{ __html: word.textMeaning }} />
          </Typography>
          {isShowTranslate &&<Typography variant="subtitle1" color="textSecondary" >
            {word.textMeaningTranslate}
          </Typography>}
          <Typography variant="subtitle1" >
          <div dangerouslySetInnerHTML={{ __html: word.textExample }} />
          </Typography>
          {isShowTranslate &&<Typography variant="subtitle1" color="textSecondary">
            {word.textExampleTranslate}
          </Typography>}
          {/*<Button onClick={() => dispatch(sendStatistics({type:'right', wordId: word._id!, game: 'audioChallenge', series: 5}))}>send statistics</Button> */}
        </CardContent>
      </Box>

      {isAuth && <Box sx={{ display: 'flex', flexDirection:{xs: 'row', md: 'column'}, justifyContent: 'center', mr: 2 }}>
        {!isDifficultGroup && <Tooltip sx={{mb: 1}} arrow placement="left" title={isLearned ? 'Delete from Learned' : 'Mark as Learned'}>
            <IconButton disabled={isLearned && true} component="span" onClick={handleToLearn}>
            {isLearned ? <TaskAltIcon color='success' /> : <AddTaskIcon />}
            </IconButton>
          </Tooltip>}
        <Tooltip  sx={{mb: 1}} arrow placement="left" title={isDifficult ? 'Delete from difficult' : 'Mark as difficult'}>
          <IconButton disabled={isDifficult && !isDifficultGroup && true} color="default" component="span" onClick={handleToDifficult}>
            {!isDifficultGroup
            ? <HardwareIcon color={isDifficult ? 'error' : 'inherit' } />
            : <ClearIcon color='error'/>
            }
          </IconButton>
        </Tooltip>
        <Tooltip sx={{mb: {xs: 1, md: 0}}} arrow placement="left" title="View statistics">
          <IconButton color={isStatistics ? 'info' : 'default' } component="span" onClick={() => setIsOpenStatistic(true)}>
            <LeaderboardIcon />
          </IconButton>
        </Tooltip>
      </Box>}
    </Card>
    </Grid>
    <StatisticOneWord isOpenStatistic={isOpenStatistic} setIsOpenStatistic={setIsOpenStatistic} word={word} />
    </>
  )
}

export default CardItem