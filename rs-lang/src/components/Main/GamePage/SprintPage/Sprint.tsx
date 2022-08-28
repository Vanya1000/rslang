import s from './Sprint.module.css'
import React from 'react';

const Sprint = () => {
  const [timer, setTimer] = React.useState(60)
  const [isEnd, setEnd] = React.useState(false)

  React.useEffect(() => {
    if (timer === 0) {
      setEnd(true)
      return
    } else {
      setTimeout(() => {
        setTimer(timer - 1)
      }, 1000)
    }
  }, [timer])

  const repeatGame = () => {
    setTimer(60)
    setEnd(false)
  }

  return (
    <>
      {!isEnd && <div>
        <div className={s.gameName}>Sprint</div>
        <div className={s.gameWrapper}>
          <div>0</div>
          <div>+10 points</div>
          <div>circle</div>
          <div className={s.words}>
            <div>word</div>
            <div>perevod</div>
            <div>
              <button>true</button>
              <button>false</button>
            </div>
          </div>
          <div>{timer}</div>
        </div>
      </div>
      }
      {isEnd && <div>
        <div className={s.gameName}>Sprint</div>
        <div>game over</div>
        <button onClick={repeatGame}>repeat</button>
      </div>
      }
    </>
  )
}
export default Sprint