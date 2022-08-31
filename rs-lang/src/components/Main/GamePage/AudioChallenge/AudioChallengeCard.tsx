import volume from '../../../../assets/images/volume.png';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
  selectCurrentWordIndex,
  setCurrentWordIndex,
  addAnswer,
  playAgain,
  setWords
} from '../../../../store/gameSlice';
import { selectGameWords } from '../../../../store/gameSlice';
import rightAudioPath from '../../../../assets/audio/right.mp3';
import mistakeAudioPath from '../../../../assets/audio/mistake.mp3';
import successAudioPath from '../../../../assets/audio/success.mp3';
import GameResults from '../GameResults';
import { sendStatistics } from '../../../../store/statisticsSlice';
import { playAudio, playWordAudio, shuffle, shuffleStrings } from '../common';

const baseUrl = process.env.REACT_APP_API_URL;

const AudioChallengeCard = (props: {isEnd: boolean, setEnd: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const [isAnswered, setIsAnswered] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [rightAnswer, setRightAnswer] = useState<number | null>(null);
  const [wrongAnswer, setWrongAnswer] = useState<number | null>(null);
  const [animate, setAnimate] = useState<string | null>('');
  const [series, setSeries] = useState<number>(0);

  const words = useAppSelector(selectGameWords);
  const currentWordIndex = useAppSelector(selectCurrentWordIndex);

  const dispatch = useAppDispatch();

  useEffect(() => {
    playWordAudio(words, currentWordIndex);
    setAnimate(null);

    const array: string[] = [];
    array.push(words[currentWordIndex].wordTranslate);
    while (array.length < 4) {
      const index = Math.floor(Math.random() * 20);
      if (!array.includes(words[index].wordTranslate)) {
        array.push(words[index].wordTranslate);
      }
    }
    shuffleStrings(array);

    setOptions(array);
    setIsAnswered(false);
    setRightAnswer(null);
    setWrongAnswer(null);
  }, [currentWordIndex]);

  const displayRightAnswer = () => {
    const rightAnswerIndex = options.findIndex(
      (option) => option === words[currentWordIndex].wordTranslate
    );
    setRightAnswer(rightAnswerIndex);
  };

  const checkAnswer = (optionIndex: number) => {
    if (!isAnswered) {
      const wordId = words[currentWordIndex].id!;
      if (words[currentWordIndex].wordTranslate === options[optionIndex]) {
        setRightAnswer(optionIndex);
        setAnimate('green');
        dispatch(
          addAnswer({ wordId: wordId, status: 'right' })
        );
        dispatch(sendStatistics({type: 'right', wordId: wordId, game: 'audioChallenge', series: series + 1}));
        setSeries((prev) => prev + 1);
        playAudio(rightAudioPath);
      } else {
        setWrongAnswer(optionIndex);
        setAnimate('red');
        dispatch(
          addAnswer({ wordId: wordId, status: 'wrong' })
        );
        displayRightAnswer();
        dispatch(sendStatistics({type: 'wrong', wordId: wordId, game: 'audioChallenge', series: 0}));
        setSeries(0);
        playAudio(mistakeAudioPath);
      }
      setIsAnswered(true);
    }
  };

  const skipAnswer = () => {
    const wordId = words[currentWordIndex].id!;
    setAnimate('red');
    displayRightAnswer();
    setIsAnswered(true);
    dispatch(
      addAnswer({ wordId: words[currentWordIndex].id!, status: 'wrong' })
    );
    dispatch(sendStatistics({type: 'wrong', wordId: wordId, game: 'audioChallenge', series: 0}));
    playAudio(mistakeAudioPath);
  };

  const displayNextWord = () => {
    if (currentWordIndex < words.length - 1) {
      dispatch(setCurrentWordIndex());
    } else {
      playAudio(successAudioPath);
      props.setEnd(true);
    }
  };

  const backToGame = () => {
    setSeries(0);
    props.setEnd(false);
    dispatch(playAgain());
    dispatch(setWords(shuffle(words)));
  }

  return (
    <div className={`audio-challenge__content${props.isEnd ? ' invisible' : ''}${animate === 'red' ? ' background_red' : ' '}
    ${animate === 'green' ? ' background_green' : ''}`}>
      <div className="content__container">
        <img
          className={`content__image${isAnswered ? '' : ' invisible'}`}
          src={`${baseUrl}${words[currentWordIndex].image}`}
          alt=""
        />
        <div className="content__wrapper">
          <img
            className={`content__volume${
              isAnswered ? '' : ' content__volume_active'
            }`}
            src={volume}
            alt=""
            onClick={() => playWordAudio(words, currentWordIndex)}
          />
          <span className={`content__word${isAnswered ? '' : ' invisible'}`}>
            {words[currentWordIndex].word}
          </span>
        </div>
      </div>

      <ul className="content__list">
        <li
          className={`list__item${isAnswered ? ' list__item_inactive' : ''}${
            rightAnswer === 0 ? ' list__item_green' : ''
          }${wrongAnswer === 0 ? ' list__item_red' : ''}`}
          onClick={() => checkAnswer(0)}
        >
          {options[0]}
        </li>
        <li
          className={`list__item${isAnswered ? ' list__item_inactive' : ''}${
            rightAnswer === 1 ? ' list__item_green' : ''
          }${wrongAnswer === 1 ? ' list__item_red' : ''}`}
          onClick={() => checkAnswer(1)}
        >
          {options[1]}
        </li>
        <li
          className={`list__item${isAnswered ? ' list__item_inactive' : ''}${
            rightAnswer === 2 ? ' list__item_green' : ''
          }${wrongAnswer === 2 ? ' list__item_red' : ''}`}
          onClick={() => checkAnswer(2)}
        >
          {options[2]}
        </li>
        <li
          className={`list__item${isAnswered ? ' list__item_inactive' : ''}${
            rightAnswer === 3 ? ' list__item_green' : ''
          }${wrongAnswer === 3 ? ' list__item_red' : ''}`}
          onClick={() => checkAnswer(3)}
        >
          {options[3]}
        </li>
      </ul>
      <button
        className={`content__button${isAnswered ? ' invisible' : ''}`}
        onClick={() => skipAnswer()}
      >
        I DON'T KNOW
      </button>
      <button
        className={`content__button${isAnswered ? '' : ' invisible'}`}
        onClick={() => displayNextWord()}
      >
        NEXT
      </button>
      <GameResults open={props.isEnd} setEnd={props.setEnd} backToGame={backToGame}/>
    </div>
  );
};

export default AudioChallengeCard;
