import s from './Sprint.module.css'
import React from 'react';
import { CircularProgress } from '@mui/material';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectGameWords, selectIsFetching } from './../../../../store/gameSlice';
import { selectCurrentWordIndex, setCurrentWordIndex } from './../../../../store/audioChallengeSlice';
import { useAppDispatch } from './../../../../hooks/hooks';

const Sprint = () => {
  const [timer, setTimer] = React.useState(60)
  const [isEnd, setEnd] = React.useState(false)

  const dispatch = useAppDispatch();
  const isFetching = useAppSelector(selectIsFetching);
  const words = useAppSelector(selectGameWords);
  const curIndex = useAppSelector(selectCurrentWordIndex);

  // React.useEffect(() => {
  //   if (timer === 0) {
  //     setEnd(true)
  //     return
  //   } else {
  //     setTimeout(() => {
  //       setTimer(timer - 1)
  //     }, 1000)
  //   }
  // }, [timer])
  
const nextWord = () => {

  dispatch(setCurrentWordIndex());
}


  const repeatGame = () => {
    setTimer(60)
    setEnd(false)
  }


  if (isFetching) {
    return <div className={s.loadingWrapper}>
      <div className={s.gameName}>Sprint</div>
      <CircularProgress className={s.loadingWrapper__progress} color="inherit" />
    </div>;
  } else {
    return (
      <>
        {!isEnd && <div>
          <div className={s.gameName}>Sprint</div>
          <div className={s.gameWrapper}>
            <div>0</div>
            <div>+10 points</div>
            <div>circle</div>
            <div className={s.words}>
              <div>{words[curIndex].word}</div>
              <div>perevod</div>
              <div>
                <button onClick={nextWord}>true</button>
                <button onClick={nextWord}>false</button>
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
    );
  }
}
export default Sprint