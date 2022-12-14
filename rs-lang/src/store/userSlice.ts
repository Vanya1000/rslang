import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import AuthService from '../api/auth';

import { DataForRegistration, SignInFormType, UpdateTokenType, userType } from './../types/type';
import { RootState } from './store';
import { createStatistics } from './statisticsSlice';


export type userState = {
  user: userType | null;
  isSuccessRegistration: boolean;
  regErrorMessage: string;
  somethingWrong: string;
  isFetching: boolean;
}

const initialState: userState = {
  user: null,
  isSuccessRegistration: false,
  regErrorMessage: '',
  somethingWrong: '',
  isFetching: false,
};

export const registration = createAsyncThunk<void, DataForRegistration, {state: RootState}>(
  'user/registration',
  async (dataUser, {dispatch}) => {
    try {
      dispatch(setRegErrorMessage(''));
      const {status} = await AuthService.registration(dataUser.name, dataUser.email, dataUser.password);
      if (status === 200) {
        dispatch(setIsSuccessRegistration(true));
      }
    } catch (error) {
      dispatch(setRegErrorMessage(error.response?.data));
    }
  }
);

export const login = createAsyncThunk<void, {dataUser: SignInFormType, cb: () => void}, {state: RootState}>(
  'user/login',
  async ({dataUser, cb}, {dispatch}) => {
    try {
      dispatch(setRegErrorMessage(''));
      const {data, status} = await AuthService.login(dataUser.email, dataUser.password);
      if (status === 200) {
        dispatch(setUserData(data));
        dispatch(createStatistics());
        cb();
      }
    } catch (error) {
      if (error.response.status === 403) {
        dispatch(setRegErrorMessage('Wrong email or password'));
      } else {
        dispatch(setRegErrorMessage(error.response?.data));
      }
    }
  }
)

export const getUser = createAsyncThunk<void, void, {state: RootState}>(
  'user/getUser',
  async (_, {getState}) => {
    await AuthService.getUser(getState().user.user!.userId);
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsSuccessRegistration: (state, action: PayloadAction<boolean>) => {
      state.isSuccessRegistration = action.payload;
    },
    setRegErrorMessage: (state, action: PayloadAction<string>) => {
      state.regErrorMessage = action.payload;
    },
    setUserData: (state, action: PayloadAction<userType>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    updateToken: (state, action: PayloadAction<UpdateTokenType>) => {
      state.user!.token = action.payload.token;
      state.user!.refreshToken = action.payload.refreshToken;
    },
    setSomethingWrong: (state, action: PayloadAction<string>) => {
      state.somethingWrong = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(registration.fulfilled, (state) => {
        state.isFetching = false;
      })
      .addCase(registration.rejected, (state) => {
        state.isFetching = false;
      })
      .addCase(login.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.isFetching = false;
      })
      .addCase(login.rejected, (state) => {
        state.isFetching = false;
      })
  }
  });

export const { setIsSuccessRegistration, setRegErrorMessage, setUserData, logout, updateToken, setSomethingWrong } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user.user;
