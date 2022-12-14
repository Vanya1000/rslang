import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

import { resetGame } from '../../../store/gameSlice';
import { useAppDispatch } from '../../../hooks/hooks';
import { GameType } from '../../../types/type';

import { getGameRoute } from './common';

import './GamePage.css';


const GamePage = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const startGame = (game: GameType) => {
    dispatch(resetGame());
    navigate(getGameRoute(game));
  }

  return (
    <div className='game__wrapper'>
      <div className='game__content'>
        <Typography variant="h4" component="h2" align='center'>
          Choose game
        </Typography>
        <div className='game__buttons'>
          <button className='game__button' onClick={() => {
            startGame('sprint');
            }}>Sprint</button>
          <button className='game__button' onClick={() => {
            startGame('audioChallenge');
            }}>Audio challenge</button>
        </div>
      </div>
    </div>
  )
}

export default GamePage;