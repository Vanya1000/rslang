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

export const fetchGameWords = createAsyncThunk<WordType[] | undefined, void, { state: RootState }>(
  "game/fetchGameWords",
  async (_, { getState }) => {
    try {
      const { currentGroup, currentPage } = getState().game;
      const { status, data } = await wordsAPI.getWordsNoAuth(currentGroup, currentPage);
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
      state.currentPage = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGameWords.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchGameWords.fulfilled, (state, action) => {
        state.words = action.payload!;
        state.isFetching = false;
      });
  },
});

export const { setCurrentGame, setCurrentGroup, setCurrentPage } = gameSlice.actions;

export default gameSlice.reducer;

export const selectGameWords = (state: RootState) => state.game.words;

export const selectIsFetching = (state: RootState) => state.game.isFetching;

export const selectCurrentGroup = (state: RootState) => state.game.currentGroup;

export const selectCurrentPage = (state: RootState) => state.game.currentPage;

export const selectCurrentGame = (state: RootState) => state.game.currentGame;
