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
}

export default new UserSync();
