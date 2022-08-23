import { DataForRegistration, RegistrationResponseType, SignInFormType, UpdateTokenType, userType } from './../types/type';
import { createAsyncThunk, createSlice, Action, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import AuthService from '../api/auth';

export type userState = {
  user: userType | null;
  isSuccessRegistration: boolean;
  regErrorMessage: string;
}

const initialState: userState = {
  user: null,
  isSuccessRegistration: false,
  regErrorMessage: '',
  
};

// below we write asynchronism

export const registration = createAsyncThunk<void, DataForRegistration, {state: RootState}>(
  'user/registration',
  async (dataUser, {dispatch}) => {
    try {
      dispatch(setRegErrorMessage(''));
      const {status, data} = await AuthService.registration(dataUser.name, dataUser.email, dataUser.password);
      if (status === 200) {
        dispatch(setIsSuccessRegistration(true));
      }
    } catch (error) {
      dispatch(setRegErrorMessage(error.response?.data));
    }
  }
);

export const login = createAsyncThunk<void, SignInFormType, {state: RootState}>(
  'user/login',
  async (dataUser, {dispatch}) => {
    try {
      dispatch(setRegErrorMessage(''));
      const {data, status} = await AuthService.login(dataUser.email, dataUser.password);
      if (status === 200) {
        dispatch(setUserData(data));
      }
    } catch (error) {
      console.log(error.response.status)
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
    try {
      const {data} = await AuthService.getUser(getState().user.user!.userId);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
)



export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
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
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    /* builder */
  },
});

// below we export the actions
export const { setIsSuccessRegistration, setRegErrorMessage, setUserData, logout, updateToken } = userSlice.actions;

export default userSlice.reducer;
