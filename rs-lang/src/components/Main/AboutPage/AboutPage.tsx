import React from 'react'
import s from './About.module.css'

const AboutPage = () => {
  return (
    <div className={s.wrapper}>
      <h4>Our Team</h4>
      <div className={s.teamMateWrapper}>
        <div className={`${s.teamMate} ${s.leftBlock}`}>
          <div className={`${s.imgWrapperLeft} ${s.imgWrapper}`}>
            <img src="img/vanya.jpeg" alt="" />
          </div>
          <div className={s.info}>
            <div className={s.name}>
              <div>Vanya Zaharenko</div>
              <a href="https://github.com/Vanya1000">
                <img src="img/github.png" alt="" />
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
            <img src="img/maria.png" alt="" />
          </div>
          <div className={s.info}>
            <div className={`${s.name} ${s.nameReverse}`}>
              <a href="https://github.com/sleepyMaryAlex">
                <img src="img/github.png" alt="" />
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
            <img src="img/alex.jpeg" alt="" />
          </div>
          <div className={s.info}>
            <div className={s.name}>
              <div>Alexander Nechaenkov</div>
              <a href="https://github.com/kettl96">
                <img src="img/github.png" alt="" />
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