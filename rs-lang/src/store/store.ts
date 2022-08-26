import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import userSlice from './userSlice';
import bookSlice from './bookSlice';
import gameSlice from './gameSlice';
import audioChallengeSlice from './audioChallengeSlice';
import settingsSlice from './settingsSlice';


const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['user'],
}

const bookPersistConfig = {
  key: 'book',
  storage,
  whitelist: ['currentGroup', 'currentPage'],
}

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userSlice),
  book: persistReducer(bookPersistConfig, bookSlice),
  game: gameSlice,
  audioChallenge: audioChallengeSlice,
  settings: settingsSlice,
});

const persistConfig = { // Where wil be saved
  key: 'root', // key for creating more than one persist
  storage, // storage: storage
  whitelist: ['user', 'settings'], // what will be saved
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store); // wrapper for store

export type StoreType = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
