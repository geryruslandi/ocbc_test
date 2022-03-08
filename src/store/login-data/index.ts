import { createSlice } from "@reduxjs/toolkit";
import { ToastAndroid } from 'react-native';
import { UserInterface } from "../../models/user";
import { loginThunk } from "./thunks";
import { reducers } from "./reducers";

export interface LoggedInUserState {
    profile: UserInterface | null,
    token: String | null
}

const initialState: LoggedInUserState = {
    profile: null,
    token: null
}

export const loggedInUserSlice = createSlice({
    name: 'loginData',
    initialState,
    reducers,
    extraReducers: (builder) => {
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            state.profile = action.payload;

            console.log(state)
        });
        builder.addCase(loginThunk.rejected, (state, action) => {
            ToastAndroid.show("Credential failed", ToastAndroid.LONG);
        })
    },
});
