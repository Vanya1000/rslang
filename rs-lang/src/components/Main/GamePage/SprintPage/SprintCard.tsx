import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { addAnswer, selectWordIndex, setGameWords, setWordIndex } from '../../../../store/gameSlice';
import { selectGameWords } from '../../../../store/gameSlice';
import rightAudioPath from '../../../../assets/audio/right.mp3';
import mistakeAudioPath from '../../../../assets/audio/mistake.mp3';
import volume from '../../../../assets/images/volume.png';
import { playAudio, playWordAudio, shuffle } from '../common';
import { sendStatistics } from '../../../../store/statisticsSlice';
import { selectUser } from '../../../../store/userSlice';


const SprintCard = (props: {
    setEnd: React.Dispatch<React.SetStateAction<boolean>>,
    setTimer: React.Dispatch<React.SetStateAction<number>>,
    series: number,
    setSeries: React.Dispatch<React.SetStateAction<number>>,
    points: number,
    setPoints: React.Dispatch<React.SetStateAction<number>>,
    bonus: number,
    setBonus: React.Dispatch<React.SetStateAction<number>>,
    bonusProgress: number,
    setBonusProgress: React.Dispatch<React.SetStateAction<number>>
  }) => {
  const [option, setOption] = useState<string>('');
  const [animate, setAnimate] = useState<string | null>('');

  const gameWords = useAppSelector(selectGameWords);
  const wordIndex = useAppSelector(selectWordIndex);
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
    setTimeout(() => setAnimate(null), 700);
  }, [wordIndex]);

  const checkAnswer = (button: string) => {
      const wordId = gameWords[wordIndex].id!;
      if (gameWords[wordIndex].wordTranslate === option && button === 'right' || 
      gameWords[wordIndex].wordTranslate !== option && button === 'wrong') {
        setAnimate('green');
          dispatch(
            addAnswer({ wordId: wordId, status: 'right' })
          );
        if (user) {
          dispatch(sendStatistics({type: 'right', wordId: wordId, game: 'sprint', series: props.series + 1}));
        }
        props.setSeries((prev) => prev + 1);
        playAudio(rightAudioPath);
        props.setPoints((prev) => prev + props.bonus);
        if (props.bonusProgress === 3) {
          props.setBonus((prev) => prev + 10);
          props.setBonusProgress(0);
        } else {
          props.setBonusProgress((prev) => prev + 1);
        }
      } else {
        setAnimate('red');
          dispatch(
            addAnswer({ wordId: gameWords[wordIndex].id!, status: 'wrong' })
          );
        if (user) {
          dispatch(sendStatistics({type: 'wrong', wordId: wordId, game: 'sprint', series: 0}));
        }
        props.setSeries(0);
        playAudio(mistakeAudioPath);
        props.setBonus(10);
        props.setBonusProgress(0);
      }

      if (wordIndex === gameWords.length - 1) {
        const shuffledWords = shuffle(gameWords);
        dispatch(setGameWords(gameWords.concat(shuffledWords)));
      }
      dispatch(setWordIndex());
  };

  return (
    <div className={`sprint__content${animate === 'red' ? ' background_red' : ' '}
    ${animate === 'green' ? ' background_green' : ''}`}>
        <img
        onClick={() => playWordAudio(gameWords, wordIndex)}
        className="sprint__img"
        src={volume}
        alt=""
      />
      <div className="sprint__points">{props.points}</div>
      <div className="sprint__bonus">{props.bonusProgress === 0 ? `+${props.bonus} points` : ''}</div>
      <div className="sprint__circles">
        <div className={`sprint__circle${props.bonusProgress >= 1 ? ' sprint__circle_active' : ''}`}></div>
        <div className={`sprint__circle${props.bonusProgress >= 2 ? ' sprint__circle_active' : ''}`}></div>
        <div className={`sprint__circle${props.bonusProgress === 3 ? ' sprint__circle_active' : ''}`}></div>
      </div>
      <div className="sprint__container">
        <div className="sprint__word">{gameWords[wordIndex].word}</div>
        <div className="sprint__translation">{option}</div>
        <div className="sprint__buttons">
          <button className="sprint__button_right" onClick={() => checkAnswer('right')}>RIGHT</button>
          <button className="sprint__button_wrong" onClick={() => checkAnswer('wrong')}>WRONG</button>
        </div>
      </div>
    </div>
  );
};

export default SprintCard;
