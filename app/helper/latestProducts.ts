import { T_Product } from "@/types/productList";

export const getProductsWithinLast5Days = (productList: T_Product[] = []):T_Product[] =>{
    console.log(productList)
    const currentDate = new Date();
    const fiveDaysAgo = new Date(currentDate);
    fiveDaysAgo.setDate(currentDate.getDate() - 5);
    return productList.filter((product) => {
        const productDate = new Date(product.createdAt);
        return productDate >= fiveDaysAgo;
    });
}