import { createAsyncThunk } from "@reduxjs/toolkit";
import UserSync from "../../services/UserSync";
import { RootState } from "..";
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
        UserSync.init(state.userData.token as string)
        return {
            balance: await UserSync.getUserBalance()
        }
    }
)
