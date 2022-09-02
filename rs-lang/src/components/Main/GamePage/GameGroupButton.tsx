import { PAGES_PER_GROUP } from "../../../constants/constants";
import { useAppDispatch } from "../../../hooks/hooks";
import { fetchGameWords, setGameGroup, setGamePage } from "../../../store/gameSlice";

const GameGroupButton = (props: { group: number }) => {

  const dispatch = useAppDispatch();

  const startGame = () => {
    dispatch(setGameGroup(props.group));
    const page = Math.floor(Math.random() * PAGES_PER_GROUP);
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
