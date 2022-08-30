import { Modal } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { playAgain, selectAnswers } from "../../../store/gameSlice";
import { selectCurrentGame, selectGameWords, setWords } from "../../../store/gameSlice";
import { WordType } from "../../../types/type";
import { useNavigate } from 'react-router-dom';
import GameWord from "./GameWord";

export type StatisticsType = {
  rightAnswers: WordType[];
  wrongAnswers: WordType[];
  rightAnswersInRow: number;
}

const AudioChallengeResults = (props: {open: boolean, setEnd: React.Dispatch<React.SetStateAction<boolean>>, setTimer?: React.Dispatch<React.SetStateAction<number>> | null}) => {
  const words = useAppSelector(selectGameWords);
  const answers = useAppSelector(selectAnswers);
  const game = useAppSelector(selectCurrentGame);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const shuffle = (array: WordType[]) => {
    const shuffled = array.slice().sort(() => Math.random() - 0.5);
    return shuffled;
  };

  const calculateStatistics = () => {
    const statistics: StatisticsType = {
      rightAnswers: [],
      wrongAnswers: [],
      rightAnswersInRow: 0,
    };

    let rightAnswersInRow = 0;

    for (let answer of answers) {
      const word = words.find((item) => item.id === answer.wordId)!;
      switch (answer.status) {
        case 'right':
          statistics.rightAnswers.push(word);
          rightAnswersInRow++;
          statistics.rightAnswersInRow = Math.max(statistics.rightAnswersInRow, rightAnswersInRow);
          break;
        case 'wrong':
          statistics.wrongAnswers.push(word);
          rightAnswersInRow = 0;
          break;
      }
    }
    return statistics;
  }

  const backToGame = () => {
    if (game === 'audioChallenge') {
      props.setEnd(false);
      dispatch(playAgain());
      dispatch(setWords(shuffle(words)));
    } else {
      // props.setTimer(60);
      props.setEnd(false);
    }
  }

  const backToGames = () => {
    props.setEnd(false);
    dispatch(playAgain());
    navigate('/game');
  }

  const backToTextbook = () => {
    props.setEnd(false);
    dispatch(playAgain());
    navigate('/book');
  }

  const statistics = calculateStatistics();

    return (
        <Modal hideBackdrop={true} open={props.open}>
          <div className="statistics">

            <h2 className="statistics__title">RESULTS</h2>

            <div className="statistics__buttons">
              <button className="statistics__button" onClick={() => backToGame()}>PLAY AGAIN</button>
              <button className="statistics__button" onClick={() => backToGames()}>BACK TO GAMES</button>
              <button className="statistics__button" onClick={() => backToTextbook()}>BACK TO TEXTBOOK</button>
            </div>

            <div className="statistics__wrapper">
              <ul className="statistics__answers">
                <li className="statistics__item_right"><p>RIGHT ANSWERS:</p><span className="statistics__answers_right">{statistics.rightAnswers.length}</span></li>
                <li className="statistics__item_wrong"><p>WRONG ANSWERS:</p><span className="statistics__answers_wrong">{statistics.wrongAnswers.length}</span></li>
                <li className="statistics__item_row"><p>IN A ROW:</p><span className="statistics__answers_row">{statistics.rightAnswersInRow}</span></li>
              </ul>

              <div className="statistics__accuracy">
                <p>ACCURACY</p>
                <p className="accuracy__number">{statistics.rightAnswers.length / words.length * 100}%</p>
              </div>
            </div>

            <div className="statistics__words">
              <h3>{statistics.rightAnswers.length === 0 ? '' : 'RIGHT ANSWERS'}</h3>
              {statistics.rightAnswers.map((answer) => <GameWord answer={answer} key={answer.id}/>)}

               <h3>{statistics.wrongAnswers.length === 0 ? '' : 'WRONG ANSWERS'}</h3>
              {statistics.wrongAnswers.map((answer) => <GameWord answer={answer} key={answer.id}/>)}
            </div>

          </div>
        </Modal>
    )
}

export default AudioChallengeResults;