import { createSlice } from '@reduxjs/toolkit';

const yearSlice = createSlice({
  name: 'year',
  initialState: { 
    yearTypes: [],
    yearValues:[],
    yearValueId:'',
    yearTypeId:'',
    message:'',
    loading: true,
    success: false,
    failed: false,
    yearType:'',
    yearValue:''
   },
  reducers: {
    setYearTypes(state, action) {
      state.yearTypes = action.payload.yearTypes;
    },
    setyearValues(state, action) {
      state.yearValues = action.payload.yearValues;
    },
    setSuccess(state, action) {
        state.success = action.payload.success;
      },
    setYearValueId(state, action) {
      state.yearValueId = action.payload.yearValueId;
    },
    setYearTypeId(state, action) {
        state.yearTypeId = action.payload.yearTypeId;
      },
      setYearValue(state, action) {
        state.yearValue = action.payload.yearValue;
      },
      setYearType(state, action) {
          state.yearType = action.payload.yearType;
        },  
      setLoading(state, action) {
        state.loading = action.payload.loading;
      },
      setMessage(state, action) {
        state.message = action.payload.message;
      },
  },
});

export const yearActions = yearSlice.actions;

export default yearSlice;
