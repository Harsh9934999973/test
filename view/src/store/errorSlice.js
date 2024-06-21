import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
  name: 'error',
  initialState: { 
    error:false
   },
  reducers: {
    setError(state, action) {
      state.error = action.payload.error;
    }
  },
});

export const errorActions = errorSlice.actions;

export default errorSlice;
