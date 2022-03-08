import User from "../models/user";
import api from "../plugins/api";

class Auth{

    async login(userName: string, password: string) : Promise<User>{
        const res = await api.login(userName, password);

        if(res.status != 200) {
            throw new Error(res.data.error)
        }

        return new User(res.data.username as string, res.data.accountNo as string)
    }

}

export default new Auth();
