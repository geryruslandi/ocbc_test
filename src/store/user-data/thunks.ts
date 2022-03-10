import { createAsyncThunk } from "@reduxjs/toolkit";
import UserSync from "../../services/UserSync";
import store, { RootState } from "..";
import Api from "../../plugins/Api";

export const loginThunk = createAsyncThunk(
    'userData/login',
    async (data: any) => {

        try {
            const res = await Api.login(data.username, data.password);

            return {
                user: {
                    accountHolder: res.data.username,
                    accountNo: res.data.accountNo
                },
                token: res.data.token
            };
        } catch(err) {
            throw new Error((err as any).response.data.error)
        }
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
            balance ,
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

        store.dispatch(loginThunk({
            username: data.username,
            password: data.password,
        }));

        return 0;
    }
)

export const submitTransfer = createAsyncThunk(
    'userData/transfer',
    async(data: {payee: string, amount: number, description: string}) => {
        try {

            await Api.submitTransfer(data.payee, data.amount, data.description)

            store.dispatch(syncThunk());
        } catch(err) {
            throw new Error((err as any).response.data.error);
        }
    }
)
