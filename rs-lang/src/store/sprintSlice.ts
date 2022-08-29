import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type answerStatus = 'right' | 'wrong';

export type answer = {
  wordId: string | undefined;
  status: answerStatus;
}

export type sprintState = {
  currentWordIndex: number;
  answers: answer[];
};

const initialState: sprintState = {
  currentWordIndex: 0,
  answers: [],
};

export const sprintSlice = createSlice({
  name: 'sprint',
  initialState,
  reducers: {
    setCurrentWordIndex(state, action: PayloadAction<number>) {
      state.currentWordIndex = action.payload;
    },
    addAnswer(state, action: PayloadAction<answer>) {
      state.answers.push(action.payload);
    },
    resetGame(state) {
      state.currentWordIndex = 0;
      state.answers = [];
    }
  },
  extraReducers: (builder) => {
  },
});

export const { setCurrentWordIndex, addAnswer, resetGame } = sprintSlice.actions;

export default sprintSlice.reducer;

export const selectCurrentWordIndex = (state: RootState) => state.sprint.currentWordIndex;

export const selectAnswers = (state: RootState) => state.sprint.answers;