import { createSlice } from '@reduxjs/toolkit';

const subCategorySlice = createSlice({
  name: 'subcategory',
  initialState: { 
    name: '',
    hindiName: '',
    message:'',
    loading: true,
    success: false,
    failed: false,
    subcategories:[]
   },
  reducers: {
    setFailed(state, action) {
      state.failed = action.payload.failed;
    },
    setSubCategories(state, action) {
      state.subcategories = action.payload.subcategories;
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
