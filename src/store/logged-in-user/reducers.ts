import { PayloadAction } from "@reduxjs/toolkit";
import User from "../../models/user";
import { LoggedInUserState } from "./state";

export const reducers = {
    setUser(state: LoggedInUserState, action: PayloadAction<User>) {
        state.profile = action.payload;
    },

    setToken(state: LoggedInUserState, action: PayloadAction<String>) {
        state.token = action.payload;
    }
}
