import "./AudioChallenge.css";
import { useAppSelector } from "../../../../hooks/hooks";
import { selectIsFetching } from "../../../../store/gameSlice";
import AudioChallengeCard from "./AudioChallengeCard";
import { CircularProgress, CircularProgressProps } from "@mui/material";
import { selectProgress } from "../../../../store/audioChallengeSlice";

const AudioChallenge = () => {
  const isFetching = useAppSelector(selectIsFetching);
  const progress = useAppSelector(selectProgress);

  function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
  ) {
    return (
      <div className="diagram">
        <CircularProgress variant="determinate" {...props} />
        <div className="process">
          <p>{`${Math.round(props.value)}%`}</p>
        </div>
      </div>
    );
  }

  {
    if (isFetching) {
      return <div className="audio-challenge">
        <CircularProgress className="audio-challenge__progress" color="inherit"/>
      </div>;
    } else {
      return (
        <div className="audio-challenge">

          <div className="audio-challenge__header">
            <CircularProgressWithLabel value={progress} />
            <h2 className="header__title">AUDIO CHALLENGE</h2>
          </div>

          <div className="audio-challenge__main">
             <AudioChallengeCard />
          </div>

        </div>
      );
    }
  }
};

export default AudioChallenge;
