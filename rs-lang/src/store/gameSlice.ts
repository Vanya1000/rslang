import { createSlice } from '@reduxjs/toolkit';

export type gameState = {
}

const initialState: gameState = {
};

// below we write asynchronism



export const gameSlice = createSlice({
  name: 'game',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  /* extraReducers: (builder) => {
    builder
  }, */
});

// below we export the actions
export const { } = gameSlice.actions;

export default gameSlice.reducer;
