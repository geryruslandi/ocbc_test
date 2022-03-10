import axios, { AxiosError, AxiosInstance, AxiosRequestHeaders } from "axios";
import { ToastAndroid } from "react-native";
import store from "../store";
import { loggedInUserSlice } from "../store/user-data";

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
        try {

            return this.axiosClient.get(path, {
                headers: this.generateHeader()
            });
        } catch(error) {
            this.handleError(error)
            throw error;
        }

    }

    async post(path: string, body: any){
        try {
            return this.axiosClient.post(path, body, {
                headers: this.generateHeader()
            });
        } catch(error) {
            this.handleError(error)
            throw error;
        }
    }

    handleError(error: AxiosError) {

        if(error.response && error.response.data.error.name == 'TokenExpiredError')
        {
            store.dispatch(loggedInUserSlice.actions.logout())
        }
    }

    generateHeader(): {Authorization: string} | {}{
        return this.token ? {Authorization : (this.token as string)} : {}
    }
}
