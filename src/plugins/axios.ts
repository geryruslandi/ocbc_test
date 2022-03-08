import axios, { AxiosInstance } from "axios";

export default class Axios{

    axiosClient: AxiosInstance;

    constructor(baseUrl: string){
        this.axiosClient = axios.create({
            baseURL: baseUrl
        });
    }

    setHeaders(headers: any) {
        this.axiosClient.interceptors.request.use((config) => {
            config.headers = headers;
        });
    }

    get(path: string){
        return this.axiosClient.get(path);
    }

    post(path: string, body: any){
        return this.axiosClient.post(path, body);
    }
}
