import { createSelector } from "@reduxjs/toolkit";
import moment from 'moment';
import _ from 'lodash';

import Transaction, { TransactionInterface } from "../../models/Transaction";
import User, { UserInterface } from "../../models/User";

export const loggedInUserSelector = createSelector(
    (profile: UserInterface) => profile,
    (profile) => profile != null ? new User(profile.accountHolder, profile.accountNo) : null
)

export const isSignedInSelector = createSelector(
    (profile: UserInterface) => profile,
    (profile) => profile != null
)

export const groupedTransactionsPerDay = createSelector(
    (transactions: TransactionInterface[]) => transactions,
    (transactions) => {
        const transactionsMapped = transactions
            .map(transaction => new Transaction(transaction))

        const groupedTransactions = _.groupBy(transactionsMapped, 'startDate');

        return groupedTransactions;
    }
)
