import { configureStore } from '@reduxjs/toolkit';

import userSlice from './userSlice';
import signinSlice from './signinSlice';
import errorSlice from './errorSlice';
import categorySlice from './categorySlice';
import subCategorySlice from './subCategorySlice';
import yearSlice from './yearSlice';


const store = configureStore({
  reducer: { 
    user: userSlice.reducer,
    signin: signinSlice.reducer,
    error:errorSlice.reducer,
    category:categorySlice.reducer,
    subcategory:subCategorySlice.reducer,
    year:yearSlice.reducer
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),

});

export default store;
