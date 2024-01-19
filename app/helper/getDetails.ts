import { GetProductDetails } from '@/Api/request'

export const FetchingDetails = async(id:string) =>{
    const imgUrl = process.env.NEXT_PUBLIC_PUBLIC_STORAGE_ENDPOINT;
    const response = await GetProductDetails.INFO(id)
    const results = response.data.data;
    const review = response.data.data.productReviews;
    const img = results.media.map((val: { url: any; }) => `${imgUrl}${val.url}`)
    return { results, img, review}
}