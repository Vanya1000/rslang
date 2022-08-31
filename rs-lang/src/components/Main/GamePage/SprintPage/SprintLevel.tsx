import GameLevelButton from "../GameLevelButton";
import '../Game.css';

const SprintLevel = () => {
  return (
    <div className='sprint'>
      <div className='sprint__wrapper'>
        <h2 className='sprint__title'>Sprint</h2>
        <div className='sprint__description' >
          Check how much points you can get in one minute,
          making educated guesses about what is right and what is wrong.
        </div>
        <div className='level-button__wrapper'>
          {[0, 1, 2, 3, 4, 5].map((index) => <GameLevelButton index={index} key={index}/>)}
        </div>
      </div>
    </div>
    )
}

export default SprintLevel;