import { ProductReview } from "@/service/request";
import { T_Product } from "@/types/productList";
import { StateCreator } from "zustand";

interface ProductState{
    loading: boolean;
    list?: T_Product[] | undefined;
    selected?: T_Product | undefined;
    responseMsg: string | null;
}

export interface ProductSlice {
    product: ProductState | null;
    loadProducts: (payload: any) => void;
    reviewProducts: (payload: any) => void;
}

const initialState: ProductState = {
    loading: false,
    list: [],  
    responseMsg: ''
}
const createProductSlice: StateCreator<ProductSlice> = (set) =>({
    product: initialState,
    loadProducts: async (payload) =>{
        try {
            set((state) => ({
                ...state,
                product:{
                    ...state.product,
                    loading: false,
                    list: payload,
                    responseMsg: null
                }
            }))
        } catch (error: any) {
          set((state) =>({
            ...state,
            list:{
                ...state.product,
                list: [],
                loading:false,
                responseMsg: error.response.data.message
            }
          }))
        }
    },
    reviewProducts: async(payload) =>{
        try {
            set((state) => ({
                ...state,
                product:{
                    ...state.product,
                    loading: true,
                    list: undefined,
                    responseMsg: null
                }
            }))
            const res = await ProductReview.RATE(payload)
            if(res.status === 200){
                if(!('message' in res.data)){
                    set((state) =>({
                        ...state,
                        product:{
                            ...state.product,
                            loading: false,
                            selected: res.data.data,
                            responseMsg:'',
                        }
                    }))
                }else{
                    set((state) =>({
                        ...state,
                        product:{
                            ...state.product,
                            loading: false,
                            responseMsg:  res.data.message
                        }
                    }))
                }
            }
        } catch (error: any) {
            set((state) =>({
                ...state,
                product:{
                    ...state.product,
                    loading: false,
                    responseMsg:  error.res.data.message
                }
            }))
        }
    },
})

export default createProductSlice