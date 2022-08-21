import { Box, Card, CardContent, CardMedia, Chip, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { WordType } from '../../../../types/type'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import HardwareIcon from '@mui/icons-material/Hardware';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { useAppSelector } from '../../../../hooks/hooks';
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

type CardItemProps = {
  word: WordType
  isAuth: boolean
  isShowTranslate: boolean
  currentGroup: number
}

const CardItem: React.FC<CardItemProps> = ({word, isAuth, isShowTranslate, currentGroup}) => {
  return (
    <Grid item xs={12} /* sm={6} */ >
      <Card sx={{ display: 'flex', p:1}}>
      <CardMedia
        component="img"
        sx={{ width: 300, minHeight: 250,}}
        image={`${baseUrl}${word.image}`}
        alt="Live from space album cover"
      />

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <CardContent >
          <Chip label={`Lvl ${currentGroup + 1}`} sx={{ bgcolor: `${level[currentGroup]}`}}/>
          <Typography component="h5" variant="h5">
            {word.word} - {word.transcription}
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
          
        </CardContent>
      </Box>

      {isAuth && <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', mr: 2 }}>
        <Tooltip sx={{mb: 1}} arrow placement="left" title='Mark as Learned'>
            <IconButton component="span">
              {true ? <TaskAltIcon /> : <UnpublishedIcon />}
            </IconButton>
          </Tooltip>
        <Tooltip sx={{mb: 1}} arrow placement="left" title="Mark as hard">
          <IconButton color="default" component="span" onClick={() => console.log("111")}>
            {true ? <HardwareIcon /> : <ClearAllIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip arrow placement="left" title="View statistics">
          <IconButton color="default" component="span" onClick={() => console.log("111")}>
            <LeaderboardIcon />
          </IconButton>
        </Tooltip>
      </Box>}
    </Card>
    </Grid>
  )
}

export default CardItem