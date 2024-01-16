import axiosInstance from "./axios";
import Endpoints from "./endpoint";

export const RegisterAccount = {
    REGISTER: (data: any) => axiosInstance.post(Endpoints.REGISTRATION,data)
}
export const LoginAccount = {
    LOGIN: (data: any) => axiosInstance.post(Endpoints.LOGIN, data)
}