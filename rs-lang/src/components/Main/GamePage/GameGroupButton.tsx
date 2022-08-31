import { useAppDispatch } from "../../../hooks/hooks";
import { fetchGameWords, setGameGroup, setGamePage } from "../../../store/gameSlice";

const GameGroupButton = (props: { group: number }) => {

  const dispatch = useAppDispatch();

  const startGame = () => {
    const page = Math.floor(Math.random() * 30);
    dispatch(setGameGroup(props.group));
    dispatch(setGamePage(page));
    dispatch(fetchGameWords());
  }

  return (
    <button className='level-button'
      onClick={() => startGame()} >{props.group + 1}
    </button>
  );
}

export default GameGroupButton;
