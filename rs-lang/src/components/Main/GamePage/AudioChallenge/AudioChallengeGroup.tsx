import GameGroupButton from '../GameGroupButton';
import '../Game.css';
import { Typography } from '@mui/material';

const AudioChallengeGroup = () => {
  return (
    <div className='audio-challenge'>
      <div className='audio-challenge__wrapper'>
        <Typography variant="h4" component="h2" align='center' sx={{margin: '80px 0 50px 0'}}>
          Audio challenge
        </Typography>
        <div className='audio-challenge__description' >
          Check your listening skills, trying to pick the right
          meaning after hearing a word.
          Be careful, as you just have one guess.
        </div>
        <div className='level-button__wrapper'>
          {[0, 1, 2, 3, 4, 5].map((index) => <GameGroupButton game='audioChallenge' group={index} key={index} />)}
        </div>
      </div>
    </div>
  )
}

export default AudioChallengeGroup;
