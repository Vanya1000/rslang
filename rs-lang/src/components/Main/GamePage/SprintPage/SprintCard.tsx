import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { addAnswer, playAgain, selectCurrentWordIndex, setCurrentWordIndex } from '../../../../store/gameSlice';
import { fetchGameWords, selectCurrentPage, selectGameWords, setCurrentPage } from '../../../../store/gameSlice';
import GameResults from '../GameResults';
import rightAudioPath from '../../../../assets/audio/right.mp3';
import mistakeAudioPath from '../../../../assets/audio/mistake.mp3';
import volume from '../../../../assets/images/volume.png';
import { playAudio, playWordAudio, shuffleStrings } from '../common';
import { sendStatistics } from '../../../../store/statisticsSlice';


const SprintCard = (props: { isEnd: boolean, setEnd: React.Dispatch<React.SetStateAction<boolean>>, setTimer: React.Dispatch<React.SetStateAction<number>> }) => {
  const [isAnswered, setIsAnswered] = useState(false);
  const [option, setOption] = useState<string>('');
  const [points, setPoints] = useState<number>(0);
  const [bonus, setBonus] = useState<number>(10);
  const [answeredInRow, setAnsweredInRow] = useState<number>(0);
  const [animate, setAnimate] = useState<string | null>('');
  const [series, setSeries] = useState<number>(0);

  const words = useAppSelector(selectGameWords);
  const currentWordIndex = useAppSelector(selectCurrentWordIndex);
  const currentPage = useAppSelector(selectCurrentPage);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => setAnimate(null), 700);

    const array: string[] = [];
    array.push(words[currentWordIndex].wordTranslate);
    while (array.length < 2) {
      const index = Math.floor(Math.random() * 20);
      if (!array.includes(words[index].wordTranslate)) {
        array.push(words[index].wordTranslate);
      }
    }
    shuffleStrings(array);

    setOption(array[0]);
    setIsAnswered(false);
  }, [currentWordIndex]);

  const addGameWords = () => {
    const page = Math.floor(Math.random() * 30);
    let isNewPage = false;
    while (!isNewPage) {
      if (page !== currentPage) {
        dispatch(setCurrentPage(page));
        dispatch(fetchGameWords());
        isNewPage = true;
      }
    }
  }

  const checkAnswer = (button: string) => {
    if (!isAnswered) {
      const wordId = words[currentWordIndex].id!;
      if (words[currentWordIndex].wordTranslate === option && button === 'right' || 
      words[currentWordIndex].wordTranslate !== option && button === 'wrong') {
        setAnimate('green');
        dispatch(
          addAnswer({ wordId: words[currentWordIndex].id!, status: 'right' })
        );
        dispatch(sendStatistics({type: 'right', wordId: wordId, game: 'sprint', series: series + 1}));
        setSeries((prev) => prev + 1);
        playAudio(rightAudioPath);
        setPoints((prev) => prev + bonus);
        setAnsweredInRow((prev) => prev + 1);
        if (answeredInRow === 3) {
          setBonus((prev) => prev + 10);
          setAnsweredInRow(0);
        }
      } else {
        setAnimate('red');
        dispatch(
          addAnswer({ wordId: words[currentWordIndex].id!, status: 'wrong' })
        );
        dispatch(sendStatistics({type: 'wrong', wordId: wordId, game: 'sprint', series: 0}));
        setSeries(0);
        playAudio(mistakeAudioPath);
        setBonus(10);
        setAnsweredInRow(0);
      }
      setIsAnswered(true);
      if (currentWordIndex === 19) {
        addGameWords();
        dispatch(setCurrentWordIndex());
      } else {
        dispatch(setCurrentWordIndex());
      }
    }
  };

  const backToGame = () => {
    setSeries(0);
    setAnsweredInRow(0);
    setBonus(10);
    setPoints(0);
    props.setTimer(60);
    props.setEnd(false);
    dispatch(playAgain());
  }

  return (
    <div className={`sprint__content${props.isEnd ? ' invisible' : ''}${animate === 'red' ? ' background_red' : ' '}
    ${animate === 'green' ? ' background_green' : ''}`}>
        <img
        onClick={() => playWordAudio(words, currentWordIndex)}
        className="sprint__img"
        src={volume}
        alt=""
      />
      <div className="sprint__points">{points}</div>
      <div className="sprint__bonus">+{bonus} points</div>
      <div className="sprint__circles">
        <div className={`sprint__circle${answeredInRow >= 1 ? ' sprint__circle_active' : ''}`}></div>
        <div className={`sprint__circle${answeredInRow >= 2 ? ' sprint__circle_active' : ''}`}></div>
        <div className={`sprint__circle${answeredInRow === 3 ? ' sprint__circle_active' : ''}`}></div>
      </div>
      <div className="sprint__container">
        <div className="sprint__word">{words[currentWordIndex].word}</div>
        <div className="sprint__translation">{option}</div>
        <div className="sprint__buttons">
          <button className="sprint__button_right" onClick={() => checkAnswer('right')}>RIGHT</button>
          <button className="sprint__button_wrong" onClick={() => checkAnswer('wrong')}>WRONG</button>
        </div>
      </div>
      <GameResults open={props.isEnd} setEnd={props.setEnd} backToGame={backToGame}/>
    </div>
  );
};

export default SprintCard;
