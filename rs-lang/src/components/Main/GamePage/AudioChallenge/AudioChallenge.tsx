import '../Game.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { playAgain, selectGameGroup, selectGameWords, selectIsFetching, setGameWords } from '../../../../store/gameSlice';
import AudioChallengeCard from './AudioChallengeCard';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import AudioChallengeGroup from './AudioChallengeGroup';
import GameResults from '../GameResults';
import { shuffle } from '../common';

const AudioChallenge = () => {
  const [isEnd, setEnd] = useState(false);
  const [series, setSeries] = useState<number>(0);

  const isFetching = useAppSelector(selectIsFetching);
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
          <div className="game__main">
            <AudioChallengeCard setEnd={setEnd} series={series} setSeries={setSeries} />
          </div>
        </div>
      );
    }
  }
};

export default AudioChallenge;
