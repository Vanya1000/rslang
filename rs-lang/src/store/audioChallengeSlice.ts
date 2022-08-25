import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import wordsAPI from "../api/words";
import { WordType } from "../types/type";
import { RootState } from "./store";

export type audioChallengeState = {
};

const initialState: audioChallengeState = {
};

export const audioChallengeSlice = createSlice({
  name: "audioChallenge",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
  },
});

export const { } = audioChallengeSlice.actions;

export default audioChallengeSlice.reducer;
