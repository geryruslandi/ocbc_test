export interface UserInterface {
    accountHolder: string;
    accountNo: string;
}

export default class User implements UserInterface{
    accountHolder: string;
    accountNo: string;

    constructor(accountHolder: string, accountNo: string){
        this.accountHolder = accountHolder;
        this.accountNo = accountNo;
    }
}
