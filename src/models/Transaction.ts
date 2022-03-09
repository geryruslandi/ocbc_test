import moment from 'moment';
import User, { UserInterface } from './User';

export interface TransactionInterface {
    transactionId: string,
    amount: number,
    transactionDate: string,
    description: string | null,
    transactionType: string,
    receipient: UserInterface
}

export default class Transaction implements TransactionInterface {
    transactionId: string;
    amount: number;
    transactionDate: string;
    description: string | null;
    transactionType: string;
    receipient: User;

    constructor(prop: TransactionInterface){
        this.transactionId = prop.transactionId;
        this.amount = prop.amount;
        this.transactionDate = prop.transactionDate;
        this.transactionType = prop.transactionType;
        this.receipient = new User(prop.receipient.accountHolder, prop.receipient.accountNo);
        this.description = prop.description || null;
    }

    public get parsedDate() {
        return moment(this.transactionDate);
    }

    public get startDate() {
        return this.parsedDate.clone().startOf('day')
    }
}
