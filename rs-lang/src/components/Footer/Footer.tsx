import { Container } from '@mui/system'
import React from 'react'
import s from './Footer.module.css'


const Footer = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.linkWrapper}>
        <div className={s.imgGit}>
          <img src="img/github.png" alt="github" />
        </div>
        <a href="https://github.com/Vanya1000" className={s.github}>
          <div>Vanya1000</div>
        </a>
        <a href="https://github.com/sleepyMaryAlex" className={s.github}>
          <div>sleepyMaryAlex</div>
        </a>
        <a href="https://github.com/kettl96" className={s.github}>
          <div>kettl96</div>
        </a>
      </div>
      <div className={s.date}>2022</div>
      <a href="https://rs.school/js/">
        <img src="img/rs_school_js.svg" alt="rs_course" className={s.rs} />
      </a>
    </div>
  )
}

export default Footer