import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import wordsAPI from '../api/words';
import { AnswerType, WordType } from '../types/type';
import { RootState } from './store';

export type GameState = {
  words: WordType[];
  currentGame: string | null;
  currentGameGroup: number;
  currentPage: number;
  isFetching: boolean;
  currentWordIndex: number;
  answers: AnswerType[];
}

const initialState: GameState = {
  words: [],
  currentGame: null,
  currentGameGroup: 0,
  currentPage: 0,
  isFetching: false,
  currentWordIndex: 0,
  answers: [],
};

export const fetchGameWords = createAsyncThunk<WordType[] | undefined, void, { state: RootState }>(
  'game/fetchGameWords',
  async (_, { getState }) => {
    try {
      const { currentGameGroup: currentGroup, currentPage } = getState().game;
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
    setCurrentGame(state, action: PayloadAction<string | null>) {
      state.currentGame = action.payload;
    },
    setCurrentGameGroup(state, action: PayloadAction<number>) {
      state.currentGameGroup = action.payload;
    },
    setCurrentGamePage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setWords(state, action: PayloadAction<WordType[]>) {
      state.words = action.payload;
    },
    setCurrentWordIndex(state) {
      state.currentWordIndex++;
    },
    addAnswer(state, action: PayloadAction<AnswerType>) {
      state.answers.push(action.payload);
    },
    playAgain(state) {
      state.currentWordIndex = 0;
      state.answers = [];
    },
    resetGame(state) {
      state.words = [];
      state.currentGame = null;
      state.currentGameGroup = 0;
      state.currentPage = 0;
      state.isFetching = false;
      state.currentWordIndex = 0;
      state.answers = [];
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

export const { setCurrentGame, setCurrentGameGroup, setCurrentGamePage, setWords, setCurrentWordIndex, addAnswer, playAgain, resetGame } = gameSlice.actions;

export default gameSlice.reducer;

export const selectGameWords = (state: RootState) => state.game.words;

export const selectIsFetching = (state: RootState) => state.game.isFetching;

export const selectCurrentGroup = (state: RootState) => state.game.currentGameGroup;

export const selectCurrentPage = (state: RootState) => state.game.currentPage;

export const selectCurrentGame = (state: RootState) => state.game.currentGame;

export const selectCurrentWordIndex = (state: RootState) => state.game.currentWordIndex;

export const selectAnswers = (state: RootState) => state.game.answers;

export const selectProgress = (state: RootState) => state.game.answers.length * 5;