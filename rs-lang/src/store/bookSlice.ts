import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { CreateUserWordType, UserWordType, WordType } from '../types/type';
import wordsAPI from '../api/words';

import { RootState } from './store';
import { setSomethingWrong } from './userSlice';

export type bookState = {
  words: WordType[];
  currentGroup: number;
  currentPage: number;
  isFetching: boolean;
  isSend: boolean;
  currentPlayId: string | null;
}

const initialState: bookState = {
  words: [],
  currentGroup: 0,
  currentPage: 0,
  isFetching: false,
  isSend: false,
  currentPlayId: null,
};

export const fetchWords = createAsyncThunk<WordType[] | undefined, {group: number, page: number }, {state: RootState}>(
  'book/fetchWords',
  async ({group, page}, { getState, dispatch }) => {
    const { user } = getState().user;
    try {
      if (user?.message) {
        const response = await wordsAPI.getWordsAuth(group, page, user.userId);
        return response.data[0].paginatedResults;
      }
      const {status, data} = await wordsAPI.getWordsNoAuth(group, page);
      if (status === 200) {
        return data;
      }
    } catch (error) {
      dispatch(setSomethingWrong('Something wrong with get words'));
    }
  }
);

export const fetchHardWords = createAsyncThunk<WordType[] | undefined,  void , {state: RootState}>(
  'book/fetchHardWords',
  async (_, { getState, dispatch }) => {
    const { user } = getState().user;
    try {
      if (user) {
        const response = await wordsAPI.getHardWords(user.userId);
        return response.data[0].paginatedResults;
      }
    } catch {
      dispatch(setSomethingWrong('Something wrong with get difficult words'));
    }
  }
);

export const createUserWord = createAsyncThunk<void, {wordId: string, payload:UserWordType}, {state: RootState}>(
  'book/createUserWord',
  async ({wordId, payload}, { getState, dispatch }) => {
    const { user } = getState().user;
    try {
      const {status, data} = await wordsAPI.createUserWord(user!.userId, wordId, payload)
      if (status === 200) {
          dispatch(setCreateUserWord(data));
      }
    } catch (error) {
      dispatch(setSomethingWrong('Something wrong with create user words'));
    }
  }
);

export const deleteDifficultUserWord = createAsyncThunk<void, {wordId: string, payload:UserWordType}, {state: RootState}>(
  'book/deleteDifficultUserWord',
  async ({wordId, payload}, { getState, dispatch }) => {
    const { user } = getState().user;
    try {
      const {status, data} = await wordsAPI.updateExistUserWord(user!.userId, wordId, payload)
      if (status === 200) {
        dispatch(setDeleteUserWord(data));
      }
    } catch (error) {
      dispatch(setSomethingWrong('Something wrong with delete user words'));
    }
  }
);

export const updateExistUserWord = createAsyncThunk<void, {wordId: string, payload:UserWordType}, {state: RootState}>(
  'book/updateExistUserWord',
  async ({wordId, payload}, { getState, dispatch }) => {
    const { user } = getState().user;
    try {
      const {status, data} = await wordsAPI.updateExistUserWord(user!.userId, wordId, payload)
      if (status === 200) {
        dispatch(setCreateUserWord(data));
      }
    } catch (error) {
      dispatch(setSomethingWrong('Something wrong with update user words'));
    }
  }
);


export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setCurrentGroup: (state, action: PayloadAction<number>) => {
      state.currentGroup = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setCreateUserWord: (state, action: PayloadAction<CreateUserWordType>) => {
      const word = state.words?.find((word) => word._id === action.payload.wordId);
      if (word) {
        word.userWord = action.payload
      }
    },
    setDeleteUserWord: (state, action: PayloadAction<CreateUserWordType>) => {
      state.words = state.words?.filter(word => word._id !== action.payload.wordId);
    },
    setCurrentPlayId: (state, action: PayloadAction<string | null>) => {
      state.currentPlayId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWords.fulfilled, (state, action) => {
        state.words = action.payload!;
        state.isFetching = false;
      })
      .addCase(fetchWords.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchHardWords.fulfilled, (state, action) => {
        state.words = action.payload!;
        state.isFetching = false;
      })
      .addCase(fetchHardWords.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(createUserWord.pending, (state) => {
        state.isSend = true;
      })
      .addCase(createUserWord.fulfilled, (state) => {
        state.isSend = false;
      })
      .addCase(deleteDifficultUserWord.pending, (state) => {
        state.isSend = true;
      })
      .addCase(deleteDifficultUserWord.fulfilled, (state) => {
        state.isSend = false;
      })
      .addCase(updateExistUserWord.pending, (state) => {
        state.isSend = true;
      })
      .addCase(updateExistUserWord.fulfilled, (state) => {
        state.isSend = false;
      })
  },
});

export const { setCurrentGroup, setCurrentPage, setCreateUserWord, setDeleteUserWord, setCurrentPlayId } = bookSlice.actions;

export default bookSlice.reducer;
