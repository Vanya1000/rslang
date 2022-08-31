import '../Game.css';
import CircularProgressWithLabel from '../CircularProgressWithLabel';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectIsFetching } from '../../../../store/gameSlice';
import { CircularProgress } from '@mui/material';
import SprintCard from './SprintCard';
import { useEffect, useState } from 'react';
import successAudioPath from '../../../../assets/audio/success.mp3';
import { playAudio } from '../common';
import GameLevelButton from '../GameLevelButton';

const Sprint = () => {
  const [isEnd, setEnd] = useState(false);
  const [timer, setTimer] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);

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
    if (gameStarted) {
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
    } else {
      return (
        <div className='sprint'>
          <div className='sprint__wrapper'>
            <h2 className='sprint__title'>Sprint</h2>
            <div className='sprint__description' >
              Check how much points you can get in one minute,
              making educated guesses about what is right and what is wrong.
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
export default Sprint;
