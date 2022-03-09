import moment from 'moment';
import User, { UserInterface } from './User';

export interface TransactionInterface {
    transactionId: string,
    amount: number,
    transactionDate: string,
    description: string | null,
    transactionType: string,
    sender: UserInterface
}

export default class Transaction implements TransactionInterface {
    transactionId: string;
    amount: number;
    transactionDate: string;
    description: string | null;
    transactionType: string;
    sender: User;

    constructor(prop: TransactionInterface){
        console.log(prop)
        this.transactionId = prop.transactionId;
        this.amount = prop.amount;
        this.transactionDate = prop.transactionDate;
        this.transactionType = prop.transactionType;
        this.sender = new User(prop.sender.accountHolder, prop.sender.accountNo);
        this.description = prop.description || null;
    }

    public get parsedDate() {
        return moment(this.transactionDate);
    }

    public get startDate() {
        return this.parsedDate.clone().startOf('day')
    }
}
