import './GamePage.css';

import { resetGame, setGame } from '../../../store/gameSlice';
import { useAppDispatch } from '../../../hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { GameType } from '../../../types/type';
import { getGameRoute } from './common';

const GamePage = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const startGame = (game: GameType) => {
    dispatch(resetGame());
    dispatch(setGame({ game, isFromBook: false }));
    navigate(getGameRoute(game));
  }

  return (
    <div className='game__wrapper'>
      <div className='game__content'>
        <div className='game__title'>Choose game</div>
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