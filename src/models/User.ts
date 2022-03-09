export interface UserInterface {
    accountHolder?: string;
    accountNo: string;
    id?: string,
    name?: string
}

export default class User implements UserInterface{
    accountHolder?: string;
    accountNo: string;
    id?: string;
    name?: string;

    constructor(props: UserInterface){
        this.accountHolder = props.accountHolder;
        this.accountNo = props.accountNo;
        this.id = props.id;
        this.name = props.name;
    }
}
