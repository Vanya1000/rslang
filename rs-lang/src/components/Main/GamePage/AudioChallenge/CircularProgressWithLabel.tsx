import { CircularProgress, CircularProgressProps } from "@mui/material";

const CircularProgressWithLabel = (props: CircularProgressProps & { value: number }) => {
  return (
    <div className="diagram">
      <CircularProgress color="info" size="4rem" variant="determinate" {...props} />
      <div className="process">
        <p>{`${Math.round(props.value)}%`}</p>
      </div>
    </div>
  );
};

export default CircularProgressWithLabel;
