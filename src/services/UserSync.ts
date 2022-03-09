import { TransactionInterface } from "../models/Transaction";
import api from "../plugins/Api";

class UserSync {

    init(userToken: string) {
        api.axios.setToken(userToken)
    }

    async getUserBalance() : Promise<number> {
        const res = await api.getBalance();

        if(res.status != 200) {
            throw new Error(res.data.error)
        }

        return res.data.balance;
    }

    async getUserTransactionHistory(): Promise<Array<TransactionInterface>>{
        const res = await api.getTransactionHistory();

        if(res.status != 200) {
            throw new Error(res.data.error)
        }

        return res.data.data;
    }
}

export default new UserSync();
