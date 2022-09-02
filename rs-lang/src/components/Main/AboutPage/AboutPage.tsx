import React from 'react'
import s from './About.module.css'
import vanyaImg from '../../../assets/aboutImg/vanya.jpeg';
import mariaImg from '../../../assets/aboutImg/maria.jpg';
import alexImg from '../../../assets/aboutImg/alex.jpeg';
import gitHubImg from '../../../assets/footerImg/github.png';
import gitHubImgWhite from '../../../assets/footerImg/gitW.png';
import { useAppSelector } from '../../../hooks/hooks';

const AboutPage = () => {

  const isLightTheme = useAppSelector(state => state.settings.isLightTheme);
  console.log(isLightTheme);


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
            <div className={s.status}>Team leader, Full Stack developer</div>
            <div className={s.description}>
              Did basic project settings, initial layout, redux setup,
              router setup, login form, part of the TextBook page,
              "Audio Challenge" game, "Savannah" game, backend
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
              Did basic project settings, initial layout, redux setup,
              router setup, login form, part of the TextBook page,
              "Audio Challenge" game, "Savannah" game, backend
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
              Did basic project settings, initial layout, redux setup,
              router setup, login form, part of the TextBook page,
              "Audio Challenge" game, "Savannah" game, backend
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AboutPage