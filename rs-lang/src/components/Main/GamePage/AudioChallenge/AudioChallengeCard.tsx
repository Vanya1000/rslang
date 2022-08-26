import { WordType } from "../../../../types/type";
import volume from "../../../../assets/images/volume.png";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { selectCurrentWordIndex, selectProgress, setCurrentWordIndex, setProgress } from "../../../../store/audioChallengeSlice";
import { selectGameWords } from "../../../../store/gameSlice";
import rightAudioPath from '../../../../assets/audio/right.mp3';
import mistakeAudioPath from '../../../../assets/audio/mistake.mp3';
import successAudioPath from '../../../../assets/audio/success.mp3';

const baseUrl = process.env.REACT_APP_API_URL;

const AudioChallengeCard = () => {
  const [canGoNext, setCanGoNext] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [rightAnswer, setRightAnswer] = useState<number | null>(null);
  const [wrongAnswer, setWrongAnswer] = useState<number | null>(null);

  const words = useAppSelector(selectGameWords);
  const currentWordIndex = useAppSelector(selectCurrentWordIndex);
  const progress = useAppSelector(selectProgress);

  const dispatch = useAppDispatch();

  const shuffle = (array: WordType[] | string[]) => {
    array.sort(() => Math.random() - 0.5);
    return array;
  };

  const displayRightAnswer = () => {
    const rightAnswerIndex = options.findIndex((option) => option === words[currentWordIndex].wordTranslate);
    setRightAnswer(rightAnswerIndex);
  }

  const checkAnswer = (optionIndex: number) => {
    if (!canGoNext) {
      if (words[currentWordIndex].wordTranslate === options[optionIndex]) {
        setRightAnswer(optionIndex);
        playAudio(rightAudioPath);
      } else {
        playAudio(mistakeAudioPath);
        setWrongAnswer(optionIndex);
        displayRightAnswer();
      }
      dispatch(setProgress(progress + 5));
      setIsAnswered(true);
      setCanGoNext(true);
    }
  }

  const playAudio = (path: string) => {
    const audio = new Audio(path);
    audio.play();
  }

  useEffect(() => {
    playAudio(`${baseUrl}${words[currentWordIndex].audio}`);
    const array: string[] = [];
    array.push(words[currentWordIndex].wordTranslate);
    while (array.length < 4) {
      const index = Math.floor(Math.random() * 20);
      if (!array.includes(words[index].wordTranslate)) {
        array.push(words[index].wordTranslate);
      }
    }
    shuffle(array);
    setOptions(array);
  }, [currentWordIndex]);

  const displayNextWord = () => {
    if (currentWordIndex < 19) {
      dispatch(setCurrentWordIndex(currentWordIndex + 1));
      setCanGoNext(false);
      setIsAnswered(false);
      setRightAnswer(null);
      setWrongAnswer(null);
    }
  }

  return (
    <div className="audio-challenge__content">
      <div className="content__container">
        <img
          className={`content__image${isAnswered ? '' : ' invisible'}`}
          src={`${baseUrl}${words[currentWordIndex].image}`}
          alt=""
        />
        <div className="content__wrapper">
          <img className={`content__volume${isAnswered ? '' : ' content__volume_active'}`} src={volume} alt="" onClick={() => playAudio(`${baseUrl}${words[currentWordIndex].audio}`)}/>
          <span className={`content__word${isAnswered ? '' : ' invisible'}`}>{words[currentWordIndex].word}</span>
        </div>
      </div>

      <ul className="content__list">
        <li className={
          `list__item${isAnswered ? ' list__item_inactive' : ''}${rightAnswer === 0 ? ' list__item_green': ''}${wrongAnswer === 0 ? ' list__item_red': ''}`
          } onClick={() => checkAnswer(0)}>{options[0]}</li>
        <li className={
          `list__item${isAnswered ? ' list__item_inactive' : ''}${rightAnswer === 1 ? ' list__item_green': ''}${wrongAnswer === 1 ? ' list__item_red': ''}`
          } onClick={() => checkAnswer(1)}>{options[1]}</li>
        <li className={
          `list__item${isAnswered ? ' list__item_inactive' : ''}${rightAnswer === 2 ? ' list__item_green': ''}${wrongAnswer === 2 ? ' list__item_red': ''}`
          } onClick={() => checkAnswer(2)}>{options[2]}</li>
        <li className={
          `list__item${isAnswered ? ' list__item_inactive' : ''}${rightAnswer === 3 ? ' list__item_green': ''}${wrongAnswer === 3 ? ' list__item_red': ''}`
          } onClick={() => checkAnswer(3)}>{options[3]}</li>
      </ul>
      <button
        className={`content__button${canGoNext ? " invisible" : ""}`}
        onClick={() => {
          displayRightAnswer();
          setIsAnswered(true);
          setCanGoNext(true);
          playAudio(mistakeAudioPath);
          dispatch(setProgress(progress + 5));
        }}
      >
        I DON'T KNOW
      </button>
      <button
        className={`content__button${canGoNext ? "" : " invisible"}`}
        onClick={() => displayNextWord()}
      >
        NEXT
      </button>
    </div>
  );
};

export default AudioChallengeCard;
