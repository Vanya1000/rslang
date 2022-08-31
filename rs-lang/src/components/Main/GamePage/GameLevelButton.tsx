import { useAppDispatch } from "../../../hooks/hooks";
import { setCurrentPage } from "../../../store/bookSlice";
import { fetchGameWords, resetGame, setCurrentGroup } from "../../../store/gameSlice";

const GameLevelButton = (props: { index: number, setGameStarted: React.Dispatch<React.SetStateAction<boolean>> }) => {

  const dispatch = useAppDispatch();

  const startAudioChallenge = () => {
    dispatch(resetGame());
    const page = Math.floor(Math.random() * 30);
    dispatch(setCurrentPage(page));
    dispatch(fetchGameWords());
  }

    return (
      <button className='level-button'
        onClick={() => {
          dispatch(setCurrentGroup(props.index));
          startAudioChallenge();
          props.setGameStarted(true);
        }} >{props.index + 1}
      </button>
    )
}

export default GameLevelButton;