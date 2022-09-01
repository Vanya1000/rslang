import { PAGES_PER_GROUP } from "../../../constants/constants";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { fetchGameWords, selectGame, setGameGroup, setGamePage } from "../../../store/gameSlice";

const GameGroupButton = (props: { group: number }) => {
  const game = useAppSelector(selectGame);

  const dispatch = useAppDispatch();

  const startGame = () => {
    dispatch(setGameGroup(props.group));
    let page = Math.floor(Math.random() * PAGES_PER_GROUP);
    if (game === 'sprint') {
      for (let i = 0; i < PAGES_PER_GROUP; i++) {
        if (page === 0) {
          page = 29;
        }
        dispatch(setGamePage(page--));
        dispatch(fetchGameWords());
      }
    } else {
      dispatch(setGamePage(page));
      dispatch(fetchGameWords());
    }
  }

  return (
    <button className='level-button'
      onClick={() => startGame()} >{props.group + 1}
    </button>
  );
}

export default GameGroupButton;
