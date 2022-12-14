import { useEffect, useState } from 'react';

import volume from '../../../../assets/images/volume.png';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
  selectWordIndex,
  setWordIndex,
  addAnswer,
  selectProgress
} from '../../../../store/gameSlice';
import { selectGameWords } from '../../../../store/gameSlice';
import rightAudioPath from '../../../../assets/audio/right.mp3';
import mistakeAudioPath from '../../../../assets/audio/mistake.mp3';
import successAudioPath from '../../../../assets/audio/success.mp3';
import { sendStatistics } from '../../../../store/statisticsSlice';
import { additionalWords, playAudio, playWordAudio, shuffle } from '../common';
import { selectUser } from '../../../../store/userSlice';
import CircularProgressWithLabel from '../CircularProgressWithLabel';

import KeyboardFrame from './KeyboardFrame/KeyboardFrame';

const baseUrl = process.env.REACT_APP_API_URL;

const AudioChallengeCard = (props: { setEnd: React.Dispatch<React.SetStateAction<boolean>>, series: number, setSeries: React.Dispatch<React.SetStateAction<number>> }) => {
  const [options, setOptions] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [rightAnswer, setRightAnswer] = useState<number | null>(null);
  const [wrongAnswer, setWrongAnswer] = useState<number | null>(null);
  const [animate, setAnimate] = useState<string | null>('');

  const gameWords = useAppSelector(selectGameWords);
  const wordIndex = useAppSelector(selectWordIndex);
  const user = useAppSelector(selectUser);
  const progress = useAppSelector(selectProgress);

  const dispatch = useAppDispatch();

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => {
      document.removeEventListener('keydown', onKeydown);
    };
  }, [options]);


  useEffect(() => {
    playWordAudio(gameWords, wordIndex);

    const array: string[] = [];
    array.push(gameWords[wordIndex].wordTranslate);
    while (array.length < 4) {
      if (gameWords.length < 4) {
        const index = Math.floor(Math.random() * additionalWords.length);
        if (!array.includes(additionalWords[index])) {
          array.push(additionalWords[index]);
        }
      } else {
        const index = Math.floor(Math.random() * gameWords.length);
        if (!array.includes(gameWords[index].wordTranslate)) {
          array.push(gameWords[index].wordTranslate);
        }
      }
    }
    const shuffled = shuffle(array);

    setOptions(shuffled);
    setIsAnswered(false);
    setRightAnswer(null);
    setWrongAnswer(null);
    setAnimate(null);
  }, [wordIndex]);

  const displayRightAnswer = () => {
    const rightAnswerIndex = options.findIndex(
      (option) => option === gameWords[wordIndex].wordTranslate
    );
    setRightAnswer(rightAnswerIndex);
  };

  const checkAnswer = (optionIndex: number) => {
    if (!isAnswered) {
      let wordId;
      if (user) {
        wordId = gameWords[wordIndex]._id!;
      } else {
        wordId = gameWords[wordIndex].id!;
      }
      if (gameWords[wordIndex].wordTranslate === options[optionIndex]) {
        setRightAnswer(optionIndex);
        setAnimate('green');
        dispatch(
          addAnswer({ wordId: wordId, status: 'right' })
        );
        if (user) {
          dispatch(sendStatistics({ type: 'right', wordId: wordId, game: 'audioChallenge', series: props.series + 1 }));
        }
        props.setSeries((prev) => prev + 1);
        playAudio(rightAudioPath);
      } else {
        setWrongAnswer(optionIndex);
        setAnimate('red');
        dispatch(
          addAnswer({ wordId: wordId, status: 'wrong' })
        );
        displayRightAnswer();
        if (user) {
          dispatch(sendStatistics({ type: 'wrong', wordId: wordId, game: 'audioChallenge', series: 0 }));
        }
        props.setSeries(0);
        playAudio(mistakeAudioPath);
      }
      setIsAnswered(true);
    }
  };

  const skipAnswer = () => {
    let wordId;
    if (user) {
      wordId = gameWords[wordIndex]._id!;
    } else {
      wordId = gameWords[wordIndex].id!;
    }
    setAnimate('red');
    dispatch(
      addAnswer({ wordId: wordId, status: 'wrong' })
    );
    displayRightAnswer();
    if (user) {
      dispatch(sendStatistics({ type: 'wrong', wordId: wordId, game: 'audioChallenge', series: 0 }));
    }
    playAudio(mistakeAudioPath);
    setIsAnswered(true);
  };

  const displayNextWord = () => {
    if (wordIndex < gameWords.length - 1) {
      dispatch(setWordIndex());
    } else {
      playAudio(successAudioPath);
      props.setEnd(true);
    }
  };

  let keyDownCount = 0;
  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      playWordAudio(gameWords, wordIndex)
      return;
    }
    if (e.key === ' ') {
      keyDownCount
      ? `${displayNextWord(), keyDownCount = 0}`
      : `${ skipAnswer(), keyDownCount = 1}`
    }
    if ([1, 2, 3, 4].includes(parseInt(e.key))) {
      if (keyDownCount) return;
      checkAnswer(parseInt(e.key) - 1)
      keyDownCount = 1
      return;
    }
  }

  return (
    <div className={`audio-challenge__content${animate === 'red' ? ' background_red' : ' '}
    ${animate === 'green' ? ' background_green' : ''}`}>
      <CircularProgressWithLabel value={progress} game='audioChallenge' />
      <p className='game__title'>
        Audio challenge
      </p>
      <KeyboardFrame />
      <div className="content__container">
        <img
          className={`content__image${isAnswered ? '' : ' invisible'}`}
          src={`${baseUrl}${gameWords[wordIndex].image}`}
          alt=""
        />
        <div className="content__wrapper">
          <img
            className={`content__volume${isAnswered ? '' : ' content__volume_active'
              }`}
            src={volume}
            alt=""
            onClick={() => playWordAudio(gameWords, wordIndex)}
          />
          <span className={`content__word${isAnswered ? '' : ' invisible'}`}>
            {gameWords[wordIndex].word}
          </span>
        </div>
      </div>

      <ul className="content__list">
        <li
          className={`list__item${isAnswered ? ' list__item_inactive' : ''}${rightAnswer === 0 ? ' list__item_green' : ''
            }${wrongAnswer === 0 ? ' list__item_red' : ''}`}
          onClick={() => checkAnswer(0)}
        >
          {options[0]}
        </li>
        <li
          className={`list__item${isAnswered ? ' list__item_inactive' : ''}${rightAnswer === 1 ? ' list__item_green' : ''
            }${wrongAnswer === 1 ? ' list__item_red' : ''}`}
          onClick={() => checkAnswer(1)}
        >
          {options[1]}
        </li>
        <li
          className={`list__item${isAnswered ? ' list__item_inactive' : ''}${rightAnswer === 2 ? ' list__item_green' : ''
            }${wrongAnswer === 2 ? ' list__item_red' : ''}`}
          onClick={() => checkAnswer(2)}
        >
          {options[2]}
        </li>
        <li
          className={`list__item${isAnswered ? ' list__item_inactive' : ''}${rightAnswer === 3 ? ' list__item_green' : ''
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
    </div>
  );
};

export default AudioChallengeCard;
