import { PayloadAction } from "@reduxjs/toolkit";
import { LoggedInUserState } from ".";
import { TransactionInterface } from "../../models/Transaction";
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
    },

    setToken(state: LoggedInUserState, action: PayloadAction<string>) {
        state.token = action.payload
    },

    setTransactions(state: LoggedInUserState, action: PayloadAction<TransactionInterface[]>) {
        state.transactions = action.payload;
    }
}
