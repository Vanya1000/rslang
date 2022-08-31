import { WordType } from '../../../types/type';
import volume from '../../../assets/images/volume.png';
const baseUrl = process.env.REACT_APP_API_URL;

const AudioChallengeWord = (props: { answer: WordType }) => {

  const playAudio = (path: string) => {
    const audio = new Audio(path);
    audio.play();
  };

  const playWordAudio = () => {
    playAudio(`${baseUrl}${props.answer.audio}`);
  };

  return (
    <div className="statistics__word">
      <img
        onClick={() => playWordAudio()}
        className="statistics__img"
        src={volume}
        alt=""
      />
      <span className="word">{props.answer.word}</span>
      <span>-</span>
      <span className="word-translate">{props.answer.wordTranslate}</span>
    </div>
  );
};

export default AudioChallengeWord;
