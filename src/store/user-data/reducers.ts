import { PayloadAction } from "@reduxjs/toolkit";
import { LoggedInUserState } from ".";
import { UserInterface } from "../../models/User";

export const reducers = {
    setUser(state: LoggedInUserState, action: PayloadAction<UserInterface>) {
        state.profile = action.payload;
    },

    setToken(state: LoggedInUserState, action: PayloadAction<string>) {
        state.token = action.payload;
    },

    setBalance(state: LoggedInUserState, action: PayloadAction<number>){

    }
}
