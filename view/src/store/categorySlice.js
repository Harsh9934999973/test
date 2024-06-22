import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',
  initialState: { 
    name: '',
    hindiName: '',
    message:'',
    loading: false,
    success: false,
    failed: false,
    categories:[]
   },
  reducers: {
    setFailed(state, action) {
      state.failed = action.payload.failed;
    },
    setCategories(state, action) {
      state.categories = action.payload.categories;
    },
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
