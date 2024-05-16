/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
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

  const previousImages = (await parent).openGraph?.images || [];
  console.log('product info: ', product);
  console.log('previousImages: ', previousImages);
  console.log('image: ', product.img);

  return {
    title: product.results?.name?.trim(),
    description: product.results?.description,
    keywords: ['auxytech', 'product'],
    openGraph: {
      type: 'website',
      images: {
        url: product.img[0],
        width: 800,
        height: 600,
        alt: product.results?.name?.trim(),
      },
    },
    viewport: { width: '100%', height: '100%' },
  };
}

export default function Page({ params, searchParams }: Props) {
  return <ProductDetails params={params} />;
}
