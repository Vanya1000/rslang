import React, { useState, useEffect } from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopCircleIcon from '@mui/icons-material/StopCircle';

import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { setCurrentPlayId } from '../../../../store/bookSlice';

type audioDataType = {
  word: string;
  firstSent: string;
  secondSent: string;
  wordId: string;
}

type PlayAudioPropsType = {
  audioData: audioDataType;
}

const PlayAudio: React.FC<PlayAudioPropsType> = ({audioData}) => {
  const dispatch = useAppDispatch();
  const currentPlayId = useAppSelector(state => state.book.currentPlayId);
  const [isPlaying, setIsPlaying] = useState(false);

  const { word, firstSent, secondSent, wordId } = audioData;
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
      dispatch(setCurrentPlayId(wordId));
    }
    if (!isPlaying) {
      setAudio(null);
      setIsPlaying(false);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (currentPlayId !== wordId) {
      setIsPlaying(false);
    }
  }, [currentPlayId]);

  return (
    <span>
      <span onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? <StopCircleIcon  fontSize='large' sx={{mb: -1, ml:1, cursor: 'pointer'}} /> : <PlayCircleOutlineIcon sx={{mb: -1, ml:1, cursor: 'pointer'}} fontSize='large'/>}</span>
    </span>
  );
};

export default PlayAudio;