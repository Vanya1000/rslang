import { PAGES_PER_GROUP } from "../../../constants/constants";
import { useAppDispatch } from "../../../hooks/hooks";
import { fetchGameWords, setGame, setGameGroup, setGamePage } from "../../../store/gameSlice";
import { GameType } from "../../../types/type";

const GameGroupButton = (props: { game: GameType, group: number }) => {

  const dispatch = useAppDispatch();

  const startGame = () => {
    dispatch(setGame({ game: props.game, isFromBook: false }));
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
