import { useEffect, useRef, useState } from 'react';
import textbook from '../../../assets/textbook.png';
import dictionary from '../../../assets/english.png';
import games from '../../../assets/puzzle.png';
import statistics from '../../../assets/analysis.png';
import './HomePage.css';

const HomePage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const possibilitiesRef = useRef<HTMLDivElement>(null);
  const advantagesRef = useRef<HTMLDivElement>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isPossibilitiesVisible, setIsPossibilitiesVisible] = useState(false);
  const [isAdvantagesVisible, setIsAdvantagesVisible] = useState(false);

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
    const observer = new IntersectionObserver(setHeroVisibility);
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    }
  }, [heroRef]);

  useEffect(() => {
    const observer = new IntersectionObserver(setPossibilitiesVisibility);
    if (possibilitiesRef.current) {
      observer.observe(possibilitiesRef.current);
    }

    return () => {
      if (possibilitiesRef.current) {
        observer.unobserve(possibilitiesRef.current);
      }
    }
  }, [possibilitiesRef]);

  useEffect(() => {
    const observer = new IntersectionObserver(setAdvantagesVisibility);
    if (advantagesRef.current) {
      observer.observe(advantagesRef.current);
    }

    return () => {
      if (advantagesRef.current) {
        observer.unobserve(advantagesRef.current);
      }
    }
  }, [advantagesRef]);

  return (
    <div className='home-page'>
      <div className='hero' ref={heroRef}>
        <div className={`hero__container${isHeroVisible ? ' hero-animation' : ''}`}>
          <h1 className='hero__title'>RS LANG</h1>
          <div className='hero__subtitle'>
            <p>LEARNING ENGLISH HAS NEVER BEEN SO EASY!</p>
            <p>Play games, listen to pronunciation,</p>
            <p>improve your knowledge.</p>
            <p>With our app, learning is a joy.</p>
          </div>
        </div>
      </div>
      <div className='possibilities' ref={possibilitiesRef}>
        <h2 className={`${isPossibilitiesVisible ? ' title-animation' : ''}`}>ALL POSSIBILITIES</h2>

        <div className='possibilities__container'>
          <div className='possibilities__item'>
            <img src={textbook} className='possibilities__img'/>
              <h3>TEXTBOOK</h3>
              <p>
                  The electronic textbook consists of six sections. Each section has 30 pages of 20 words.
                  The translation of the word, the thematic image, as well as the pronunciation of both the word separately and as part of the phrase are presented.
              </p>
          </div>

          <div className='possibilities__item'>
            <img src={dictionary} className='possibilities__img'/>
              <h3>DICTIONARY</h3>
              <p>
                  The dictionary contains lists of studied words, words that do not need to be learned, as well as those that cause difficulties.
                  The dictionary reflects statistics for each section and student progress.
              </p>
          </div>

          <div className='possibilities__item'>
              <img src={games} className='possibilities__img'/>
              <h3>GAMES</h3>
              <p>
                For learning words and reinforcing memorization, 
                the application has 2 games: Savannah and Audio challenge, which will help you to "pump" your vocabulary in a playful way.
              </p>
          </div>

          <div className='possibilities__item'>
              <img src={statistics} className='possibilities__img'/>
              <h3>STATISTICS</h3>
              <p>
                All the progress of training can be viewed in statistics, where data for the current day,
                as well as for the entire training period, are presented.
                The information is presented both in the form of a table and graphs, which is very convenient.
              </p>
          </div>

        </div>
      </div>

      <div className='advantages' ref={advantagesRef}>
        <h2 className={`${isAdvantagesVisible ? ' title-animation' : ''}`}>ADVANTAGES</h2>
      </div>

    </div>
  )
}

export default HomePage;