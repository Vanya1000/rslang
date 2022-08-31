import { WordType } from '../../../types/type';
import volume from '../../../assets/images/volume.png';
import { playAudio } from './common';

const baseUrl = process.env.REACT_APP_API_URL;

const AudioChallengeWord = (props: { answer: WordType }) => {

  return (
    <div className="statistics__word">
      <img
        onClick={() => playAudio(`${baseUrl}${props.answer.audio}`)}
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
