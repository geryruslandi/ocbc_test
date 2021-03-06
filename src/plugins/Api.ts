import Axios from "./Axios";
import Config from "react-native-config";

class Api{
    axios: Axios;

    constructor(axios: Axios) {
        this.axios = axios;
    }

    login(username: string, password: string) {
        return this.axios.post('/login', {
            username, password
        })
    }

    register(username: string, password: string) {
        return this.axios.post('/register', {username, password});
    }

    getBalance() {
        return this.axios.get('/balance')
    }

    getTransactionHistory() {
        return this.axios.get('/transactions')
    }

    getPayees() {
        return this.axios.get('/payees')
    }

    submitTransfer(payee: string, amount: number, description: string) {
        return this.axios.post('/transfer', {
            receipientAccountNo: payee,
            amount,
            description
        })
    }
}

export default new Api(new Axios(Config.BASE_API_URL))
