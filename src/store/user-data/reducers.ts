import { PayloadAction } from "@reduxjs/toolkit";
import { LoggedInUserState } from ".";
import { UserInterface } from "../../models/User";

export const reducers = {
    logout(state: LoggedInUserState, action: PayloadAction){
        state.profile = null;
        state.token = null;
        state.transactions = [];
        state.balance = 0;
    },

    setUser(state: LoggedInUserState, action: PayloadAction<UserInterface>) {
        state.profile = action.payload
    }
}
