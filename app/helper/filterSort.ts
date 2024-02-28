import { ProductsRequest } from '@/service/request';
import { Filter } from '@/types/filter';
import { T_Product } from '@/types/productList';

export const FilterSort = async(filter: Filter): Promise<T_Product[]> =>{
    try {
        let results;
        console.log(filter)
        const response = await ProductsRequest.GET_ALL({
            price: ((filter.sort === 'lowest' || filter.sort === 'highest') && filter.sort === 'highest') ? 'desc' : '',
            brandId: filter.brand?.id || '',
            categoryId: filter.category?.id || '',
            name: filter.name || '',
            status: filter.status || '',
            
        });

        results = response.data.data;

        if (filter.sort === 'asc' || filter.sort === 'desc') {
            results.sort((a: { name: string }, b: { name: string }) =>
                filter.sort === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
            );
        }
        return results;
    } catch (error) {
        console.log(error);
        throw error;
    }
}