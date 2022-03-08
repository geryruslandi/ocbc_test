import auth from "../../services/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginThunk = createAsyncThunk(
    'loginData/login',
    async (data: any) => {
        const user = await auth.login(data.username, data.password)

        return {
            username: user.username,
            accountNumber: user.accountNumber
        };
    }
);
