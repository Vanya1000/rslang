import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import wordsAPI from "../api/words";
import { WordType } from "../types/type";
import { RootState } from "./store";

type GameType = 'audioChallenge' | 'sprint' | null;

export type GameState = {
  words: WordType[];
  currentGame: GameType;
  currentGroup: number;
  currentPage: number;
  isFetching: boolean;
}

const initialState: GameState = {
  words: [],
  currentGame: null,
  currentGroup: 0,
  currentPage: 0,
  isFetching: false,
};

export const fetchWords = createAsyncThunk<WordType[] | undefined, { group: number; page: number }, { state: RootState }>(
  "game/fetchWords",
  async ({ group, page }) => {
    try {
      const { status, data } = await wordsAPI.getWordsNoAuth(group, page);
      if (status === 200) {
        return data;
      }
    } catch (error) {
        console.log(error);
    }
  }
);

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCurrentGame(state, action: PayloadAction<GameType>) {
      state.currentGame = action.payload;
    },
    setCurrentGroup(state, action: PayloadAction<number>) {
      state.currentGroup = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentGroup = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWords.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchWords.fulfilled, (state, action) => {
        state.words = action.payload!;
        state.isFetching = false;
      });
  },
});

export const { setCurrentGame, setCurrentGroup, setCurrentPage } = gameSlice.actions;

export default gameSlice.reducer;
