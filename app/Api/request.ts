import axiosInstance from "./axios";
import Endpoints from "./endpoint";

export const RegisterAccount = {
    REGISTER: (data: any) => axiosInstance.post(Endpoints.REGISTRATION,data)
}
export const LoginAccount = {
    LOGIN: (data: any) => axiosInstance.post(Endpoints.LOGIN, data)
}
export const ProductsRequest ={
    GET_ALL: (params:any) => axiosInstance.get(Endpoints.GET_ALL_PRODUCTS, { params })
}
export const CategoriesRequest ={
    GET_ALL: (params:any) => axiosInstance.get(Endpoints.CATEGORIES, { params })
}
export const BrandsRequest ={
    GET_ALL: (params:any) => axiosInstance.get(Endpoints.BRANDS, { params })
}
export const GetProductDetails ={
    INFO: (params:any) => axiosInstance.get(Endpoints.PRODUCT_DETAILS+params)
}
export const ProductReview ={
    RATE: (data:any) => axiosInstance.post(Endpoints.REVIEW,data)
}