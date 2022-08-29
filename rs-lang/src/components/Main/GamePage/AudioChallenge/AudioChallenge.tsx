import "./AudioChallenge.css";
import { useAppSelector } from "../../../../hooks/hooks";
import { selectIsFetching } from "../../../../store/gameSlice";
import AudioChallengeCard from "./AudioChallengeCard";
import { CircularProgress } from "@mui/material";
import { selectProgress } from "../../../../store/audioChallengeSlice";
import CircularProgressWithLabel from "./CircularProgressWithLabel";

const AudioChallenge = () => {
  const isFetching = useAppSelector(selectIsFetching);
  const progress = useAppSelector(selectProgress);

  if (isFetching) {
    return <div className="audio-challenge">
      <CircularProgress size="4rem" className="audio-challenge__progress" color="info"/>
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
};

export default AudioChallenge;
