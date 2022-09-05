import { Box, ClickAwayListener, SxProps } from '@mui/material';
import { useState } from 'react';

import { useAppSelector } from '../../../../../hooks/hooks';
import { selectGame } from '../../../../../store/gameSlice';

const KeyboardFrame = () => {
  const isLightTheme = useAppSelector((state) => state.settings.isLightTheme);
  const game = useAppSelector(selectGame);

  const [IsDropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const handleClickAway = () => {
    setDropdownOpen(false);
  };

  const handleClick = () => {
    setDropdownOpen((prev) => !prev);
  };

  const styles: SxProps = {
    position: 'absolute',
    top: 20,
    right: 20,
    width: '250px',
    zIndex: 1,
    borderRadius: '5px',
    p: 2,
    bgcolor: () =>
    isLightTheme ? '#F5F5F7' : 'rgba(0, 0, 0, 0.932)',
  };

  const style = {
    color: game === 'sprint' ? '#01A1BB' : '#6573c3',
  }

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleClickAway}
    >
      <Box sx={{ position: 'absolute', right: 15, top: 15 }}>
        <button className="dropdown__button" type="button" onClick={handleClick}>
          ?
        </button>
        {IsDropdownOpen ? (
          <Box sx={styles}>
            {game === 'audioChallenge' ? (
              <div>
                <p className="dropdown__title" style={style}>You can use keyboard</p>
                <div className="dropdown__key">
                  Enter <span style={style}>- repeat sound</span>
                </div>
                <div className="dropdown__key">
                  1, 2, 3, 4 <span style={style}>- choose word</span>
                </div>
                <div className="dropdown__key">
                  Space <span style={style}>- show answer / next word</span>
                </div>
              </div>
            ) : (
              <div>
                <p className="dropdown__title" style={style}>You can use keyboard</p>
                <div className="dropdown__key">
                  Arrow left <span style={style}>- right</span>
                </div>
                <div className="dropdown__key">
                  Arrow right <span style={style}>- wrong</span>
                </div>
              </div>
            )}
          </Box>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
};

export default KeyboardFrame;
