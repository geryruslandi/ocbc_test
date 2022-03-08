import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import User from "../../models/User";

export const loggedInUserSelector = createSelector(
    (state: RootState) => state.userData.profile,
    (profile) => profile != null ? new User(profile.username, profile.accountNumber) : null
)

export const isSignedInSelector = createSelector(
    
    (state: RootState) => state.userData.profile,
    (profile) => profile != null
)
