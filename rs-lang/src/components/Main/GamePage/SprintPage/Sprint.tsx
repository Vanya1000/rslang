import '../Game.css';
import CircularProgressWithLabel from '../CircularProgressWithLabel';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectIsFetching } from '../../../../store/gameSlice';
import { CircularProgress } from '@mui/material';
import SprintCard from './SprintCard';
import { useEffect, useState } from 'react';
import successAudioPath from '../../../../assets/audio/success.mp3';
import { playAudio } from '../common';

const Sprint = () => {
  const [isEnd, setEnd] = useState(false);
  const [timer, setTimer] = useState(60);

  const isFetching = useAppSelector(selectIsFetching);

  useEffect(() => {
    if (timer === 0) {
      setEnd(true);
      playAudio(successAudioPath);
      return;
    } else {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
  }, [timer]);

  if (isFetching) {
    return (
      <div className="sprint__game">
        <CircularProgress size="4rem" className="game__progress" color="info" thickness={2}/>
      </div>
    );
  } else {
    return (
      <div className="sprint__game">
        <div className={`game__header${isEnd ? ' invisible' : ''}`}>
          <CircularProgressWithLabel value={timer} game="sprint" />
          <h2 className="header__title">SPRINT</h2>
        </div>
        <div className="game__main">
          <SprintCard isEnd={isEnd} setEnd={setEnd} setTimer={setTimer}/>
        </div>
      </div>
    );
  }
};
export default Sprint;
