import '../Game.css';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectCurrentPage, selectIsFetching } from '../../../../store/gameSlice';
import AudioChallengeCard from './AudioChallengeCard';
import { CircularProgress } from '@mui/material';
import { selectProgress } from '../../../../store/gameSlice';
import CircularProgressWithLabel from '../CircularProgressWithLabel';
import { useState } from 'react';
import AudioChallengeLevel from './AudioChallengeLevel';

const AudioChallenge = () => {
  const isFetching = useAppSelector(selectIsFetching);
  const progress = useAppSelector(selectProgress);
  const currentGamePage = useAppSelector(selectCurrentPage);

  const [isEnd, setEnd] = useState(false);

  if (isFetching) {
    return <div className="audio-challenge__game">
      <CircularProgress size="4rem" className="game__progress" color="info" thickness={2}/>
    </div>;
  } else {
    if (!currentGamePage) {
      return <AudioChallengeLevel />
    } else {
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
    }
  }
};

export default AudioChallenge;
