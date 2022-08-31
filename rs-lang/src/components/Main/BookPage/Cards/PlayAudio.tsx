import React, { useState, useEffect } from 'react';
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
  const [audio, setAudio] = useState<HTMLAudioElement[] | null>(null);

useEffect(() => {
  let fn1: () => void;
  let fn2: () => void;
  let fn3: () => void;
    if (audio) {
      fn1 = () => audio[1].play();
      fn2 = () => audio[2].play();
      fn3 = () => setIsPlaying(false);
      audio[0].addEventListener('ended', fn1);
      audio[1].addEventListener('ended', fn2);
      audio[2].addEventListener('ended', fn3);
      audio[0].play();
    }
    return () => {
      if (audio) {
        audio.forEach((item) => item.pause());
        audio[0].removeEventListener('ended', fn1);
        audio[1].removeEventListener('ended', fn2);
        audio[2].removeEventListener('ended', fn3);
        setIsPlaying(false);
      }
    }
  }, [audio]);


  useEffect(() => {
    if (isPlaying) {
      setAudio([new Audio(word), new Audio(firstSent), new Audio(secondSent)]);
    }
    if (!isPlaying) {
      setAudio(null);
      setIsPlaying(false);
    }
  }, [isPlaying]);

  return (
    <span>
      <span onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? <StopCircleIcon  fontSize='large' sx={{mb: -1, ml:1, cursor: 'pointer'}} /> : <PlayCircleOutlineIcon sx={{mb: -1, ml:1, cursor: 'pointer'}} fontSize='large'/>}</span>
    </span>
  );
};

export default PlayAudio;