import {combineReducers} from '@reduxjs/toolkit';
import {preferrenceReducer} from './preferencesSlice';

export const rootReducer = combineReducers({
  preferrenceReducer  : preferrenceReducer,
});
