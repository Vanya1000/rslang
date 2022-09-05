import { CircularProgress, CircularProgressProps } from '@mui/material';

import { SECONDS_PER_MINUTE } from '../../../constants/constants';
import { useAppSelector } from '../../../hooks/hooks';
import { GameType } from '../../../types/type';

const CircularProgressWithLabel = (props: CircularProgressProps & { value: number, game: GameType }) => {
  const value = props.game === 'sprint' ? props.value * 100 / SECONDS_PER_MINUTE : props.value;
  const isLightTheme = useAppSelector((state) => state.settings.isLightTheme);

  return (
    <div className="diagram">
      <CircularProgress color="inherit" size="4rem" variant="determinate" value={value} thickness={2}
        sx={{
          color: () =>
          isLightTheme ? 
            'rgba(0, 0, 0, 0.432)' : '#f5f5f77b',
            animationDuration: '550ms',
        }}
        />
      <div className="process">
        <p>{`${Math.round(props.value)}${props.game === 'sprint' ? '' : '%'}`}</p>
      </div>
    </div>
  );
};

export default CircularProgressWithLabel;
