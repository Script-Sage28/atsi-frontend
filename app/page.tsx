'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsFire } from 'react-icons/bs';
import { FaChevronDown } from 'react-icons/fa';
import { WiStars } from 'react-icons/wi';
import { ProductsRequest } from './Api/request';
import { CustomButton, CustomCard, CustomLabel } from './components';
import { getProductsWithinLast5Days } from './helper/latestProducts';
import { Peso } from './helper/pesoSign';
// eslint-disable-next-line camelcase
import { type T_ProductList } from './types/productList';
import Noimg from '../public/assets/noimg.png'


export default function Home() {

  // eslint-disable-next-line camelcase
  const initialProductList: T_ProductList = {
    onSale: [],
    latest: [],
    allProducts:[]
  }
  const [productList,setProductsList] = useState(initialProductList);
  const imgUrl = process.env.NEXT_PUBLIC_PUBLIC_STORAGE_ENDPOINT;

  useEffect(() =>{
    const fetchProducts = async ():Promise<void> =>{
      try {
        const response = await ProductsRequest.GET_ALL({
          price: '',
          brandId: '',
          categoryId: '',
          name: '',
          status: '',
        });
        const all = response.data.data.slice(0, 5);
        const sale = response.data.data?.filter((val: { isSaleProduct: boolean; }) => val.isSaleProduct);
        setProductsList(prev =>({
          ...prev,
          allProducts: all,
          onSale: sale,
          latest:getProductsWithinLast5Days(response.data.data).slice(0,5)
        }));        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    void fetchProducts()
  },[])

  return (
    <>
      {/* Landing Page */}
      <div className="container h-fit-to-screen-without-header md:p-52 max-w-full flex flex-row items-center">
        <div className="flex-grow">
          <div className="sm:w-full flex flex-col sm:gap-4 md:gap-10 pb-8 pl-4 md:pl-0 md:w-3/4">
            <div>
            <CustomLabel
              children="AuxyTech Technology Solutions Inc."
              variant="title"
              titleLevel={1}
              addedClass="title"
            />
            </div>

            <div>
              <CustomLabel
                children="We provide trusted security solutions: CCTV, PABX, Access Control, FDAS, PA System, Data Cabinets, Fiber Optics, AV Cables, and more, ensuring your safety and security."
                variant="text"
                addedClass="sm:text-base md:text-2xl"
              />
            </div>

            <div className="my-8 md:my-0 flex flex-row gap-5">
              <CustomButton
                addedClass="bg-[#00A3FF] p-4 md:p-7 rounded-md md:rounded-xl flex items-center justify-center md:text-xl"
                children="View Products"
              />
              <CustomButton
                addedClass="bg-white text-[#00A3FF] border border-[#00A3FF] p-4 md:p-7 rounded-md md:rounded-xl flex items-center justify-center md:text-xl"
                children="Browse More"
              />
            </div>
          </div>
        </div>
        {/* <div className="flex-grow items-center justify-center flex">
          <Image
            src="/assets/landing_image.png"
            width={450}
            height={450}
            alt="camera"
          />
        </div> */}

        <div className="absolute -bottom-2 md:bottom-5 left-1/2 animate-bounce">
          <FaChevronDown size={30} />
        </div>
      </div>

      {/* Products Section */}
      <div id="products" className="w-full flex flex-col gap-8 p-8 md:px-40 md:py-14">
        {/* Sales Products */}
        <div className="w-full h-auto flex flex-col gap-10">
          <div className="flex flex-row items-start justify-between">
            <CustomLabel
              children="Sales Products"
              variant="title"
              titleLevel={4}
            />
            <CustomButton
              children={<Link href={'/product'}>View All</Link>}
              buttonType="link"
              addedClass="text-base"
            />
          </div>

          <div className="flex flex-wrap gap-5">
            {productList.onSale.length > 0 && productList.onSale.map((product, idx) => {
              return (
              <CustomCard key={idx} addedClass="relative flex-grow sm:basis-2/5 md:basis-auto overflow-hidden">
                <div className="bg-red-700 absolute -left-[75px] -top-[7px] -rotate-45 p-3 w-[200px] z-50 text-center">
                  <div className="break-normal text-center flex flex-col items-center justify-center">
                    <BsFire color="white" size={20} />
                    <CustomLabel
                      children="Hot Deals"
                      variant="text"
                      addedClass="text-sm text-white font-semibold"
                    />
                  </div>
                </div>
                <div className="w-full flex-grow flex flex-col justify-start items-start">
                  <div className="flex-grow w-full min-h-[230px] flex justify-center items-center py-5">
                  {product.media.length > 0 && (
                    <Image
                      src={product.media.length === 0 && (product.media[0].url !== '') ? `${imgUrl}${product.media[0].url}` : Noimg}
                      alt={product.name}
                      width={130}
                      height={230}
                    />
                  )}
                  </div>

                  <div className="w-full px-5 pb-2">
                    <CustomLabel
                      children={product?.name}
                      variant="title"
                      titleLevel={5}
                    />
                    <div className="flex flex-col">
                      <CustomLabel
                        children={product?.category.name}
                        variant="text"
                        addedClass="font-semibold text-gray-400"
                      />

                      <CustomLabel
                        children={Peso(product?.price)}
                        variant="text"
                        addedClass="text-[#0038FF] text-2xl font-semibold"
                      />
                    </div>
                  </div>
                </div>
              </CustomCard>
            )})}
          </div>
        </div>

        {/* New Products */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-row items-start justify-between">
            <CustomLabel
              children="Latest Products"
              variant="title"
              titleLevel={4}
            />

            <CustomButton
              children={<Link href={'/product'}>View All</Link>}
              buttonType="link"
              addedClass="text-base"
            />
          </div>

          <div className="flex flex-wrap gap-5">
            {productList.latest?.length > 0 && productList.latest.map((product, idx) => (
              <CustomCard key={idx} addedClass="relative flex-grow sm:basis-2/5 md:basis-auto overflow-hidden">
                <div className="bg-green-700 absolute  -left-[70px] -top-[10px] -rotate-45 p-3 w-[200px] z-50 text-center">
                  <div className="break-normal text-center flex flex-col items-center justify-center">
                    <WiStars color="white" size={30} />
                    <CustomLabel
                      children="New Release"
                      variant="text"
                      addedClass="text-sm text-white font-semibold"
                    />
                  </div>
                </div>
                <div className="w-full flex-grow flex flex-col justify-start items-start">
                  <div className="flex-grow w-full min-h-[230px] flex justify-center items-center py-5">
                  {product.media.length > 0 && (
                    <Image
                      src={(product.media.length > 0 && product.media[0].url !== '') ? `${imgUrl}${product.media[0].url}` : Noimg}
                      alt={product.name}
                      width={130}
                      height={230}
                    />
                  )}
                  </div>
                  <div className="w-full px-5 pb-2">
                    <CustomLabel
                      children={product?.name}
                      variant="title"
                      titleLevel={5}
                    />
                    <div className="flex flex-col">
                      <CustomLabel
                        children={product?.category.name}
                        variant="text"
                        addedClass="font-semibold text-gray-400"
                      />

                      <CustomLabel
                        children={Peso(product?.price)}
                        variant="text"
                        addedClass="text-2xl font-semibold"
                      />
                    </div>
                  </div>
                </div>
              </CustomCard>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
