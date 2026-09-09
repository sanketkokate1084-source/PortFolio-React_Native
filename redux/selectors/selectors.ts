import store from '../store/store';

export type RootState = ReturnType<typeof store.getState>;

export const selectPreferrence = (state: RootState) => state.preferrenceReducer;

export const selectRoot = (state: RootState) => state;
