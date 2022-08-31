import '../Game.css';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectIsFetching } from '../../../../store/gameSlice';
import AudioChallengeCard from './AudioChallengeCard';
import { CircularProgress } from '@mui/material';
import { selectProgress } from '../../../../store/gameSlice';
import CircularProgressWithLabel from '../CircularProgressWithLabel';
import { useState } from 'react';
import GameLevelButton from '../GameLevelButton';

const AudioChallenge = () => {
  const isFetching = useAppSelector(selectIsFetching);
  const progress = useAppSelector(selectProgress);

  const [isEnd, setEnd] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  if (isFetching) {
    return <div className="audio-challenge__game">
      <CircularProgress size="4rem" className="game__progress" color="info" thickness={2}/>
    </div>;
  } else {
    if (gameStarted) {
      return (
        <div className="audio-challenge__game">
  
          <div className={`game__header${isEnd ? ' invisible' : ''}`}>
            <CircularProgressWithLabel value={progress} game='audioChallenge'/>
            <h2 className="header__title">AUDIO CHALLENGE</h2>
          </div>
  
          <div className="game__main">
             <AudioChallengeCard isEnd={isEnd} setEnd={setEnd}/>
          </div>
  
        </div>
      );
    } else {
      return (
        <div className='audio-challenge'>
          <div className='audio-challenge__wrapper'>
            <h2 className='audio-challenge__title'>Audio challenge</h2>
            <div className='audio-challenge__description' >
              Check your listening skills, trying to pick the right
              meaning after hearing a word.
              Be careful, as you just have one guess.
            </div>
            <div className='level-button__wrapper'>
              {[0, 1, 2, 3, 4, 5].map((index) => <GameLevelButton index={index} key={index} setGameStarted={setGameStarted}/>)}
            </div>
          </div>
        </div>
      )
    }
  }
};

export default AudioChallenge;
