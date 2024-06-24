import { configureStore } from '@reduxjs/toolkit';

import userSlice from './userSlice';
import signinSlice from './signinSlice';
import errorSlice from './errorSlice';
import categorySlice from './categorySlice';
import subCategorySlice from './subCategorySlice';


const store = configureStore({
  reducer: { 
    user: userSlice.reducer,
    signin: signinSlice.reducer,
    error:errorSlice.reducer,
    category:categorySlice.reducer,
    subcategory:subCategorySlice.reducer
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),

});

export default store;
