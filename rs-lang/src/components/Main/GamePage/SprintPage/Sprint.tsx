import '../Game.css';
import CircularProgressWithLabel from '../CircularProgressWithLabel';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { playAgain, selectGameGroup, selectIsFetching } from '../../../../store/gameSlice';
import { CircularProgress } from '@mui/material';
import SprintCard from './SprintCard';
import { useEffect, useState } from 'react';
import successAudioPath from '../../../../assets/audio/success.mp3';
import { playAudio } from '../common';
import SprintGroup from './SprintGroup';
import GameResults from '../GameResults';

const Sprint = () => {
  const [isEnd, setEnd] = useState(false);
  const [timer, setTimer] = useState(60);
  const [series, setSeries] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [bonus, setBonus] = useState<number>(10);
  const [bonusProgress, setBonusProgress] = useState<number>(0);

  const isFetching = useAppSelector(selectIsFetching);
  const gameGroup = useAppSelector(selectGameGroup);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (timer === 0) {
      setEnd(true);
      playAudio(successAudioPath);
    } else {
      setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
  }, [timer]);

  const backToGame = () => {
    setSeries(0);
    setBonusProgress(0);
    setBonus(10);
    setPoints(0);
    setTimer(60);
    setEnd(false);
    dispatch(playAgain());
  }

  if (isFetching) {
    return (
      <div className="sprint__game">
        <CircularProgress size="4rem" className="game__progress" color="info" thickness={2}/>
      </div>
    );
  } else if (gameGroup === null) {
    return (
      <SprintGroup />
    );
  } else {
    if (isEnd) {
      return (
        <div className="sprint__game">
          <GameResults open={isEnd} setEnd={setEnd} backToGame={backToGame}/>
        </div>
      )
    } else {
      return (
        <div className="sprint__game">
          <div className={`game__header${isEnd ? ' invisible' : ''}`}>
            <CircularProgressWithLabel value={timer} game="sprint" />
            <h2 className="header__title">SPRINT</h2>
          </div>
          <div className="game__main">
            <SprintCard 
              setEnd={setEnd}
              setTimer={setTimer}
              series={series}
              setSeries={setSeries}
              points={points}
              setPoints={setPoints}
              bonus={bonus}
              setBonus={setBonus}
              bonusProgress={bonusProgress}
              setBonusProgress={setBonusProgress}
            />
          </div>
        </div>
      );
    }
  }
};

export default Sprint;
