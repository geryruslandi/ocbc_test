import { PayloadAction } from "@reduxjs/toolkit";
import { LoggedInUserState } from ".";
import { UserInterface } from "../../models/User";

export const reducers = {
    logout(state: LoggedInUserState, action: PayloadAction){
        console.log('logout reducer');

        state.profile = null;
        state.token = null
    }
}
