import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { 
    createUserSlice,
    createProductSlice,
    createBrandCatSlice
} from '../slices';
import { type BrandCategorySlice } from '../slices/brandcategory/brandcat';
import { type ProductSlice } from '../slices/product/product';
import { type UserSlice } from '../slices/user/user';

type TAppSlice = UserSlice & ProductSlice & BrandCategorySlice;
const useStore = create<TAppSlice>()(
    devtools(
        persist(
            (...args) =>({
                ...createBrandCatSlice(...args),
                ...createProductSlice(...args),
                ...createUserSlice(...args),
            }),
            {
             name:'atsi'
            }
        )
    )
)

export default useStore