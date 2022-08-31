import GameLevelButton from "../GameLevelButton";
import '../Game.css';

const AudioChallengeLevel = () => {
  return (
    <div className='audio-challenge'>
      <div className='audio-challenge__wrapper'>
        <h2 className='audio-challenge__title'>Audio challenge</h2>
        <div className='audio-challenge__description' >
          Check your listening skills, trying to pick the right
          meaning after hearing a word.
          Be careful, as you just have one guess.
        </div>
        <div className='level-button__wrapper'>
          {[0, 1, 2, 3, 4, 5].map((index) => <GameLevelButton index={index} key={index} />)}
        </div>
      </div>
    </div>
  )
}

export default AudioChallengeLevel;