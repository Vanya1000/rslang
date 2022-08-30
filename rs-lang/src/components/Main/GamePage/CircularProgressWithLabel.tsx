import { CircularProgress, CircularProgressProps } from "@mui/material";
import { SECONDS_PER_MINUTE } from "../../../constants/constants";

const CircularProgressWithLabel = (props: CircularProgressProps & { value: number, game: string }) => {
  const value = props.game === 'sprint' ? props.value * 100 / SECONDS_PER_MINUTE : props.value;
  return (
    <div className="diagram">
      <CircularProgress color="info" size="4rem" variant="determinate" value={value} thickness={2}
      sx={{
          color: (theme) =>
            theme.palette.grey[300],
            animationDuration: '550ms',
        }}/>
      <div className="process">
        <p>{`${Math.round(props.value)}${props.game === 'sprint' ? '' : '%'}`}</p>
      </div>
    </div>
  );
};

export default CircularProgressWithLabel;
