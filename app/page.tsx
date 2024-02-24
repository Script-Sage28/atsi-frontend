'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsFire } from 'react-icons/bs';
import { FaChevronDown } from 'react-icons/fa';
import { WiStars } from 'react-icons/wi';
import { CustomButton, CustomCard, CustomLabel } from './components';
import { getProductsWithinLast5Days } from './helper/latestProducts';
import { Peso } from './helper/pesoSign';
import { AllBlogs, ProductsRequest } from './service/request';
// eslint-disable-next-line camelcase
import { T_Blogs, type T_ProductList } from './types/productList';
import { loadProducts, selector } from './zustand/store/store.provider';
import Noimg from '../public/assets/noimg.png'
import useStore from '@/zustand/store/store';


export default function Home() {
  const products = useStore(selector('product'));
  // eslint-disable-next-line camelcase
  const initialProductList: T_ProductList = {
    allProducts: products.list?.slice(0,5),
    onSale: products.list?.filter((val: { isSaleProduct: boolean; }) => val.isSaleProduct).slice(0,5),
    latest: getProductsWithinLast5Days(products.list).slice(0,5)
  }
  const [productList,setProductsList] = useState(initialProductList);
  const [blogs,setBlogs] = useState([])
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
        const res = await AllBlogs.FETCH({

        })
        setBlogs(res.data.data.filter((item: { isDeleted: boolean; }) => !item.isDeleted))
        loadProducts(response.data.data)
        const all = response.data.data?.filter((item: { isDeleted: boolean; }) => !item.isDeleted).slice(0, 5);
        const sale = response.data.data?.filter((val: { isSaleProduct: boolean,isDeleted:boolean }) => val.isSaleProduct).slice(0,5);
        setProductsList(prev =>({
          ...prev,
          allProducts: all,
          onSale: sale,
          latest:getProductsWithinLast5Days(response.data.data?.filter((item: { isDeleted: boolean; }) => !item.isDeleted)).slice(0,5)
        }));        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    void fetchProducts()
  },[])
  console.log(blogs)
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
                children={<Link href={`/#product`}>View Products</Link>}
              />
              <CustomButton
                addedClass="bg-white text-[#00A3FF] border border-[#00A3FF] p-4 md:p-7 rounded-md md:rounded-xl flex items-center justify-center md:text-xl"
                children={<Link href={`/product`}>Browse More</Link>}
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
      <div id="products" className="w-full flex flex-col gap-8 p-8 md:px-40 md:py-8">
        {/* Sales Products */}
        {productList.onSale?.length > 0 && <div className="w-full h-auto flex flex-col gap-10">
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

          <div className="flex flex-wrap md:flex-wrap justify-start items-center gap-5">
            {productList.onSale?.length > 0 && productList.onSale.map((product, idx) => {
              return (
              <CustomCard addedClass='flex grow sm:max-w-[150px] md:max-w-[250px] basis-[150px] md:w-[150px] h-[350px]' key={idx}>
                <Link className='relative w-full overflow-hidden'
                 key={idx} href={`/product/${product.id}`} passHref>
                <div className="bg-red-700 absolute -left-[75px] -top-[7px] -rotate-45 p-3 w-[200px] z-40 text-center">
                  <div className="break-normal text-center flex flex-col items-center justify-center">
                    <BsFire color="white" size={20} />
                    <CustomLabel
                      children="Hot Deals"
                      variant="text"
                      addedClass="text-sm text-white font-semibold"
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col justify-start items-start">
                  <div className="flex-grow w-full min-h-[230px] flex justify-center items-center py-5">
                    <Image
                      src={(product.media.length > 0 && product.media[0].url !== '') ? `${imgUrl}${product.media[0].url}` : Noimg}
                      alt={product.name}
                      width={130}
                      height={230}
                    />
                  </div>

                  <div className="w-full px-5 pb-2">
                    <CustomLabel
                      children={product?.name}
                      variant="title"
                      titleLevel={5}
                      addedClass='line-clamp-1'
                    />
                    <div className="flex flex-col">
                      <CustomLabel
                        children={product?.category.name}
                        variant="text"
                        addedClass="font-semibold text-gray-400"
                      />
                     {((product?.discount) != null) && <CustomLabel
                        children={`${product?.discount}% Off`} 
                        variant="text"
                        addedClass="sm:text-base md:text-md text-gray-500 font-semibold"
                    />}

                    <CustomLabel
                        children={((product?.discountedPrice) != null) ? (<div className='flex gap-4'>
                        <p className='m-0'>{Peso(product?.discountedPrice)}</p>
                        <p className='m-0 line-through text-gray-600'>{Peso(product?.price)}</p>
                      </div>) : Peso(product?.price)} 
                        variant="text"
                        addedClass="text-lg font-semibold text-[#ff4e4e]"
                    />
                    </div>
                  </div>
                </div>
                </Link>
              </CustomCard>
            )})}
          </div>
        </div>}

        {/* New Products */}
        {productList.latest.length > 0 && <div className="flex flex-col gap-10">
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

          <div className="flex flex-wrap md:flex-nowrap gap-4 w-full justify-start items-center">
            {productList.latest?.length > 0 && productList.latest.map((product, idx) => (
              <CustomCard addedClass='flex grow sm:max-w-[150px] md:max-w-[250px] basis-[150px] md:w-[150px] h-[350px]' key={idx}>
              <Link className='relative w-full overflow-hidden'
               key={idx} href={`/product/${product.id}`} passHref>
                <div className="bg-green-700 absolute  -left-[70px] -top-[10px] -rotate-45 p-3 w-[200px] z-40 text-center">
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
                  <div className="flex-grow w-full min-h-[230px]  flex justify-center items-center py-5">
                    <Image
                      src={(product.media.length > 0 && product.media[0].url !== '') ? `${imgUrl}${product.media[0].url}` : Noimg}
                      alt={product.name}
                      width={130}
                      height={230}
                    />
                  
                  </div>
                  <div className="w-full px-5 pb-2">
                    <CustomLabel
                      children={product?.name}
                      variant="title"
                      titleLevel={5}
                      addedClass='line-clamp-1'
                    />
                    <div className="flex flex-col">
                      <CustomLabel
                        children={product?.category.name}
                        variant="text"
                        addedClass="font-semibold text-gray-400"
                      />
                    {((product?.discount) != null) && <CustomLabel
                        children={`${product?.discount}% Off`} 
                        variant="text"
                        addedClass="sm:text-base md:text-md text-gray-500 font-semibold"
                    />}
                    <CustomLabel
                        children={((product?.discountedPrice) != null) ? (<div className='flex gap-4'>
                        <p className='m-0'>{Peso(product?.discountedPrice)}</p>
                        <p className='m-0 line-through text-gray-600'>{Peso(product?.price)}</p>
                      </div>) : Peso(product?.price)} 
                        variant="text"
                        addedClass="text-lg font-semibold text-[#ff4e4e]"
                    />
                    </div>
                  </div>
                </div>
                </Link>
              </CustomCard>
            ))}
          </div>
        </div>}
      </div>
      <div id='blogs' className='flex justify-top flex-col gap-4 items-center p-8'>
        <h3 className='text-[#0029FF] font-semi-bold text-md'>Blogs</h3>
        <div className='h-max w-full flex flex-wrap item-center justify-center'>
          {blogs?.map((data:T_Blogs,idx) =>{
            return(
            <div className='bg-[#435EEA] shadow-custom w-[887px] h-[450px] rounded-md relative pt-16'>
                <div className='absolute -right-8 top-12 w-[323.26px] h-[310px] rounded-lg shadow-custom1'>
                <Image
                  src={imgUrl + data.imageUrl}
                  alt={data?.title}
                  className='object-fill w-full h-full rounded-lg'
                  width={130}
                  height={230}
                />
                </div>
                <div className='w-[481px] h-80 p-4 leading-7'>
                  <div className='px-8'>
                    <p className='text-[#C0C0C0]'>{new Date(data.createdAt).toLocaleDateString()}</p>
                    <p className='text-white font-bold text-2xl'>{data.title}</p>
                  </div>
                  <div className='p-8'>
                    <div className='text-white text-md font-semibold line-clamp-4' dangerouslySetInnerHTML={{ __html: data.content }} />
                  </div>
                  <div className='flex justify-center items-center absolute bottom-28 w-[450px]'>
                  <CustomButton
                      children={<Link href={'/product'}>Read More</Link>}
                      buttonType="link"
                      addedClass="text-md bg-white text-[#435EEA] font-bold hover:bg-white w-52 h-12"
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className='w-[887px] flex justify-end items-end'>
        <CustomButton
          children={<Link href={'/product'}>View more</Link>}
          buttonType="link"
          addedClass="text-base"
        />          
        </div>
      </div>
    </>
  );
}
