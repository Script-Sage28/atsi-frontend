
import { T_Brand, T_Categories } from "@/types/productList";
import { StateCreator } from "zustand";

interface BrandCategoryState{
    loading: boolean;
    brand?: T_Brand[] | undefined;
    category?: T_Categories[] | undefined;
    responseMsg: string | null;
}

export interface BrandCategorySlice {
    brand_category: BrandCategoryState | null;
    loadBrandCategory: (payload: any) => void;
}

const initialState: BrandCategoryState = {
    loading: false,
    brand: [],  
    category:[],
    responseMsg: ''
}
const createBrandCatSlice: StateCreator<BrandCategorySlice> = (set) =>({
    brand_category: initialState,
    loadBrandCategory: async (payload) =>{
        try {
            set((state) => ({
                ...state,
                brand_category:{
                    ...state.brand_category,
                    loading: false,
                    brand: payload.brand,
                    category:payload.category,
                    responseMsg: null
                }
            }))
        } catch (error: any) {
          set((state) =>({
            ...state,
            brand_category:{
                ...state.brand_category,
                loading:false,
                responseMsg: error.response.data.message
            }
          }))
        }
    },
})

export default createBrandCatSlice