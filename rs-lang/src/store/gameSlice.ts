import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import wordsAPI from '../api/words';
import { AnswerType, GameType, WordType } from '../types/type';
import { RootState } from './store';
import { setSomethingWrong } from './userSlice';

export type GameState = {
  words: WordType[];
  game: GameType | null;
  gameGroup: number | null;
  gamePage: number | null;
  isFetching: boolean;
  wordIndex: number;
  answers: AnswerType[];
  isFromBook: boolean | null;
}

const initialState: GameState = {
  words: [],
  game: null,
  gameGroup: null,
  gamePage: null,
  isFetching: false,
  wordIndex: 0,
  answers: [],
  isFromBook: null,
};

const fetchWordsNoAuth = async (group: number, page: number, logErrorMessage?: (message: string) => void): Promise<WordType[] | undefined> => {
  try {
    const { status, data } = await wordsAPI.getWordsNoAuth(group, page);
    if (status === 200) {
      return data;
    }
  } catch (error) {
    if (logErrorMessage) {
      logErrorMessage('Something wrong with get game words no auth');
    }
  }
}

const fetchWordsAuth = async (group: number, page: number, userId: string, logErrorMessage?: (message: string) => void): Promise<WordType[] | undefined> => {
  try {
    const { status, data } = await wordsAPI.getWordsAuth(group, page, userId);
    if (status === 200) {
      return data[0].paginatedResults;
    }
  } catch (error) {
    if (logErrorMessage) {
      logErrorMessage('Something wrong with get game words auth');
    }
  }
}

const fetchSprintWordsFromBook = async (group: number, page: number, userId: string, logErrorMessage?: (message: string) => void): Promise<WordType[]> => {
  let currentPage = page;
  const allWords: WordType[] = [];
  while (currentPage >= 0 && allWords.length < 200) {
    const words = await fetchWordsAuth(group, currentPage, userId, logErrorMessage);
    if (words) {
      allWords.push(...words.filter((word) => word.userWord?.difficulty !== 'learned'));
    }
    if (currentPage === 0) {
      break;
    }
    currentPage -= 1;
  }
  return allWords;
}

const fetchSprintWordsFromGame = async (group: number, page: number, userId?: string, logErrorMessage?: (message: string) => void): Promise<WordType[]> => {
  let currentPage = page;
  const allWords: WordType[] = [];
  while (allWords.length < 200) {
    const words = userId
      ? await fetchWordsAuth(group, currentPage, userId!, logErrorMessage)
      : await fetchWordsNoAuth(group, currentPage, logErrorMessage);
    if (words) {
      allWords.push(...words);
    }
    if (currentPage === 0) {
      currentPage = 29;
    } else {
      currentPage -= 1;
    }
  }
  return allWords;
}

const fetchAudioChallengeWordsFromBook = async (group: number, page: number, userId: string, logErrorMessage?: (message: string) => void): Promise<WordType[]> => {
  let currentPage = page;
  const allWords: WordType[] = [];
  while (currentPage >= 0) {
    const words = await fetchWordsAuth(group, currentPage, userId, logErrorMessage);
    if (words) {
      allWords.push(...words.filter((word) => word.userWord?.difficulty !== 'learned'));
    }
    if (allWords.length >= 20) {
      return allWords.slice(0, 20);
    }
    if (currentPage === 0) {
      break;
    }
    currentPage -= 1;
  }
  return allWords;
}

const fetchAudioChallengeWordsFromGame = async (group: number, page: number, userId?: string, logErrorMessage?: (message: string) => void): Promise<WordType[] | undefined> => {
  const allWords: WordType[] = [];
  const words = userId
    ? await fetchWordsAuth(group, page, userId!, logErrorMessage)
    : await fetchWordsNoAuth(group, page, logErrorMessage);
  if (words) {
    allWords.push(...words);
  }
  return allWords;
}

export const fetchGameWords = createAsyncThunk<WordType[] | undefined, void, { state: RootState }>(
  'game/fetchGameWords',
  async (_, { getState, dispatch }) => {
    const logErrorMessage = (message: string) => {
      dispatch(setSomethingWrong(message));
    }
    try {
      const { game, gameGroup, gamePage, isFromBook } = getState().game;
      const { user } = getState().user;
      if (user) {
        switch (game) {
          case 'sprint':
              return isFromBook
                ? await fetchSprintWordsFromBook(gameGroup!, gamePage!, user!.userId, logErrorMessage)
                : await fetchSprintWordsFromGame(gameGroup!, gamePage!, user!.userId, logErrorMessage);
          case 'audioChallenge':
              return isFromBook
                ? await fetchAudioChallengeWordsFromBook(gameGroup!, gamePage!, user!.userId, logErrorMessage)
                : await fetchAudioChallengeWordsFromGame(gameGroup!, gamePage!, user!.userId, logErrorMessage);
        }
      } else {
        switch (game) {
          case 'sprint':
              return await fetchSprintWordsFromGame(gameGroup!, gamePage!, undefined, logErrorMessage);
          case 'audioChallenge':
              return await fetchAudioChallengeWordsFromGame(gameGroup!, gamePage!, undefined, logErrorMessage);
        }
      }
    } catch (error) {
      dispatch(setSomethingWrong('Something wrong with get game words'));
    }
  }
);

export const gameSlice = createSlice({
  name: 'game',
  initialState,

  reducers: {
    setGame(state, action: PayloadAction<{game: GameType, isFromBook: boolean}>) {
      state.game = action.payload.game;
      state.isFromBook = action.payload.isFromBook;
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
      state.isFromBook = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGameWords.pending, (state) => {
        state.isFetching = state.words.length === 0;
      })
      .addCase(fetchGameWords.fulfilled, (state, action) => {
        state.words = [...state.words, ...action.payload!];
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

export const selectProgress = (state: RootState) => Math.trunc(state.game.answers.length * (100 / state.game.words.length));