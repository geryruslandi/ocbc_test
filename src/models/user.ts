export interface UserInterface {
    username: string;
    accountNumber: string;
}

export default class User implements UserInterface{
    username: string;
    accountNumber: string;

    constructor(username: string, accountNumber: string){
        this.username = username;
        this.accountNumber = accountNumber;
    }
}
