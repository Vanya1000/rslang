import { GameType, WordType } from "./../../../types/type";

const baseUrl = process.env.REACT_APP_API_URL;

export const additionalWords = ['приобретать', 'неловко', 'сторож', 'обмануть', 'отбить', 'ненависть', 'хижина', 'низший', 'поселить', 'новичок'];

export const shuffle = <T>(array: T[]) => {
  const shuffled = array.slice().sort(() => Math.random() - 0.5);
  return shuffled;
};

export const playAudio = (path: string) => {
  const audio = new Audio(path);
  audio.play();
};

export const playWordAudio = (gameWords: WordType[], wordIndex: number) => {
  playAudio(`${baseUrl}${gameWords[wordIndex].audio}`);
};

export const getGameRoute = (game: GameType) => {
  return game === 'sprint' ? '/game/sprint' : '/game/audio-challenge';
}
