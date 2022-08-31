import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import wordsAPI from '../api/words';
import { AnswerType, GameType, WordType } from '../types/type';
import { RootState } from './store';

export type GameState = {
  words: WordType[];
  currentGame: GameType | null;
  currentGroup: number;
  currentPage: number;
  isFetching: boolean;
  currentWordIndex: number;
  answers: AnswerType[];
  timer: number;
}

const initialState: GameState = {
  words: [],
  currentGame: null,
  currentGroup: 0,
  currentPage: 0,
  isFetching: false,
  currentWordIndex: 0,
  answers: [],
  timer: 60,
};

export const fetchGameWords = createAsyncThunk<WordType[] | undefined, void, { state: RootState }>(
  'game/fetchGameWords',
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
      state.timer = 60;
    },
    resetGame(state) {
      state.words = [];
      state.currentGame = null;
      state.currentGroup = 0;
      state.currentPage = 0;
      state.isFetching = false;
      state.currentWordIndex = 0;
      state.answers = [];
      state.timer = 60;
    },
    setTimer(state, action: PayloadAction<number>) {
      state.timer = action.payload;
    }
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

export const { setCurrentGame, setCurrentGroup, setCurrentPage, setWords, setCurrentWordIndex, addAnswer, playAgain, resetGame, setTimer } = gameSlice.actions;

export default gameSlice.reducer;

export const selectGameWords = (state: RootState) => state.game.words;

export const selectIsFetching = (state: RootState) => state.game.isFetching;

export const selectCurrentGroup = (state: RootState) => state.game.currentGroup;

export const selectCurrentPage = (state: RootState) => state.game.currentPage;

export const selectCurrentGame = (state: RootState) => state.game.currentGame;

export const selectCurrentWordIndex = (state: RootState) => state.game.currentWordIndex;

export const selectAnswers = (state: RootState) => state.game.answers;

export const selectProgress = (state: RootState) => state.game.answers.length * 5;

export const selectTimer = (state: RootState) => state.game.timer;