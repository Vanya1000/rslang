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

// below we write asynchronism


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
      // console.log(error);
    }
  }
);



const stat: StatisticsType = {
  learnedWords: '0',
  optional: {
    wordStatistics: {
      countNewWords: {
        '2022.8.21': '2',
        '2022.8.22': '7',
        '2022.8.23': '6',
        '2022.8.24': '9',
        '2022.8.25': '12',
        '2022.8.26': '15',
      },
      countLearnedWords: {
        '2022.8.21': '2',
        '2022.8.22': '3',
        '2022.8.23': '4',
        '2022.8.24': '3',
        '2022.8.25': '5',
        '2022.8.26': '3',
      }
    },
    gamesStatistics: {
      audioChallenge: {
        lastChanged: '2022.8.26',
        countNewWords: '12',
        right: '4',
        wrong: '3',
        longestSeries: '5',
      },
      sprint: {
        lastChanged: '2022.8.26',
        countNewWords: '5',
        right: '6',
        wrong: '2',
        longestSeries: '10',
      }
    }
  }
}



export const upsertStatistics = createAsyncThunk<void,  StatisticsType , {state: RootState}>(
  'statistics/upsertStatistics',
  async (payload, { getState, dispatch }) => {
    const { user } = getState().user;
    try {
      if (user) {
        await StatisticsAPI.upsertStatistics(user.userId, payload);
      }
    } catch (error) {
      // console.log(error);
    }
  }
);

export const addLearnedWord = createAsyncThunk<void,  void , {state: RootState}>(// адаптировать и для новых слов
  'statistics/addLearnedWord',
  async (_, { getState, dispatch }) => {
    const { user } = getState().user;
    try {
      if (user) {
        const {data, status} = await StatisticsAPI.getStatistics(user.userId);
        if (status === 200) {
          data.learnedWords ? data.learnedWords = String(Number(data.learnedWords) + 1) : data.learnedWords = data.learnedWords = '1';
          delete data.id;
          const dateNow = getCurrentDate();
          if (data.optional?.wordStatistics?.countLearnedWords![dateNow]) {
            console.log(data.optional!.wordStatistics!.countLearnedWords![dateNow]);
            data.optional!.wordStatistics!.countLearnedWords![dateNow] = String(Number(data.optional?.wordStatistics?.countLearnedWords![dateNow]) + 1);
            console.log(data.optional!.wordStatistics!.countLearnedWords![dateNow]);
          } else {
            data.optional!.wordStatistics!.countLearnedWords![dateNow] = '1';
            console.log(data.optional!.wordStatistics!.countLearnedWords![dateNow]);
          }
          dispatch(upsertStatistics(stat));
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatistics.pending, (state, action) => {
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
      })

  },
});

export const { setStatistics } = statisticsSlice.actions;

export default statisticsSlice.reducer;