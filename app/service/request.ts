import axiosInstance from './axios';
import Endpoints from './endpoint';

export const BrandsRequest ={
    GET_ALL: async (params:any) => await axiosInstance.get(Endpoints.BRANDS, { params })
}
export const CategoriesRequest ={
    GET_ALL: async (params:any) => await axiosInstance.get(Endpoints.CATEGORIES, { params })
}
export const GetProductDetails ={
    INFO: async (params:any) => await axiosInstance.get(Endpoints.PRODUCT_DETAILS+params)
}
export const LoginAccount = {
    LOGIN: async (data: any) => await axiosInstance.post(Endpoints.LOGIN, data)
}
export const ProductReview ={
    RATE: async (data:any) => await axiosInstance.post(Endpoints.REVIEW,data)
}
export const ProductsRequest ={
    GET_ALL: async (params:any) => await axiosInstance.get(Endpoints.GET_ALL_PRODUCTS, { params })
}
export const RegisterAccount = {
    REGISTER: async (data: any) => await axiosInstance.post(Endpoints.REGISTRATION,data)
}
export const UserUpdate = {
    UPDATE_USER: async (data:any) => await axiosInstance.put(Endpoints.UPDATE_USER+data.id,data)
}