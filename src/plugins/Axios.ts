import axios, { AxiosInstance, AxiosRequestHeaders } from "axios";
import { ToastAndroid } from "react-native";

export default class Axios{

    axiosClient: AxiosInstance;
    token?: string

    constructor(baseUrl: string){
        this.axiosClient = axios.create({
            baseURL: baseUrl
        });

        this.axiosClient.interceptors.response.use(
            (response) => response,
            (error) => {
                ToastAndroid.show(error.response.data.error, ToastAndroid.LONG)
                return Promise.reject(error)
            }
        )
    }

    setToken(token: string) {
        this.token = token
        return this;
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
