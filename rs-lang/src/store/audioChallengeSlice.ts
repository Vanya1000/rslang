import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import wordsAPI from "../api/words";
import { WordType } from "../types/type";
import { RootState } from "./store";

export type audioChallengeState = {
  currentWordIndex: number;
  progress: number;
};

const initialState: audioChallengeState = {
  currentWordIndex: 0,
  progress: 0,
};

export const audioChallengeSlice = createSlice({
  name: 'audioChallenge',
  initialState,
  reducers: {
    setCurrentWordIndex(state, action: PayloadAction<number>) {
      state.currentWordIndex = action.payload;
    },
    setProgress(state, action: PayloadAction<number>) {
      state.progress = action.payload;
    },
  },
  extraReducers: (builder) => {
  },
});

export const { setCurrentWordIndex, setProgress } = audioChallengeSlice.actions;

export default audioChallengeSlice.reducer;

export const selectCurrentWordIndex = (state: RootState) => state.audioChallenge.currentWordIndex;

export const selectProgress = (state: RootState) => state.audioChallenge.progress;
