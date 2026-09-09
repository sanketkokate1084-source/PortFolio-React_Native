import {ModeType} from '@/components/ui/gluestack-ui-provider';
import {PayloadAction, createReducer, createSlice} from '@reduxjs/toolkit';
import {merge} from 'lodash';

const preferrenceSlice = createSlice({
  name:'preferrence',
  initialState : {
    settings: {
      theme: 'system' as (ModeType | 'system'),
    },
  },
  reducers : {
    addThemePreferrence : (state, action:PayloadAction<ModeType>)=>{
      state.settings.theme = action.payload;
    },
    removePreferrence : (state, action)=>{
      
    },
  },
  
});

const {actions : preferrenceActions, reducer : preferrenceReducer} = preferrenceSlice;

const {addThemePreferrence, removePreferrence} = preferrenceActions;

export {addThemePreferrence, removePreferrence, preferrenceReducer};
