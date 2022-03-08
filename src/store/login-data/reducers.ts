import { PayloadAction } from "@reduxjs/toolkit";
import { LoggedInUserState } from ".";
import { UserInterface } from "../../models/user";

export const reducers = {
    setUser(state: LoggedInUserState, action: PayloadAction<UserInterface>) {
        state.profile = action.payload;
    },

    setToken(state: LoggedInUserState, action: PayloadAction<String>) {
        state.token = action.payload;
    }
}
