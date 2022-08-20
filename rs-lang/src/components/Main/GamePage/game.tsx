import React from 'react'
import s from './Game.module.css'

const GamePage = () => {
  const levelBtnColor = ['#FEFE41', '#94FE32', '#2DFE3E', '#44A4DE', '#3734DE', '#DE1600']
  const buttonNumber = [1, 2, 3, 4, 5, 6]
  const [isChosen, setChose] = React.useState(false)
  const [isSprint, setSprint] = React.useState(true)
  const [isAudio, setAudio] = React.useState(false)

  const sprintGameClick = () => {
    setChose(true)
    setSprint(true)
  }
  const audioGameClick = () => {
    setChose(true)
    setAudio(true)
  }
  const backGames = () => {
    setChose(false)
    setSprint(false)
    setAudio(false)
  }

  return (
    <>
      <div className={s.wrapper}>
        <div className={isChosen ? `${s.game} ${s.gameShow}` : s.game}>
          <img src="img/sprint.png" alt="" />
          <div className={s.title}>Sprint</div>
          <div className={s.description}>
            Check how much points you can get in one minute,
            making educated guesses about what is right and what is wrong.
          </div>
          <button onClick={sprintGameClick}
            className={`${s.button} ${s.sprintBtn}`}>
            play
          </button>
        </div>
        <div className={isChosen ? `${s.game} ${s.gameShow}` : s.game}>
          <img src="img/audioGame.png" alt="" />
          <div className={s.title}>Audio challenge</div>
          <div className={s.description}>
            Check your listening skills, trying to pick the right
            meaning after hearing a word.
            Be careful, as you just have one guess.
          </div>
          <button onClick={audioGameClick}
            className={`${s.button} ${s.audioBtn}`}>play</button>
        </div>
        {/* sprint game */}
        <div className={isSprint ? `${s.gameWrapper} ${s.sprintShow}` : s.gameWrapper}>
          <div>Sprint</div>
          <div>Select the level</div>
          <div>
            {buttonNumber.map((btn, i) => {
              return (
                <button className={s.selectLvl} style={{ backgroundColor: `${levelBtnColor[i]}` }}>{btn}</button>
              )
            })}
          </div>
          <button onClick={backGames}>BACK TO GAMES</button>
        </div>
        {/* audio game */}
        <div className={isAudio ? `${s.gameWrapper} ${s.audioShow}` : s.gameWrapper}>
          <div>Audio challenge</div>
          <div>Select the level</div>
          <div>
            {buttonNumber.map((btn, i) => {
              return (
                <button className={s.selectLvl} style={{ backgroundColor: `${levelBtnColor[i]}` }}>{btn}</button>
              )
            })}
          </div>
          <button onClick={backGames}>BACK TO GAMES</button>
        </div>


     
      </div>
    </>
  )
}

export default GamePage