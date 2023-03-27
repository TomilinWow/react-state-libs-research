import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import storeReducer from './slices/storeSlice/storeSlice'
import weatherReducer from './slices/weatherSlice/weatherSlice'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
export const store = configureStore({
  reducer: {
    store: storeReducer,
    weather: weatherReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector