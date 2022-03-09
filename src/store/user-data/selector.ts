import { createSelector } from "@reduxjs/toolkit";
import moment from 'moment';
import _ from 'lodash';

import Transaction, { TransactionInterface } from "../../models/Transaction";
import User, { UserInterface } from "../../models/User";

export const loggedInUserSelector = createSelector(
    (profile: UserInterface) => profile,
    (profile) => profile != null ? new User(profile) : null
)

export const isSignedInSelector = createSelector(
    (profile: UserInterface) => profile,
    (profile) => profile != null
)

export const groupedTransactionsPerDay = createSelector(
    (transactions: TransactionInterface[]) => transactions,
    (transactions) => {

        const transactionsMapped = transactions
            .filter(transaction => transaction != null)
            .map(transaction => new Transaction(transaction))

        const groupedTransactions = _.groupBy(transactionsMapped, 'startDate');

        return groupedTransactions;
    }
)
