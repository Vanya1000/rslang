import React, { useState, useEffect } from "react";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopCircleIcon from '@mui/icons-material/StopCircle';

type audioDataType = {
  word: string;
  firstSent: string;
  secondSent: string;
}

type PlayAudioPropsType = {
  audioData: audioDataType;
}

const PlayAudio: React.FC<PlayAudioPropsType> = ({audioData}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const { word, firstSent, secondSent } = audioData;
  const [audio] = useState([new Audio(word), new Audio(firstSent), new Audio(secondSent)]);

  

  useEffect(() => {
    if (isPlaying) {
      audio[0].play();
    }
    if (!isPlaying) {
      audio[0].pause();
      audio[1].pause();
      audio[2].pause();
    }
    return () => {
      audio[0].pause();
      audio[1].pause();
      audio[2].pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const fn1 = function() {
      audio[1].play();
    }
    const fn2 = function() {
      audio[2].play();
    }
    const fn3 = function() {
      setIsPlaying(false);
    }
    audio[0].addEventListener('ended', fn1);
    audio[1].addEventListener('ended', fn2);
    audio[2].addEventListener('ended', fn3)
    return () => {
      audio[0].removeEventListener('ended', fn1);
      audio[1].removeEventListener('ended', fn2);
      audio[2].removeEventListener('ended', fn3);
      setIsPlaying(false);
    };
  }, []);

  return (
    <span>
      <span onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? <StopCircleIcon fontSize='large' sx={{mb: -1, ml:1}} /> : <PlayCircleOutlineIcon sx={{mb: -1, ml:1}} fontSize='large'/>}</span>
    </span>
  );
};

export default PlayAudio;