import '../Game.css';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectGameGroup, selectIsFetching } from '../../../../store/gameSlice';
import AudioChallengeCard from './AudioChallengeCard';
import { CircularProgress } from '@mui/material';
import { selectProgress } from '../../../../store/gameSlice';
import CircularProgressWithLabel from '../CircularProgressWithLabel';
import { useState } from 'react';
import AudioChallengeGroup from './AudioChallengeGroup';

const AudioChallenge = () => {
  const [isEnd, setEnd] = useState(false);

  const isFetching = useAppSelector(selectIsFetching);
  const progress = useAppSelector(selectProgress);
  const gameGroup = useAppSelector(selectGameGroup);

  if (isFetching) {
    return (
      <div className="audio-challenge__game">
        <CircularProgress size="4rem" className="game__progress" color="info" thickness={2}/>
      </div>
    );
  } else if (gameGroup === null) {
    return (
      <AudioChallengeGroup />
    );
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
};

export default AudioChallenge;
