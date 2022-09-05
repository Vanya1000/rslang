import React from 'react';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { playAgain, selectGameGroup, selectIsFetching } from '../../../../store/gameSlice';
import GameResults from '../GameResults';

import SprintCard from './SprintCard';
import SprintGroup from './SprintGroup';

import '../Game.css';



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
        <CircularProgress size="4rem" className="game__progress" color="info" thickness={2} />
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
          <GameResults open={isEnd} setEnd={setEnd} backToGame={backToGame} />
        </div>
      )
    } else {
      return (
        <div className="sprint__game">
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
              timer={timer}
            />
          </div>
        </div>
      );
    }
  }
};

export default Sprint;
