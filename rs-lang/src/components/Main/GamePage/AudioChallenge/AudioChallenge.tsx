import './AudioChallenge.css';
import volume from '../../../../assets/images/volume.png';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectGameWords } from '../../../../store/gameSlice';
import React, { useState } from 'react';
import { WordType } from '../../../../types/type';
const baseUrl = process.env.REACT_APP_API_URL;


const AudioChallenge = () => {
  const words = useAppSelector(selectGameWords);
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const shuffle = (array: WordType[] | string[]) => {
    array.sort(() => Math.random() - 0.5);
    return array;
  }

  const getOptions = () => {
    const array: string[] = [];
    array.push(words[currentWordIndex].wordTranslate);
    while (array.length < 4 ) {
      const ind = Math.floor(Math.random() * 20);
      if (!array.includes(words[ind].wordTranslate)) {
        array.push(words[ind].wordTranslate);
      };
    }
    shuffle(array);
    return array;
  }

  let options = getOptions();

  React.useEffect(() => {
    options = getOptions();
  }, [currentWordIndex]);

  const dispatch = useAppDispatch();

    const progressView = () => {
        const diagramBox = document.querySelector('.diagram') as HTMLDivElement;
        const deg: number = (360 * Number(diagramBox.dataset.percent) / 100) + 180;
        if (Number(diagramBox.dataset.percent) >= 50){
            diagramBox.classList.add('over_50');
        } else {
            diagramBox.classList.remove('over_50');
        }
        (diagramBox.querySelector('.piece.right') as HTMLDivElement).style.transform = 'rotate('+deg+'deg)';
    }

    const animate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const target = e.target as HTMLElement;

        const x = e.clientX;
        const y = e.clientY;
      
        const buttonTop = target.offsetTop;
        const buttonLeft = target.offsetLeft;
      
        const xInside = x - buttonLeft;
        const yInside = y - buttonTop;
      
        const circle = document.createElement('span');
        circle.classList.add('circle');
        circle.style.top = yInside + 'px';
        circle.style.left = xInside + 'px';
        target.appendChild(circle);

        setTimeout(() => circle.remove(), 500);
    }

    return (
        <div className='audio-challenge'>
            <div className='audio-challenge__header'>

                <div className="diagram progress" data-percent={currentWordIndex * 6}>
                    <div className="piece left"></div>
                    <div className="piece right"></div>
                    <div className="text">
                        <div>
                            <b>0</b>
                            <span>PERCENT</span>
                        </div>
                    </div>
                </div>

                <h2 className='header__title'>AUDIO CHALLENGE</h2>
            </div>

            <div className='audio-challenge__main'>
                <div className='audio-challenge__content'>
                    <img className='content__image' src={`${baseUrl}${words[currentWordIndex].image}`} alt=''/>
                    <div className='content__wrapper'>
                        <img className='content__volume' src={volume} alt=''/>
                        <span className='content__word'>{words[currentWordIndex].word}</span>
                    </div>
                    <ul className='content__list'>
                        <li className='list__item'>{options[0]}</li>
                        <li className='list__item'>{options[1]}</li>
                        <li className='list__item'>{options[2]}</li>
                        <li className='list__item'>{options[3]}</li>
                    </ul>
                    <button className={`content__button${isAnswered ? ' invisible' : ''}`} onClick={(e) => {
                      animate(e);
                      setIsAnswered(true);
                      }}>I DON'T KNOW</button>
                    <button className={`content__button${isAnswered ? '' : ' invisible'}`} onClick={(e) => {
                      animate(e);
                      setIsAnswered(false);
                      setCurrentWordIndex((prev) => prev + 1);
                      }}>NEXT</button>
                </div>
            </div>

        </div>
    )
}

export default AudioChallenge;