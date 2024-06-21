import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',
  initialState: { 
    name: '',
    hindiName: '',
    message:'',
    loading: false,
    success: false
   },
  reducers: {
    setSuccess(state, action) {
        state.success = action.payload.success;
      },
    setName(state, action) {
      state.name = action.payload.name;
    },
    setHindiName(state, action) {
        state.hindiName = action.payload.hindiName;
      },
      setLoading(state, action) {
        state.loading = action.payload.loading;
      },
      setMessage(state, action) {
        state.message = action.payload.message;
      },
  },
});

export const categoryActions = categorySlice.actions;

export default categorySlice;
