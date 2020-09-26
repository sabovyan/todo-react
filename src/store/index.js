import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer/index';

const initialState = { toDos: [], inputValue: '' };

let store = configureStore({
  reducer,
  preloadedState: initialState,
});
export default store;
