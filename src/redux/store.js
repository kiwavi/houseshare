import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './name';

export const store = configureStore({
    reducer: {
	message: messageReducer
    }
});
