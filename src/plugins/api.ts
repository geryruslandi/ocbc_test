import Axios from "./axios";
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
}

export default new Api(new Axios(Config.BASE_API_URL))
