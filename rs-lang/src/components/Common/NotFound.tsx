import React from 'react'
import { Link } from 'react-router-dom'
import returnImg from '../../assets/images/prev-arrow.svg'
import { useAppSelector } from '../../hooks/hooks'
import s from './NotFound.module.css'


const NotFound = () => {
  const isLightTheme = useAppSelector(state => state.settings.isLightTheme);

  return (
    <div className={s.wrapper}>
      <div className={s.error__wrapper}>
        <div className={s.last}>401</div>
        <div className={s.second}>402</div>
        <div className={s.first}>403</div>
        <div className={s.main__error} style={{textShadow: `${isLightTheme ? '' : '3px 2px 2px #BEBDCD'}`}}>404</div>
        <div className={s.first}>405</div>
        <div className={s.second}>406</div>
        <div className={s.last}>407</div>
      </div>
      <div className={s.tittle}>The page you were looking for could not be found</div>
      <Link to='/'>
        <div className={s.returnBtn}>
          <img src={returnImg} alt="" />
          <div>
            Return to Main
          </div>
        </div>
      </Link>
    </div>
  )
}

export default NotFound