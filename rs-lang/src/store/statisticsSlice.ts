import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import StatisticsAPI from '../api/statistics';
import wordsAPI from '../api/words';
import { calculateUserWordData, createUserWordData, getCurrentDate, initialStatistics } from '../AuxiliaryFunctions/AuxiliaryFunctions';
import { StatisticsType } from '../types/type';
import { createUserWord, updateExistUserWord } from './bookSlice';
import { RootState } from './store';

type statisticsState = {
data: StatisticsType;
isFetching: boolean;
}

const initialState: statisticsState = {
  data: {} as StatisticsType,
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
      console.log(error);
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
      console.log(error);
    }
  }
);

export const createStatistics = createAsyncThunk<void,  void , {state: RootState}>(
  'statistics/upsertStatistics',
  async (_, { getState, dispatch }) => {
    const { user } = getState().user;
    try {
      if (user) {
        await StatisticsAPI.getStatistics(user.userId);
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(upsertStatistics(initialStatistics));
      }
    }
  }
);

export const addOneWordAsLearnedOrNew = createAsyncThunk<void,  'learned' | 'new', {state: RootState}>(
  'statistics/addLearnedWord',
  async (type, { getState, dispatch }) => {
    const { user } = getState().user;
    const path = type === 'learned' ? 'countLearnedWords' : 'countNewWords';
    try {
      if (user) {
        const {data, status} = await StatisticsAPI.getStatistics(user.userId);
        if (status === 200) {
          if (type === 'new') {
            data.learnedWords ? data.learnedWords = data.learnedWords + 1 : data.learnedWords = 1;
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
      console.log(error);
    }
  }
);


export const sendAllStatistics = createAsyncThunk<void,  {type: 'learned' | 'new' | 'plain', game: 'audioChallenge' | 'sprint', typeAnswer: 'right' | 'wrong', deleteOneWordAsLearned?: boolean, series?: number}, {state: RootState}>(
  'statistics/sendAllStatistics',
  async ({type, game, typeAnswer, deleteOneWordAsLearned, series}, { getState, dispatch }) => {
    const { user } = getState().user;
    const path = type === 'learned' ? 'countLearnedWords' : 'countNewWords';
    try {
      if (user) {
        const {data, status} = await StatisticsAPI.getStatistics(user.userId);
        if (status === 200) {
          delete data.id;
          const dateNow = getCurrentDate();
          const gamePath = data.optional.gamesStatistics[game];
          if (gamePath?.lastChanged !== dateNow) {
            gamePath!.countNewWords = null;
            gamePath!.right = null;
            gamePath!.wrong = null;
            gamePath!.lastChanged = null;
            gamePath!.longestSeries = null;
          }
          if (type === 'learned' || type === 'new') {
            if (type === 'learned') {
              data.learnedWords ? data.learnedWords = data.learnedWords + 1 : data.learnedWords = 1;
            }
            if (data.optional?.wordStatistics?.[path]?.[dateNow]) {
              data.optional!.wordStatistics[path]![dateNow] = String(Number(data.optional?.wordStatistics?.[path]![dateNow]) + 1);
            } else {
              data.optional!.wordStatistics![path] = {[dateNow]: '1'};
            }
            if (type === 'new') {
              data.optional.gamesStatistics?.[game]?.countNewWords 
              ? data.optional!.gamesStatistics![game]!.countNewWords = data.optional!.gamesStatistics![game]!.countNewWords! + 1
              :data.optional!.gamesStatistics![game]!.countNewWords! = 1;
            }
          } 
          if (data.optional?.gamesStatistics?.[game]?.[typeAnswer]) {
            data.optional!.gamesStatistics![game]![typeAnswer] = data.optional.gamesStatistics![game]![typeAnswer]! + 1;
          } else {
            data.optional!.gamesStatistics![game]![typeAnswer] = 1;
          }
          data.optional!.gamesStatistics![game]!.lastChanged = dateNow;
          
          if (deleteOneWordAsLearned) {
            if (data.learnedWords && data.learnedWords !== 0) {
              data.learnedWords = data.learnedWords - 1;
            }
            if (data.optional?.wordStatistics?.countLearnedWords?.[dateNow] && data.optional?.wordStatistics?.countLearnedWords?.[dateNow] !== '0') { // whether to go into the minus of the studied words
              data.optional!.wordStatistics!.countLearnedWords![dateNow] = String(Number(data.optional?.wordStatistics?.countLearnedWords![dateNow]) - 1);
            }
          }
          if (series) {
            console.log(series);
            if (gamePath?.longestSeries) {
              if (series > gamePath?.longestSeries) {
                gamePath!.longestSeries = series;
              } 
            } else {
              gamePath!.longestSeries = series;
            }
          }
          dispatch(upsertStatistics(data));
        }
      }
    } catch (error) {
      console.log(error);
      
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
          if (data.learnedWords && data.learnedWords !== 0) {
            data.learnedWords = data.learnedWords - 1;
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



export const sendStatistics = createAsyncThunk<void,  {type: 'right' | 'wrong', wordId: string, game: 'audioChallenge' | 'sprint', series?: number} , {state: RootState}>(
  'statistics/sendStatistics',
  async ({type, wordId, game, series}, { getState, dispatch }) => {
    const { user } = getState().user;
    try {
      if (user) {
        const {status, data} = await wordsAPI.getUserWordById(user!.userId, wordId);
        const wordData = data[0];
        if (status === 200) {
          if (!wordData.userWord) { //+ does not exist in the database
            dispatch(createUserWord({wordId, payload: createUserWordData(game, type)}));
            dispatch(sendAllStatistics({type: 'new', game, typeAnswer: type, series}));
            console.log('123');
          } else {// exists in the database
            if (wordData.userWord.optional?.isNew === 'false') { // the word has already participated in the game
              if (type === 'right') {
                const countRightAnswers = wordData.userWord.optional.countRightAnswers;
                const difficulty = wordData.userWord.difficulty;
                if ((countRightAnswers === '2' && difficulty === 'none') 
                  || (countRightAnswers === '2' && difficulty === undefined) 
                  || (countRightAnswers === '4' && difficulty === 'difficult')) {
                    dispatch(updateExistUserWord({wordId, payload: calculateUserWordData(game, type, wordData.userWord)}))
                    dispatch(sendAllStatistics({type: 'learned', game, typeAnswer: type, series}));
                } else {
                  dispatch(updateExistUserWord({wordId, payload: calculateUserWordData(game, type, wordData.userWord)}))
                  dispatch(sendAllStatistics({type: 'plain', game, typeAnswer: type, series}));
                }
                ;
              } else {
                if (wordData.userWord.difficulty === 'learned') {
                  dispatch(updateExistUserWord({wordId, payload: calculateUserWordData(game, type, wordData.userWord)}))
                  dispatch(sendAllStatistics({type: 'plain', game, typeAnswer: type, deleteOneWordAsLearned: true, series}));
                } else {
                  dispatch(updateExistUserWord({wordId, payload: calculateUserWordData(game, type, wordData.userWord)}))
                  dispatch(sendAllStatistics({type: 'plain', game, typeAnswer: type, series}));
                }
              }
            } else { //+ the word has not yet participated in the game
              dispatch(updateExistUserWord({wordId, payload: createUserWordData(game, type, wordData.userWord!)}));
              dispatch(sendAllStatistics({type: 'new', game, typeAnswer: type, series}));
              if (data[0].userWord?.difficulty === 'learned' && type === 'wrong') { // if it did not participate in the game and it has already been studied, then if it is wrong, it goes to none
                dispatch(sendAllStatistics({type: 'plain', game, typeAnswer: type, deleteOneWordAsLearned: true, series}));
              }
            }
          }
        }
      }
    } catch (error) {
    }
  }
)

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