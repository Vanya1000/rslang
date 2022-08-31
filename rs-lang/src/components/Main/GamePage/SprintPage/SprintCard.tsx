import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { addAnswer, playAgain, selectWordIndex, setWordIndex } from '../../../../store/gameSlice';
import { fetchGameWords, selectGamePage, selectGameWords, setGamePage } from '../../../../store/gameSlice';
import GameResults from '../GameResults';
import rightAudioPath from '../../../../assets/audio/right.mp3';
import mistakeAudioPath from '../../../../assets/audio/mistake.mp3';
import volume from '../../../../assets/images/volume.png';
import { playAudio, playWordAudio, shuffle } from '../common';
import { sendStatistics } from '../../../../store/statisticsSlice';
import { selectUser } from '../../../../store/userSlice';


const SprintCard = (props: { isEnd: boolean, setEnd: React.Dispatch<React.SetStateAction<boolean>>, setTimer: React.Dispatch<React.SetStateAction<number>> }) => {
  const [option, setOption] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [points, setPoints] = useState<number>(0);
  const [bonus, setBonus] = useState<number>(10);
  const [bonusProgress, setBonusProgress] = useState<number>(0);
  const [animate, setAnimate] = useState<string | null>('');
  const [series, setSeries] = useState<number>(0);

  const gameWords = useAppSelector(selectGameWords);
  const wordIndex = useAppSelector(selectWordIndex);
  const gamePage = useAppSelector(selectGamePage);
  const user = useAppSelector(selectUser);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const array: string[] = [];
    array.push(gameWords[wordIndex].wordTranslate);
    while (array.length < 2) {
      const index = Math.floor(Math.random() * gameWords.length);
      if (!array.includes(gameWords[index].wordTranslate)) {
        array.push(gameWords[index].wordTranslate);
      }
    }
    const shuffled = shuffle(array);

    setOption(shuffled[0]);
    setIsAnswered(false);
    setTimeout(() => setAnimate(null), 700);
  }, [wordIndex]);

  const addGameWords = () => {
    const page = Math.floor(Math.random() * 30);
    let isNewPage = false;
    while (!isNewPage) {
      if (page !== gamePage) {
        dispatch(setGamePage(page));
        dispatch(fetchGameWords());
        isNewPage = true;
      }
    }
  }

  const checkAnswer = (button: string) => {
    if (!isAnswered) {
      const wordId = gameWords[wordIndex].id!;
      if (gameWords[wordIndex].wordTranslate === option && button === 'right' || 
      gameWords[wordIndex].wordTranslate !== option && button === 'wrong') {
        setAnimate('green');
        dispatch(
          addAnswer({ wordId: wordId, status: 'right' })
        );
        if (user) {
          dispatch(sendStatistics({type: 'right', wordId: wordId, game: 'sprint', series: series + 1}));
        }
        setSeries((prev) => prev + 1);
        playAudio(rightAudioPath);
        setPoints((prev) => prev + bonus);
        if (bonusProgress === 3) {
          setBonus((prev) => prev + 10);
          setBonusProgress(0);
        } else {
          setBonusProgress((prev) => prev + 1);
        }
      } else {
        setAnimate('red');
        dispatch(
          addAnswer({ wordId: gameWords[wordIndex].id!, status: 'wrong' })
        );
        if (user) {
          dispatch(sendStatistics({type: 'wrong', wordId: wordId, game: 'sprint', series: 0}));
        }
        setSeries(0);
        playAudio(mistakeAudioPath);
        setBonus(10);
        setBonusProgress(0);
      }

      setIsAnswered(true);

      if (wordIndex === gameWords.length - 1) {
        addGameWords();
      }

      dispatch(setWordIndex());
    }
  };

  const backToGame = () => {
    setSeries(0);
    setBonusProgress(0);
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
        onClick={() => playWordAudio(gameWords, wordIndex)}
        className="sprint__img"
        src={volume}
        alt=""
      />
      <div className="sprint__points">{points}</div>
      <div className="sprint__bonus">+{bonus} points</div>
      <div className="sprint__circles">
        <div className={`sprint__circle${bonusProgress >= 1 ? ' sprint__circle_active' : ''}`}></div>
        <div className={`sprint__circle${bonusProgress >= 2 ? ' sprint__circle_active' : ''}`}></div>
        <div className={`sprint__circle${bonusProgress === 3 ? ' sprint__circle_active' : ''}`}></div>
      </div>
      <div className="sprint__container">
        <div className="sprint__word">{gameWords[wordIndex].word}</div>
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
