import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { 
      name:'', 
      email:'', 
      id:'',
      departmentId:'',
      divisionId:'',
      role:'',
      isSignedIn:false
    },
  reducers: {
      setEmail(state, action) {
        state.email = action.payload.email;
      },
      setName(state, action) {
        state.name = action.payload.name;
      },
      setId(state, action) {
        state.id = action.payload.id;
      },
      setDepartmentId(state, action) {
        state.departmentId = action.payload.departmentId;
      },
      setDivisionId(state, action) {
        state.divisionId = action.payload.divisionId;
      },
      setRole(state, action) {
        state.role = action.payload.role;
      },
      setSignedIn(state, action) {
        state.isSignedIn = action.payload.isSignedIn;
      }
  },
});

export const userActions = userSlice.actions;

export default userSlice;
