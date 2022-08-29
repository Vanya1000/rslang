import { WordType } from "../../../../types/type";
import volume from "../../../../assets/images/volume.png";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { selectCurrentWordIndex, setCurrentWordIndex, addAnswer } from "../../../../store/audioChallengeSlice";
import { selectGameWords } from "../../../../store/gameSlice";
import rightAudioPath from '../../../../assets/audio/right.mp3';
import mistakeAudioPath from '../../../../assets/audio/mistake.mp3';
import successAudioPath from '../../../../assets/audio/success.mp3';
import AudioChallengeResults from "./AudioChallengeResults";

const baseUrl = process.env.REACT_APP_API_URL;

const AudioChallengeCard = () => {
  const [isAnswered, setIsAnswered] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [rightAnswer, setRightAnswer] = useState<number | null>(null);
  const [wrongAnswer, setWrongAnswer] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const words = useAppSelector(selectGameWords);
  const currentWordIndex = useAppSelector(selectCurrentWordIndex);

  const dispatch = useAppDispatch();

  useEffect(() => {
    playWordAudio();

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
    setIsAnswered(false);
    setRightAnswer(null);
    setWrongAnswer(null);
  }, [currentWordIndex]);

  const shuffle = (array: WordType[] | string[]) => {
    array.sort(() => Math.random() - 0.5);
    return array;
  };

  const displayRightAnswer = () => {
    const rightAnswerIndex = options.findIndex((option) => option === words[currentWordIndex].wordTranslate);
    setRightAnswer(rightAnswerIndex);
  }

  const checkAnswer = (optionIndex: number) => {
    if (!isAnswered) {
      if (words[currentWordIndex].wordTranslate === options[optionIndex]) {
        setRightAnswer(optionIndex);
        dispatch(addAnswer({wordId: words[currentWordIndex].id, status: 'right'}));
        playAudio(rightAudioPath);
      } else {
        setWrongAnswer(optionIndex);
        dispatch(addAnswer({wordId: words[currentWordIndex].id, status: 'wrong'}));
        displayRightAnswer();
        playAudio(mistakeAudioPath);
      }
      setIsAnswered(true);
    }
  }

  const skipAnswer = () => {
    displayRightAnswer();
    setIsAnswered(true);
    dispatch(addAnswer({wordId: words[currentWordIndex].id, status: 'wrong'}));
    playAudio(mistakeAudioPath);
  }

  const playAudio = (path: string) => {
    const audio = new Audio(path);
    audio.play();
  }

  const playWordAudio = () => {
    playAudio(`${baseUrl}${words[currentWordIndex].audio}`);
  }

  const displayNextWord = () => {
    if (currentWordIndex < words.length - 1) {
      dispatch(setCurrentWordIndex());
    } else {
      playAudio(successAudioPath);
      setOpenModal(true);
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
          <img className={`content__volume${isAnswered ? '' : ' content__volume_active'}`} src={volume} alt="" onClick={() => playWordAudio()}/>
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
      <AudioChallengeResults open={openModal} setOpenModal={setOpenModal}/>
    </div>
  );
};

export default AudioChallengeCard;
