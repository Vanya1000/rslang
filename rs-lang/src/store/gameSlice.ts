import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import wordsAPI from '../api/words';
import { AnswerType, GameType, WordType } from '../types/type';
import { RootState } from './store';

export type GameState = {
  words: WordType[];
  game: GameType | null;
  gameGroup: number | null;
  gamePage: number | null;
  isFetching: boolean;
  wordIndex: number;
  answers: AnswerType[];
}

const initialState: GameState = {
  words: [],
  game: null,
  gameGroup: null,
  gamePage: null,
  isFetching: false,
  wordIndex: 0,
  answers: [],
};

export const fetchGameWords = createAsyncThunk<WordType[] | undefined, void, { state: RootState }>(
  'game/fetchGameWords',
  async (_, { getState }) => {
    try {
      const { gameGroup, gamePage } = getState().game;
      const { status, data } = await wordsAPI.getWordsNoAuth(gameGroup!, gamePage!);
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
    setGame(state, action: PayloadAction<GameType>) {
      state.game = action.payload;
    },
    setGameGroup(state, action: PayloadAction<number>) {
      state.gameGroup = action.payload;
    },
    setGamePage(state, action: PayloadAction<number>) {
      state.gamePage = action.payload;
    },
    setGameWords(state, action: PayloadAction<WordType[]>) {
      state.words = action.payload;
    },
    setWordIndex(state) {
      state.wordIndex++;
    },
    addAnswer(state, action: PayloadAction<AnswerType>) {
      state.answers.push(action.payload);
    },
    playAgain(state) {
      state.wordIndex = 0;
      state.answers = [];
    },
    resetGame(state) {
      state.words = [];
      state.game = null;
      state.gameGroup = null;
      state.gamePage = null;
      state.isFetching = false;
      state.wordIndex = 0;
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

export const { setGame, setGameGroup, setGamePage, setGameWords, setWordIndex, addAnswer, playAgain, resetGame } = gameSlice.actions;

export default gameSlice.reducer;

export const selectGameWords = (state: RootState) => state.game.words;

export const selectIsFetching = (state: RootState) => state.game.isFetching;

export const selectGameGroup = (state: RootState) => state.game.gameGroup;

export const selectGamePage = (state: RootState) => state.game.gamePage;

export const selectGame = (state: RootState) => state.game.game;

export const selectWordIndex = (state: RootState) => state.game.wordIndex;

export const selectAnswers = (state: RootState) => state.game.answers;

export const selectProgress = (state: RootState) => state.game.answers.length * 5;