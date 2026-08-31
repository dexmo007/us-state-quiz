import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { actions, type GameState, reducer } from './game';

export const store = configureStore({
  reducer,
});

export type { GameState };
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export { actions };

export default store;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
