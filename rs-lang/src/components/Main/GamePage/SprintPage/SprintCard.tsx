import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { addAnswer, selectCurrentWordIndex, setCurrentWordIndex } from "../../../../store/sprintSlice";
import { selectGameWords } from "../../../../store/gameSlice";
import { WordType } from "../../../../types/type";
import rightAudioPath from "../../../../assets/audio/right.mp3";
import mistakeAudioPath from "../../../../assets/audio/mistake.mp3";
import successAudioPath from "../../../../assets/audio/success.mp3";
import volume from "../../../../assets/images/volume.png";

const baseUrl = process.env.REACT_APP_API_URL;

const SprintCard = (props: { isEnd: boolean }) => {
  const [isAnswered, setIsAnswered] = useState(false);
  const [option, setOption] = useState<string>('');
  const [isRightAnswer, setIsRightAnswer] = useState<boolean | null>(null);
  const [points, setPoints] = useState<number>(0);
  const [bonus, setBonus] = useState<number>(10);
  const [answeredInRow, setAnsweredInRow] = useState<number>(0);

  const words = useAppSelector(selectGameWords);
  const currentWordIndex = useAppSelector(selectCurrentWordIndex);

  const dispatch = useAppDispatch();

  const playAudio = (path: string) => {
    const audio = new Audio(path);
    audio.play();
  };

  const playWordAudio = () => {
    playAudio(`${baseUrl}${words[currentWordIndex].audio}`);
  };

  const shuffle = (array: WordType[] | string[]) => {
    const shuffled = array.sort(() => Math.random() - 0.5);
    return shuffled;
  };

  useEffect(() => {
    const array: string[] = [];
    array.push(words[currentWordIndex].wordTranslate);
    while (array.length < 2) {
      const index = Math.floor(Math.random() * 20);
      if (!array.includes(words[index].wordTranslate)) {
        array.push(words[index].wordTranslate);
      }
    }
    shuffle(array);

    setOption(array[0]);
    setIsAnswered(false);
    setIsRightAnswer(null);
  }, [currentWordIndex]);

  const checkAnswer = (button: string) => {
    if (!isAnswered) {
      if (words[currentWordIndex].wordTranslate === option && button === 'right' || 
      words[currentWordIndex].wordTranslate !== option && button === 'wrong') {
        setIsRightAnswer(true);
        dispatch(
          addAnswer({ wordId: words[currentWordIndex].id, status: "right" })
        );
        playAudio(rightAudioPath);
        setPoints((prev) => prev + bonus);
        setAnsweredInRow((prev) => prev + 1);
        if (answeredInRow === 3) {
          setBonus((prev) => prev + 10);
          setAnsweredInRow(0);
        }
      } else {
        setIsRightAnswer(false);
        dispatch(
          addAnswer({ wordId: words[currentWordIndex].id, status: "wrong" })
        );
        playAudio(mistakeAudioPath);
        setBonus(10);
        setAnsweredInRow(0);
      }
      setIsAnswered(true);
      if (currentWordIndex === 19) {
        // words = shuffle(words) as WordType[];
        // dispatch(setCurrentWordIndex(0));
      } else {
        dispatch(setCurrentWordIndex(currentWordIndex + 1));
      }
    }
  };

  return (
    <div className={`game__content sprint__content${props.isEnd ? " invisible" : ""}`}>
        <img
        onClick={() => playWordAudio()}
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
    </div>
  );
};

export default SprintCard;
