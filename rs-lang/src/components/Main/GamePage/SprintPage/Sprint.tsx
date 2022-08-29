import "../Game.css";
import CircularProgressWithLabel from "../AudioChallenge/CircularProgressWithLabel";
import { useAppSelector } from "../../../../hooks/hooks";
import { selectIsFetching } from "../../../../store/gameSlice";
import { CircularProgress } from "@mui/material";
import SprintCard from "./SprintCard";
import { useEffect, useState } from "react";

const Sprint = () => {
  const [timer, setTimer] = useState(60);
  const [isEnd, setEnd] = useState(false);

  const isFetching = useAppSelector(selectIsFetching);

  useEffect(() => {
    if (timer === 0) {
      setEnd(true);
      return;
    } else {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
  }, [timer]);

  const repeatGame = () => {
    setTimer(60);
    setEnd(false);
  };

  if (isFetching) {
    return (
      <div className="game">
        <CircularProgress size="4rem" className="game__progress" color="info" />
      </div>
    );
  } else {
    return (
      <div className="game">
        <div className="game__header">
          <CircularProgressWithLabel value={timer} game="sprint" />
          <h2 className="header__title">SPRINT</h2>
        </div>
        {!isEnd && (
          <div className="game__main">
            <SprintCard isEnd={isEnd}/>
          </div>
        )}
        {isEnd && (
          <div>
            <div className="">Sprint</div>
            <div>game over</div>
            <button onClick={repeatGame}>repeat</button>
          </div>
        )}
      </div>
    );
  }
};
export default Sprint;
