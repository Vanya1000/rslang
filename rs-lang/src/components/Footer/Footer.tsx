import { Container } from '@mui/system'
import React from 'react'
import s from './Footer.module.css'
import gitHub from '../../assets/footerImg/github.png';
import rsImg from '../../assets/footerImg/rs_school_js.svg';
import rsImg_dark from '../../assets/footerImg/rs_school_js_dark.svg';
import { Link } from '@mui/material';
import { useAppSelector } from '../../hooks/hooks';



const Footer = () => {
  const isLightTheme = useAppSelector(state => state.settings.isLightTheme);
  return (
    <Container maxWidth={'xl'} sx={{pt: 1, pb: 1}}>
    <div className={s.wrapper}>
      <div className={s.linkWrapper}>
        <div className={s.imgGit}>
          <img src={gitHub} alt="github" />
        </div>
        <Link
            href="https://github.com/Vanya1000"
            underline="hover"
            target="_blank"
            color={'text.primary'}
          >
            {'Vanya1000'}
          </Link>
          <Link
            href="https://github.com/sleepyMaryAlex"
            underline="hover"
            target="_blank"
            color={'text.primary'}
          >
            {'sleepyMaryAlex'}
          </Link>
          <Link
            href="https://github.com/kettl96"
            underline="hover"
            target="_blank"
            color={'text.primary'}
          >
            {'kettl96'}
          </Link>
      </div>
      <div className={s.date}>2022</div>
      <a href="https://rs.school/js/" target="_blank" rel="noreferrer">
        <img src={isLightTheme ? rsImg : rsImg_dark} alt="rs_course" className={s.rs} />
      </a>
    </div>
    </Container>
  )
}

export default Footer