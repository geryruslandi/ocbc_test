import { configureStore } from '@reduxjs/toolkit'
import { loggedInUserSlice } from './logged-in-user/slice';

export default configureStore({
    reducer: {
        loggedInUser: loggedInUserSlice.reducer
    }
});
