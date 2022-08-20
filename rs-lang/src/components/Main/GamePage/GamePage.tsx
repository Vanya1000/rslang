import React from 'react'
import s from './Game.module.css'
import './cube.css';

const GamePage = () => {
  const levelBtnColor = ['#FEFE41', '#94FE32', '#2DFE3E', '#44A4DE', '#3734DE', '#DE1600']
  const buttonNumber = [1, 2, 3, 4, 5, 6]


  let prevClass = ''
  function changeSide(rotation: string) {
    let cube = document.querySelector('.cube');
    if (prevClass) {
      cube!.classList.remove(prevClass);
    }
    cube!.classList.add(`show-${rotation}`)
    prevClass = `show-${rotation}`
  }
  const renderSelectLevel = () => {
    return (
      <div className={s.selectLvlBtnWrapper}>
        {buttonNumber.map((btn, i) => {
          return (
            <button className={s.selectLvlBtn} style={{ backgroundColor: `${levelBtnColor[i]}` }}>{btn}</button>
          )
        })}
      </div>
    )
  }
  return (
    <div className={s.wrapper}>
      <div className="scene">
        <div className="cube">
          <div className="cube__face cube__face--front">
            <div className={s.tittle}>Chose Game</div>
            <img src="img/gameBack1.png" alt="" className={s.mainBackground} />
            <div>
              <button className={s.backBtn} onClick={() => changeSide('top')}>Sprint</button>
              <button className={s.backBtn} onClick={() => changeSide('bottom')}>Audio challenge</button>
            </div>
          </div>
          <div className="cube__face cube__face--back">back</div>
          <div className="cube__face cube__face--right">
            <div className={s.tittle}>Select the Level</div>
            {renderSelectLevel()}
            <button className={s.backBtn} onClick={() => changeSide('front')}>BACK TO GAMES</button>
          </div>
          <div className="cube__face cube__face--left">
            <div className={s.tittle}>Select the Level</div>
            {renderSelectLevel()}
            <button className={s.backBtn} onClick={() => changeSide('front')}>BACK TO GAMES</button>
          </div>
          <div className="cube__face cube__face--top">
            <img src="img/sprint.png" alt="" className={s.gameImg} />
            <div className={s.gameTittle}>Sprint</div>
            <div className={s.description}>
              Check how much points you can get in one minute,
              making educated guesses about what is right and what is wrong.
            </div>
            <div className={s.sprintBtn}>
              <button className={s.backBtn} onClick={() => changeSide('right')}>Select the level</button>
              <button className={s.backBtn} onClick={() => changeSide('front')}>BACK TO GAMES</button>
            </div>
          </div>
          <div className="cube__face cube__face--bottom">
            <img src="img/audioGame.png" alt="" className={s.gameImg} />
            <div className={s.gameTittle} style={{color: '#01DAFE'}}>Audio challenge</div>
            <div className={s.description} style={{color: '#313131'}}>
              Check your listening skills, trying to pick the right
              meaning after hearing a word.
              Be careful, as you just have one guess.
            </div>
            <div className={s.sprintBtn}>
              <button className={s.backBtn} onClick={() => changeSide('left')}>Select the level</button>
              <button className={s.backBtn} onClick={() => changeSide('front')}>BACK TO GAMES</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GamePage