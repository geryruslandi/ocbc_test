import { createSelector } from "@reduxjs/toolkit";
import { LoggedInUserState } from ".";
import User from "../../models/user";

export const loggedInUser = createSelector(
    (state: LoggedInUserState) => state.profile,
    (profile) => profile != null ? new User(profile.username, profile.accountNumber) : null
)
