/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import type { Metadata, ResolvingMetadata } from 'next';
import ProductDetails from './ProductDetails';
import { FetchingDetails } from '@/helper/getDetails';

type Props = {
  params: { id: string; brand: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const product = await FetchingDetails(id);

  console.log('product info: ', product);
  return {
    title: product.results?.name,
    openGraph: {
      images: [product.img],
    },
  };
}

export default function Page({ params, searchParams }: Props) {
  return <ProductDetails params={params} />;
}
