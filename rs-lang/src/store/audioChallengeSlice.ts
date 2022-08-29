import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WORDS_PER_GAME } from "../constants/constants";
import { RootState } from "./store";

export type answerStatus = 'right' | 'wrong' | 'skipped';

export type answer = {
  wordId: string | undefined;
  status: answerStatus;
}

export type audioChallengeState = {
  currentWordIndex: number;
  progress: number;
  answers: answer[];
};

const initialState: audioChallengeState = {
  currentWordIndex: 0,
  progress: 0,
  answers: [],
};

export const audioChallengeSlice = createSlice({
  name: 'audioChallenge',
  initialState,
  reducers: {
    setCurrentWordIndex(state) {
      state.currentWordIndex++;
    },
    addAnswer(state, action: PayloadAction<answer>) {
      state.progress += 100 / WORDS_PER_GAME;
      state.answers.push(action.payload);
    },
    resetGame(state) {
      state.currentWordIndex = 0;
      state.progress = 0;
      state.answers = [];
    }
  },
  extraReducers: (builder) => {
  },
});

export const { setCurrentWordIndex, addAnswer, resetGame } = audioChallengeSlice.actions;

export default audioChallengeSlice.reducer;

export const selectCurrentWordIndex = (state: RootState) => state.audioChallenge.currentWordIndex;

export const selectProgress = (state: RootState) => state.audioChallenge.progress;

export const selectAnswers = (state: RootState) => state.audioChallenge.answers;
