import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { fetchGameWords, selectCurrentGame, setCurrentGameGroup, setCurrentGamePage } from "../../../store/gameSlice";

const GameLevelButton = (props: { index: number }) => {

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const currentGame = useAppSelector(selectCurrentGame);

  const startGame = () => {
    const page = Math.floor(Math.random() * 30);
    dispatch(setCurrentGamePage(page));
    dispatch(fetchGameWords());
    if (currentGame === 'sprint') {
      navigate('/sprint');
    } else {
      navigate('/audio-challenge');
    }
  }

    return (
      <button className='level-button'
        onClick={() => {
          dispatch(setCurrentGameGroup(props.index));
          startGame();
        }} >{props.index + 1}
      </button>
    )
}

export default GameLevelButton;