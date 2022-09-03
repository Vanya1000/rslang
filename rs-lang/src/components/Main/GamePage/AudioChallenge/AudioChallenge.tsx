import '../Game.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { playAgain, selectGameGroup, selectGameWords, selectIsFetching, setGameWords } from '../../../../store/gameSlice';
import AudioChallengeCard from './AudioChallengeCard';
import { CircularProgress } from '@mui/material';
import { selectProgress } from '../../../../store/gameSlice';
import CircularProgressWithLabel from '../CircularProgressWithLabel';
import { useState } from 'react';
import AudioChallengeGroup from './AudioChallengeGroup';
import GameResults from '../GameResults';
import { shuffle } from '../common';
import KeyboardFrame from './KeyboardFrame/KeyboardFrame';

const AudioChallenge = () => {
  const [isEnd, setEnd] = useState(false);
  const [series, setSeries] = useState<number>(0);

  const isFetching = useAppSelector(selectIsFetching);
  const progress = useAppSelector(selectProgress);
  const gameGroup = useAppSelector(selectGameGroup);
  const gameWords = useAppSelector(selectGameWords);

  const dispatch = useAppDispatch();

  const backToGame = () => {
    setSeries(0);
    setEnd(false);
    dispatch(playAgain());
    dispatch(setGameWords(shuffle(gameWords)));
  }

  if (isFetching) {
    return (
      <div className="audio-challenge__game">
        <CircularProgress size="4rem" className="game__progress" color="info" thickness={2} />
      </div>
    );
  } else if (gameGroup === null) {
    return (
      <AudioChallengeGroup />
    );
  } else {
    if (isEnd) {
      return (
        <div className="audio-challenge__game">
          <GameResults open={isEnd} setEnd={setEnd} backToGame={backToGame} />
        </div>
      )
    } else {
      return (
        <div className="audio-challenge__game">

          <div className='game__header'>
            <CircularProgressWithLabel value={progress} game='audioChallenge' />
            <h2 className="header__title">AUDIO CHALLENGE</h2>
          </div>

          <div className="game__main">
            <AudioChallengeCard setEnd={setEnd} series={series} setSeries={setSeries} />
          </div>
            <KeyboardFrame />
        </div>
      );
    }
  }
};

export default AudioChallenge;
