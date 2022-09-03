import { useAppSelector } from '../../../../../hooks/hooks';
import s from './Keyboard.module.css'

const KeyboardFrame = () => {
  const isLightTheme = useAppSelector(state => state.settings.isLightTheme);

  return (
    <div className={s.wrapper}>
      <div className={s.tittle}>You can use keyboard:</div>
      <div style={{ color: `${isLightTheme ? 'white' : ''}` }}>
        <div>&nbsp;&nbsp;Enter <span>- repeat sound</span></div>
        <div>&nbsp;&nbsp;1,2,3,4 <span>- chose word</span></div>
        <div>&nbsp;&nbsp;Space <span>- show answer / next word</span></div>
      </div>
    </div>
  )
}

export default KeyboardFrame