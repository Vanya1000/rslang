import { WordType } from "./../../../types/type";

const baseUrl = process.env.REACT_APP_API_URL;

export const shuffle = (array: WordType[]) => {
  const shuffled = array.slice().sort(() => Math.random() - 0.5);
  return shuffled;
};

export const shuffleStrings = (array: string[]) => {
  const shuffled = array.sort(() => Math.random() - 0.5);
  return shuffled;
};

export const playAudio = (path: string) => {
  const audio = new Audio(path);
  audio.play();
};

export const playWordAudio = (words: WordType[], currentWordIndex: number) => {
  playAudio(`${baseUrl}${words[currentWordIndex].audio}`);
};