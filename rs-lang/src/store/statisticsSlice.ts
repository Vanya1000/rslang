import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import StatisticsAPI from '../api/statistics';
import { getCurrentDate } from '../AuxiliaryFunctions/AuxiliaryFunctions';
import { StatisticsType } from '../types/type';
import { RootState } from './store';

type statisticsState = {
data: StatisticsType
isFetching: boolean;
}

const initialState: statisticsState = {
  data: {},
  isFetching: false,
};

export const fetchStatistics = createAsyncThunk<void,  void , {state: RootState}>(
  'statistics/fetchStatistics',
  async (_, { getState, dispatch }) => {
    const { user } = getState().user;
    try {
      if (user) {
        const {data, status} = await StatisticsAPI.getStatistics(user.userId);
        if (status === 200) {
          dispatch(setStatistics(data));
        }
      }
    } catch (error) {
    }
  }
);

export const upsertStatistics = createAsyncThunk<void,  StatisticsType , {state: RootState}>(
  'statistics/upsertStatistics',
  async (payload, { getState }) => {
    const { user } = getState().user;
    try {
      if (user) {
        await StatisticsAPI.upsertStatistics(user.userId, payload);
      }
    } catch (error) {
    }
  }
);

export const addOneWordAsLearnedOrNew = createAsyncThunk<void,  'learned' | 'new' , {state: RootState}>(
  'statistics/addLearnedWord',
  async (type, { getState, dispatch }) => {
    const { user } = getState().user;
    const path = type === 'learned' ? 'countLearnedWords' : 'countNewWords';
    try {
      if (user) {
        const {data, status} = await StatisticsAPI.getStatistics(user.userId);
        if (status === 200) {
          if (type === 'new') {
            data.learnedWords ? data.learnedWords = String(Number(data.learnedWords) + 1) : data.learnedWords = data.learnedWords = '1';
          }
          delete data.id;
          const dateNow = getCurrentDate();
          if (data.optional?.wordStatistics?.[path]![dateNow]) {
            data.optional!.wordStatistics![path]![dateNow] = String(Number(data.optional?.wordStatistics?.[path]![dateNow]) + 1);
          } else {
            data.optional!.wordStatistics![path]![dateNow] = '1';
          }
          dispatch(upsertStatistics(data));
        }
      }
    } catch (error) {
    }
  }
);

export const deleteOneWordAsLearned = createAsyncThunk<void,  void , {state: RootState}>(
  'statistics/deleteOneWordAsLearned',
  async (_, { getState, dispatch }) => {
    const { user } = getState().user;
    try {
      if (user) {
        const {data, status} = await StatisticsAPI.getStatistics(user.userId);
        if (status === 200) {
          if (data.learnedWords && data.learnedWords !== '0') {
            data.learnedWords = String(Number(data.learnedWords) - 1);
          }
          delete data.id;
          const dateNow = getCurrentDate();
          if (data.optional?.wordStatistics?.countLearnedWords![dateNow] && data.optional?.wordStatistics?.countLearnedWords![dateNow] !== '0') { // whether to go into the minus of the studied words
            data.optional!.wordStatistics!.countLearnedWords![dateNow] = String(Number(data.optional?.wordStatistics?.countLearnedWords![dateNow]) - 1);
          } 
          dispatch(upsertStatistics(data));
        }
      }
    } catch (error) {
    }
  }
);

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    setStatistics: (state, action: PayloadAction<StatisticsType>) => {
      state.data = action.payload;
    }
  },
  /* extraReducers: (builder) => {
    builder
  }, */
});

export const { setStatistics } = statisticsSlice.actions;

export default statisticsSlice.reducer;