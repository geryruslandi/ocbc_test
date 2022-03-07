import User from "../../models/user";

export interface LoggedInUserState {
    profile: User | null,
    token: String | null
}

export const initialState: LoggedInUserState = {
    profile: null,
    token: null
}
