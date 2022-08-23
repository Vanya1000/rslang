import { RootState } from './store';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CreateUserWordType, UserWordType, WordType } from '../types/type';
import wordsAPI from '../api/words';

export type bookState = {
  words: WordType[];
  currentGroup: number;
  currentPage: number;
  isFetching: boolean;
  isSend: boolean;
}

const initialState: bookState = {
  words: [],
  currentGroup: 0,
  currentPage: 0,
  isFetching: false,
  isSend: false,
};

// below we write asynchronism
export const fetchWords = createAsyncThunk<WordType[] | undefined, {group: number, page: number }, {state: RootState}>(
  'book/fetchWords',
  async ({group, page}, { getState }) => {
    const { user } = getState().user;
    try {
      if (user) {
        const response = await wordsAPI.getWordsAuth(group, page, user.userId);
        return response.data[0].paginatedResults;
      }
      const {status, data} = await wordsAPI.getWordsNoAuth(group, page);
      if (status === 200) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchHardWords = createAsyncThunk<WordType[] | undefined,  void , {state: RootState}>(
  'book/fetchHardWords',
  async (_, { getState }) => {
    const { user } = getState().user;
    try {
      if (user) {
        const response = await wordsAPI.getHardWords(user.userId);
        console.log(response.data);
        return response.data[0].paginatedResults;
      }
    } catch (error) {
      console.log(error);
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
      console.log(error);
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
      console.log(error);
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
      console.log(error);
    }
  }
);


export const bookSlice = createSlice({
  name: 'book',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setCurrentGroup: (state, action: PayloadAction<number>) => {
      state.currentGroup = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setCreateUserWord: (state, action: PayloadAction<CreateUserWordType>) => {
      const word = state.words.find((word) => word._id === action.payload.wordId);
      word!.userWord = action.payload;
    },
    setDeleteUserWord: (state, action: PayloadAction<CreateUserWordType>) => {
      state.words = state.words.filter(word => word._id !== action.payload.wordId);
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
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

// below we export the actions
export const { setCurrentGroup, setCurrentPage, setCreateUserWord, setDeleteUserWord } = bookSlice.actions;

export default bookSlice.reducer;
