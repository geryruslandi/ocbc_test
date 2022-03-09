import moment from 'moment';
import User, { UserInterface } from './User';

export interface TransactionInterface {
    transactionId: string,
    amount: number,
    transactionDate: string,
    description: string | null,
    transactionType: TransactionType,
    sender?: UserInterface,
    receipient?: UserInterface,
}

export enum TransactionType{
    TRANSFER = 'transfer',
    RECEIVED = 'received',
}

export default class Transaction implements TransactionInterface {
    transactionId: string;
    amount: number;
    transactionDate: string;
    description: string | null;
    transactionType: TransactionType;
    sender?: User;
    receipient?: UserInterface;

    constructor(prop: TransactionInterface){
        this.transactionId = prop.transactionId;
        this.amount = prop.amount;
        this.transactionDate = prop.transactionDate;
        this.transactionType = prop.transactionType;

        if(prop.transactionType == TransactionType.TRANSFER) {
            this.receipient = new User(prop.receipient as UserInterface);
        }
        else if(prop.transactionType == TransactionType.RECEIVED){
            this.sender = new User(prop.sender as UserInterface);
        }
        this.description = prop.description || null;
    }

    public get parsedDate() {
        return moment(this.transactionDate);
    }

    public get startDate() {
        return this.parsedDate.clone().startOf('day')
    }

    getDelegatedUser() : User {
        return this.transactionType == TransactionType.TRANSFER
            ? this.receipient as User
            : this.sender as User
    }
}
