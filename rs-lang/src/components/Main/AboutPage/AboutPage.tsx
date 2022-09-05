import React from 'react'

import vanyaImg from '../../../assets/aboutImg/vanya.jpeg';
import mariaImg from '../../../assets/aboutImg/maria.jpg';
import alexImg from '../../../assets/aboutImg/alex.jpeg';
import gitHubImg from '../../../assets/footerImg/github.png';
import gitHubImgWhite from '../../../assets/footerImg/gitW.png';
import { useAppSelector } from '../../../hooks/hooks';

import s from './About.module.css'

const AboutPage = () => {
  const isLightTheme = useAppSelector(state => state.settings.isLightTheme);

  return (
    <div className={s.wrapper}>
      <h4>Our Team</h4>
      <div className={s.teamMateWrapper}>
        <div className={`${s.teamMate} ${s.leftBlock}`}>
          <div className={`${s.imgWrapperLeft} ${s.imgWrapper}`}>
            <img src={vanyaImg} alt="" />
          </div>
          <div className={s.info}>
            <div className={s.name}>
              <div>Vanya Zaharenko</div>
              <a href="https://github.com/Vanya1000">
                {isLightTheme
                  ? <img src={gitHubImg} alt="" />
                  : <img src={gitHubImgWhite} alt="" />
                }
              </a>
            </div>
            <div className={s.status}>Team leader, Frontend developer</div>
            <div className={s.description}>
            Coordinated the team, developed the application architecture, made the basic project settings, 
            set up routing, set up receiving data from the backend to redux, implemented the menu, 
            textbook page, statistics page, authorization and user registration
            </div>
          </div>
        </div>
        <div className={`${s.teamMate} ${s.rightBlock}`}>
          <div className={`${s.imgWrapperRight}  ${s.imgWrapper}`}>
            <img src={mariaImg} alt="" />
          </div>
          <div className={s.info}>
            <div className={`${s.name} ${s.nameReverse}`}>
              <a href="https://github.com/sleepyMaryAlex">
                {isLightTheme
                  ? <img src={gitHubImg} alt="" />
                  : <img src={gitHubImgWhite} alt="" />
                }
              </a>
              <div>Mary Huchkova</div>
            </div>
            <div className={s.status}>Frontend developer</div>
            <div className={s.description}>
              Created the main page, implemented the functionality and design of mini-games "Sprint" and "Audio Challenge", 
              navigation through the pages of games
            </div>
          </div>
        </div>
        <div className={`${s.teamMate} ${s.leftBlock}`}>
          <div className={`${s.imgWrapperLeft} ${s.imgWrapper}`}>
            <img src={alexImg} alt="" />
          </div>
          <div className={s.info}>
            <div className={s.name}>
              <div>Alexander Nechaenkov</div>
              <a href="https://github.com/kettl96">
                {isLightTheme
                  ? <img src={gitHubImg} alt="" />
                  : <img src={gitHubImgWhite} alt="" />
                }
              </a>
            </div>
            <div className={s.status}>Frontend developer</div>
            <div className={s.description}>
              Created the "About us" page, footer, made part of the "Sprint" game, 
              implemented the keyboard control for the "Audio Challenge" game, tested the application
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage