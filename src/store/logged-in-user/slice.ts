import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";
import { reducers } from "./reducers";

export const loggedInUserSlice = createSlice({
    name: 'user',
    initialState,
    reducers
});
