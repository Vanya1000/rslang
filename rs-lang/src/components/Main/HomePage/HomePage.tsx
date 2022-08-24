import { useEffect, useRef, useState } from 'react';
import './HomePage.css';
import textbook from '../../../assets/textbook.png';
import dictionary from '../../../assets/dictionary.png';
import games from '../../../assets/games.png';
import statistics from '../../../assets/statistics.png';
import Advantage from './Advantage';

const HomePage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const possibilitiesRef = useRef<HTMLDivElement>(null);
  const advantagesRef = useRef<HTMLDivElement>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isPossibilitiesVisible, setIsPossibilitiesVisible] = useState(false);
  const [isAdvantagesVisible, setIsAdvantagesVisible] = useState(false);

  const advantages = [
    {id: 1, title: 'learn anytime'},
    {id: 2, title: 'learn from anywhere'},
    {id: 3, title: 'study at your own pace'},
    {id: 4, title: 'enjoy the learning experience'},
    {id: 5, title: 'speak from beginning'},
    {id: 6, title: 'easy access'},
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
              <h3 className='title'>DICTIONARY</h3>
              <p>
                  The dictionary contains lists of studied words, words that do not need to be learned, as well as those that cause difficulties.
                  The dictionary reflects statistics for each section and student progress.
              </p>
          </div>

          <div className='possibilities__item'>
              <img src={games} className='possibilities__img' alt='games'/>
              <h3 className='title'>GAMES</h3>
              <p>
                For learning words and reinforcing memorization, 
                the application has 2 games: Savannah and Audio challenge, which will help you to "pump" your vocabulary in a playful way.
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

      <div className='advantages' ref={advantagesRef}>
        <h2 className={`title advantages__title${isAdvantagesVisible ? ' title-animation' : ''}`}>ADVANTAGES</h2>
        <div className='advantages__container'>
          {advantages.map((item) => (
            <Advantage id={item.id} title={item.title} key={item.id}/>
          ))}
        </div>
      </div>

    </div>
  )
}

export default HomePage;