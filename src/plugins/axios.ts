import axios, { AxiosInstance, AxiosRequestHeaders } from "axios";
import { ToastAndroid } from "react-native";

export default class Axios{

    axiosClient: AxiosInstance;

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

    setHeaders(headers: AxiosRequestHeaders) {
        this.axiosClient.interceptors.request.use((config) => {
            config.headers = headers;
            return config;
        });
    }

    get(path: string){
        return this.axiosClient.get(path);
    }

    post(path: string, body: any){
        return this.axiosClient.post(path, body);
    }
}
