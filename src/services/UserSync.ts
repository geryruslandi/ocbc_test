import Transaction, { TransactionInterface } from "../models/Transaction";
import api from "../plugins/Api";

class UserSync {

    init(userToken: string) {
        api.axios.setHeaders({
            Authorization: userToken
        })
    }

    async getUserBalance() : Promise<number> {
        const res = await api.getBalance();

        if(res.status != 200) {
            throw new Error(res.data.error)
        }

        return res.data.balance;
    }

    async getUserTransactionHistory(): Promise<Array<Transaction>>{
        const res = await api.getTransactionHistory();

        if(res.status != 200) {
            throw new Error(res.data.error)
        }

        return res.data.data.map((item: TransactionInterface) =>{
            return new Transaction(item)
        })
    }
}

export default new UserSync();
