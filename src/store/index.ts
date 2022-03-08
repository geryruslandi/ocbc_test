import { configureStore } from '@reduxjs/toolkit'
import { loggedInUserSlice } from './login-data';


const store = configureStore({
    reducer: {
        loggedInUser: loggedInUserSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
