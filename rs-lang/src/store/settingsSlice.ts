import { createSlice } from '@reduxjs/toolkit';

export type settingsState = {
  isShowTranslation: boolean;
}

const initialState: settingsState = {
  isShowTranslation: true,
};




export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setIsShowTranslation: (state, action) => {
      state.isShowTranslation = action.payload;
    }
  },
});

// below we export the actions
export const { setIsShowTranslation } = settingsSlice.actions;

export default settingsSlice.reducer;