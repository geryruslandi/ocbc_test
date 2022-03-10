import axios, { AxiosInstance } from "axios";
export default class Axios{

    axiosClient: AxiosInstance;
    token?: string

    constructor(baseUrl: string){
        this.axiosClient = axios.create({
            baseURL: baseUrl
        });
    }

    setToken(token: string) {
        this.token = token
    }

    get(path: string){
        return this.axiosClient.get(path, {
            headers: this.generateHeader()
        });
    }

    post(path: string, body: any){
        return this.axiosClient.post(path, body, {
            headers: this.generateHeader()
        });
    }

    generateHeader(): {Authorization: string} | {}{
        return this.token ? {Authorization : (this.token as string)} : {}
    }
}
