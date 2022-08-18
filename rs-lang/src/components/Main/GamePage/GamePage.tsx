import React from 'react'
import s from './Game.module.css'

const GamePage = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.game}>
        <img src="img/sprint.png" alt="" />
        <div className={s.title}>Sprint</div>
        <div className={s.description}>
          Check how much points you can get in one minute,
          making educated guesses about what is right and what is wrong.
        </div>
        <button className={`${s.button} ${s.sprintBtn}`}>play</button>
      </div>
      <div className={s.game}>
        <img src="img/audioGame.png" alt="" />
        <div className={s.title}>Audio challenge</div>
        <div className={s.description}>
          Check your listening skills, trying to pick the right
          meaning after hearing a word.
          Be careful, as you just have one guess.
        </div>
        <button className={`${s.button} ${s.audioBtn}`}>play</button>
      </div>
    </div>
  )
}

export default GamePage