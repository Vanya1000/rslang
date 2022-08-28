import { CircularProgress, CircularProgressProps } from "@mui/material";

const CircularProgressWithLabel = (props: CircularProgressProps & { value: number }) => {
  return (
    <div className="diagram">
      <CircularProgress variant="determinate" {...props} />
      <div className="process">
        <p>{`${Math.round(props.value)}%`}</p>
      </div>
    </div>
  );
};

export default CircularProgressWithLabel;
