import './GamePage.css';

import { resetGame, setCurrentGame } from '../../../store/gameSlice';
import { useAppDispatch } from '../../../hooks/hooks';
import { useNavigate } from 'react-router-dom';

const GamePage = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const startGame = (game: string) => {
      dispatch(resetGame());
      dispatch(setCurrentGame(game));
      navigate(`/${game}`);
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
            startGame('audio-challenge');
            }}>Audio challenge</button>
        </div>
      </div>
    </div>
  )
}

export default GamePage;