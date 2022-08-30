import gameStyles from './Game.module.css';
import './cube.css';

import { fetchGameWords, resetGame, selectCurrentGame, setCurrentGame, setCurrentGroup, setCurrentPage } from '../../../store/gameSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import backgroundImg from '../../../assets/gameImg/background.jpg';
import sprintImg from '../../../assets/gameImg/sprint.png';
import earphonesImg from '../../../assets/gameImg/headphone.png';

const GamePage = () => {
  const levelButtonColors = ['#ffef62', '#ffcd38', '#a2cf6e', '#33ab9f', '#6573c3', '#af52bf'];

  const cubeRef = useRef<HTMLDivElement>(null);
  const prevCubeSide = useRef('');
  const [cubeSide, setCubeSide] = useState('');

  const currentGame = useAppSelector(selectCurrentGame);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const cube = cubeRef.current!;
    if (prevCubeSide.current) {
      cube!.classList.remove(`show-${prevCubeSide.current}`);
    }
    cube!.classList.add(`show-${cubeSide}`);
    prevCubeSide.current = cubeSide;
  }, [cubeSide]);

  const renderSelectLevel = () => {
    return (
      <div className={gameStyles.selectLvlBtnWrapper}>
        {levelButtonColors.map((color, index) => {
          return (
            <button className={gameStyles.selectLvlBtn} style={{ backgroundColor: `${levelButtonColors[index]}`}}
            onClick={() => {
              dispatch(setCurrentGroup(index));
              startGame();
            }} key={color}>{index + 1}</button>
          );
        })}
      </div>
    );
  }

  const startGame = () => {
    dispatch(resetGame());
    const page = Math.floor(Math.random() * 30);
    dispatch(setCurrentPage(page));
    dispatch(fetchGameWords());
    
    if (currentGame === 'sprint') {
      dispatch(setCurrentGame('sprint'));
      navigate('/sprint');
    } else if (currentGame === 'audioChallenge') {
      dispatch(setCurrentGame('audioChallenge'));
      navigate('/audio-challenge');
    }
  }

  return (
    <div className={gameStyles.wrapper}>
      <div className="scene">
        <div className="cube" ref={cubeRef}>

          <div className="cube__face cube__face--front">
            <div className={gameStyles.title}>Choose Game</div>
            <img src={backgroundImg} alt="" className={gameStyles.mainBackground} />
            <div>
              <button className={gameStyles.gameBtn} onClick={() => {
                setCubeSide('top');
                dispatch(setCurrentGame('sprint'));
                }}>Sprint</button>
              <button className={gameStyles.gameBtn} onClick={() => {
                setCubeSide('bottom');
                dispatch(setCurrentGame('audioChallenge'));
                }}>Audio challenge</button>
            </div>
          </div>

          <div className="cube__face cube__face--back">back</div>

          <div className="cube__face cube__face--right">
            <div className={gameStyles.title}>Select level</div>
            {renderSelectLevel()}
            <button className={gameStyles.backBtn} onClick={() => setCubeSide('front')}>Back to games</button>
          </div>

          <div className="cube__face cube__face--left">
            <div className={gameStyles.title}>Select level</div>
            {renderSelectLevel()}
            <button className={gameStyles.backBtn} onClick={() => setCubeSide('front')}>Back to games</button>
          </div>

          <div className="cube__face cube__face--top">
            <img src={sprintImg} alt="" className={gameStyles.gameImg} />
            <div className={gameStyles.gameTitle}>Sprint</div>
            <div className={gameStyles.description}>
              Check how much points you can get in one minute,
              making educated guesses about what is right and what is wrong.
            </div>
            <div className={gameStyles.sprintBtn}>
              <button className={gameStyles.backBtn} onClick={() => setCubeSide('right')}>Select level</button>
              <button className={gameStyles.backBtn} onClick={() => setCubeSide('front')}>Back to games</button>
            </div>
          </div>

          <div className="cube__face cube__face--bottom">
            <img src={earphonesImg} alt="" className={gameStyles.gameImg} />
            <div className={gameStyles.gameTitle}>Audio challenge</div>
            <div className={gameStyles.description} style={{color: '#313131'}}>
              Check your listening skills, trying to pick the right
              meaning after hearing a word.
              Be careful, as you just have one guess.
            </div>
            <div className={gameStyles.sprintBtn}>
              <button className={gameStyles.backBtn} onClick={() => setCubeSide('left')}>Select level</button>
              <button className={gameStyles.backBtn} onClick={() => setCubeSide('front')}>Back to games</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default GamePage;