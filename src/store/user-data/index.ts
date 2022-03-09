import { createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "../../models/User";
import { loginThunk, syncThunk } from "./thunks";
import { reducers } from "./reducers";
import { TransactionInterface } from "../../models/Transaction";

export interface LoggedInUserState {
    profile: UserInterface | null,
    token: string | null,
    balance: number,
    transactions: Array<TransactionInterface>
}

const initialState: LoggedInUserState = {
    profile: null,
    token: null,
    balance: 0,
    transactions: []
}

export const loggedInUserSlice = createSlice({
    name: 'userData',
    initialState,
    reducers,
    extraReducers: (builder) => {
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            state.profile = action.payload.user;
            state.token = action.payload.token;
        });
        builder.addCase(syncThunk.fulfilled, (state, action) => {
            state.balance = action.payload.balance;
            state.transactions = action.payload.transactions;
        });
    },
});

export const { logout } = loggedInUserSlice.actions;
