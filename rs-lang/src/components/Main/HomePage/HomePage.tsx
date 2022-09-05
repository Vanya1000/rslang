import { useEffect, useRef, useState } from 'react';

import './HomePage.css';
import textbook from '../../../assets/images/textbook.png';
import dictionary from '../../../assets/images/dictionary.png';
import games from '../../../assets/images/games.png';
import statistics from '../../../assets/images/statistics.png';
import { useAppSelector } from '../../../hooks/hooks';

import Advantage from './Advantage';

const HomePage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const possibilitiesRef = useRef<HTMLDivElement>(null);
  const advantagesRef = useRef<HTMLDivElement>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isPossibilitiesVisible, setIsPossibilitiesVisible] = useState(false);
  const [isAdvantagesVisible, setIsAdvantagesVisible] = useState(false);

  const isLightTheme = useAppSelector(state => state.settings.isLightTheme);

  const style = {
    backgroundColor: isLightTheme ? '#c9c9cd' : '#3131317e'
  }

  const advantages = [
    {id: 1, title: 'mini games'},
    {id: 2, title: '3600 popular words'},
    {id: 3, title: 'daily statistics'},
    {id: 4, title: 'long-term statistics'},
    {id: 5, title: 'for computer and mobile'},
    {id: 6, title: 'dark and light themes'},
    {id: 7, title: 'RS Lang is incredibly versatile'},];

  const setHeroVisibility = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsHeroVisible(entry.isIntersecting);
  }

  const setPossibilitiesVisibility = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsPossibilitiesVisible(entry.isIntersecting);
  }

  const setAdvantagesVisibility = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsAdvantagesVisible(entry.isIntersecting);
  }

  useEffect(() => {
    let observerRefValue: HTMLDivElement | null = null;
    const observer = new IntersectionObserver(setHeroVisibility);
    if (heroRef.current) {
      observer.observe(heroRef.current);
      observerRefValue = heroRef.current;
    }

    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue);
      }
    }
  }, [heroRef]);

  useEffect(() => {
    let observerRefValue: HTMLDivElement | null = null;
    const observer = new IntersectionObserver(setPossibilitiesVisibility);
    if (possibilitiesRef.current) {
      observer.observe(possibilitiesRef.current);
      observerRefValue = possibilitiesRef.current;
    }

    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue);
      }
    }
  }, [possibilitiesRef]);

  useEffect(() => {
    let observerRefValue: HTMLDivElement | null = null;
    const observer = new IntersectionObserver(setAdvantagesVisibility);
    if (advantagesRef.current) {
      observer.observe(advantagesRef.current);
      observerRefValue = advantagesRef.current;
    }

    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue);
      }
    }
  }, [advantagesRef]);

  return (
    <div className='home-page'>
      <div className='hero' ref={heroRef}>
        <div className={`hero__container${isHeroVisible ? ' hero-animation' : ''}`}>
          <h1 className='hero__title title'>RS LANG</h1>
          <div className='hero__subtitle'>
            <p>LEARNING ENGLISH HAS NEVER BEEN SO EASY!</p>
            <p>Play games, listen to pronunciation,</p>
            <p>improve your knowledge.</p>
            <p>With our app, learning is a joy.</p>
          </div>
        </div>
      </div>
      <div className='possibilities' ref={possibilitiesRef}>
        <h2 className={`title possibilities__title${isPossibilitiesVisible ? ' title-animation' : ''}`}>ALL POSSIBILITIES</h2>

        <div className='possibilities__container'>
          <div className='possibilities__item'>
            <img src={textbook} className='possibilities__img' alt='textbook'/>
              <h3 className='title'>TEXTBOOK</h3>
              <p>
                  The electronic textbook consists of six sections. Each section has 30 pages of 20 words.
                  The translation of the word, the thematic image, as well as the pronunciation of both the word separately and as part of the phrase are presented.
              </p>
          </div>

          <div className='possibilities__item'>
            <img src={dictionary} className='possibilities__img' alt='dictionary'/>
              <h3 className='title'>DIFFICULT WORDS</h3>
              <p>
                The section "Difficult words" is available for registered users and contains words that cause difficulties. 
                Such words are marked in red. You can add and remove words from this section.
                A word is removed from difficult words if you answer 5 times in a row correctly.
              </p>
          </div>

          <div className='possibilities__item'>
              <img src={games} className='possibilities__img' alt='games'/>
              <h3 className='title'>GAMES</h3>
              <p>
                For learning words and reinforcing memorization, 
                the application has 2 games: "Sprint" and "Audio challenge", which will help you to "pump" your vocabulary in a playful way.
                A word is considered learned if you answer 3 times in a row correctly.
              </p>
          </div>

          <div className='possibilities__item'>
              <img src={statistics} className='possibilities__img' alt='statistics'/>
              <h3 className='title'>STATISTICS</h3>
              <p>
                All the progress of training can be viewed in statistics, where data for the current day,
                as well as for the entire training period, are presented.
                The information is presented both in the form of a table and graphs, which is very convenient.
              </p>
          </div>

        </div>
      </div>

      <div className='advantages' ref={advantagesRef} style={style}>
        <h2 className={`title advantages__title${isAdvantagesVisible ? ' title-animation' : ''}`}>ADVANTAGES</h2>
        <div className='advantages__container'>
          {advantages.map((item, i) => (
            <Advantage id={item.id} title={item.title} key={item.id} timer={i * 500}/>
          ))}
        </div>
      </div>

    </div>
  )
}

export default HomePage;