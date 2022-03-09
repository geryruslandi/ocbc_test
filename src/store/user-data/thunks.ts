import { createAsyncThunk } from "@reduxjs/toolkit";
import UserSync from "../../services/UserSync";
import store, { RootState } from "..";
import Api from "../../plugins/Api";

export const loginThunk = createAsyncThunk(
    'userData/login',
    async (data: any) => {
        const res = await Api.login(data.username, data.password);

        return {
            user: {
                accountHolder: res.data.username,
                accountNo: res.data.accountNo
            },
            token: res.data.token
        };
    }
);


export const syncThunk = createAsyncThunk(
    'userData/sync',
    async(arg, { getState }) => {
        const state: RootState = getState() as any as RootState;
        // TODO
        // somehow frequently this code didnt change the interceptor's header
        UserSync.init(state.userData.token as string)

        const [balance, transactions] = await Promise.all([UserSync.getUserBalance(), UserSync.getUserTransactionHistory()])

        return {
            balance,
            transactions
        }
    }
)

export const registerAndLogin = createAsyncThunk(
    'userData/registerAndLogin',
    async (data: {username: string, password: string}) => {
        const res = await Api.register(data.username, data.password);

        if(res.status != 200) {
            throw new Error(res.data.error)
        }

        const resLogin = await Api.login(data.username, data.password);

        return {
            user: {
                accountHolder: resLogin.data.username,
                accountNo: resLogin.data.accountNo
            },
            token: resLogin.data.token
        };
    }
)

export const submitTransfer = createAsyncThunk(
    'userData/transfer',
    async(data: {payee: string, amount: number, description: string}) => {
        const res = await Api.submitTransfer(data.payee, data.amount, data.description)

        if(res.status != 200) {
            throw new Error(res.data.error)
        }

        store.dispatch(syncThunk());
    }
)
