import {createSlice} from '@reduxjs/toolkit';

const globalSlice = createSlice({
  name: 'global',
  initialState: {},
  reducers: {
    onAppStart : (state, action) =>{
      //empty action triggered at the start of application to indicate application is started.
    },
  },
});

export const {onAppStart} = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
