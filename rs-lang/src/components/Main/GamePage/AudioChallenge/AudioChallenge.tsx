import "../Game.css";
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
    return <div className="game">
      <CircularProgress size="4rem" className="game__progress" color="info"/>
    </div>;
  } else {
    return (
      <div className="game">

        <div className="game__header">
          <CircularProgressWithLabel value={progress} game='audioChallenge'/>
          <h2 className="header__title">AUDIO CHALLENGE</h2>
        </div>

        <div className="game__main">
           <AudioChallengeCard />
        </div>

      </div>
    );
  }
};

export default AudioChallenge;
