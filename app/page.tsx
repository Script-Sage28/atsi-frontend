'use client';
import { Avatar, Button, List, Skeleton } from 'antd';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsFire } from 'react-icons/bs';
import { FaChevronDown } from 'react-icons/fa';
import { WiStars } from 'react-icons/wi';
import { CustomButton, CustomCard, CustomLabel } from './components';
import { getProductsWithinLast5Days } from './helper/latestProducts';
import { Peso } from './helper/pesoSign';
import { AllBlogs, BrandsRequest, ProductsRequest } from './service/request';
// eslint-disable-next-line camelcase
import { T_Blogs, type T_ProductList } from './types/productList';
import { loadProducts, selector } from './zustand/store/store.provider';
import Noimg from '../public/assets/noimg.png'
import useStore from '@/zustand/store/store';
import { Swiper, SwiperSlide,type SwiperRef } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './globals.css';

export default function Home() {
  const products = useStore(selector('product'));
  // eslint-disable-next-line camelcase
  const initialProductList: T_ProductList = {
    allProducts: products.list?.slice(0,5),
    onSale: products.list?.filter((val: { isSaleProduct: boolean; }) => val.isSaleProduct).slice(0,5),
    latest: getProductsWithinLast5Days(products.list).slice(0,5)
  }
  const [loaded, setLoaded] = useState<boolean>(true);

  const swiperRef = useRef<SwiperRef>(null);         
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [brands,setBrands] = useState([])
  const [productsAll,setProductsAll] = useState([])
  const [productList,setProductsList] = useState(initialProductList);
  const [blogs,setBlogs] = useState<T_Blogs[]>([]);
  const [list, setList] = useState<T_Blogs[]>([]);
  const imgUrl = process.env.NEXT_PUBLIC_PUBLIC_STORAGE_ENDPOINT;
  const countPerPage = 1;

  const onLoadMore = () => {
    setLoading(true);
    const nextItems = blogs.slice(list.length, list.length + countPerPage);
    setList([...list, ...nextItems]);
    setLoading(false);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(false);
    }, 3000);
    return () => { clearTimeout(timer); };
  }, []);

  const loadMore =
  !initLoading && !loading ? (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button onClick={onLoadMore}>Load more</Button>
    </div>
  ) : null;

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
        const res = await AllBlogs.FETCH({})
        const res1 = await BrandsRequest.GET_ALL({})
        const re = await ProductsRequest.GET_ALL({isDeleted:false})
        setProductsAll(re.data.data)
        setBrands(res1.data.data)
        const list = res.data.data.filter((item: { isDeleted: boolean; }) => !item.isDeleted)
        const blogs = list?.map((item:any) => ({...item,loading:false}))
        setBlogs(blogs)
        setList(blogs.slice(0, countPerPage));
        loadProducts(response.data.data)
        setInitLoading(false)
        const all = response.data.data?.filter((item: { isDeleted: boolean; }) => !item.isDeleted).slice(0, 7);
        const sale = response.data.data?.filter((val: { isSaleProduct: boolean,isDeleted:boolean }) => val.isSaleProduct).slice(0,7);
        setProductsList(prev =>({
          ...prev,
          allProducts: all,
          onSale: sale,
          latest:response.data.data?.filter((item: { isNewRelease: boolean; }) => item.isNewRelease).slice(0,5)
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
      <div className='w-full '>
      <Swiper
        ref={swiperRef}
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        modules={[Pagination, Navigation]}
        className=''
      >
        <SwiperSlide>
        <div className="container bg-[#f5f5f5] h-fit-to-screen-without-header h-[700px] md:p-52 max-w-full flex flex-row items-center">
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
        <div className="absolute -bottom-2 md:bottom-5 left-1/2 animate-bounce">
          <FaChevronDown size={30} />
        </div>
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="container bg-[#f5f5f5] h-[700px] bg-cover bg-center md:p-52 max-w-full flex flex-row items-center" style={{backgroundImage:`url('https://firebasestorage.googleapis.com/v0/b/kyte-7c484.appspot.com/o/lpUVJzyzApTrvZ%2F661ec4d5-5716-4057-a5bd-a7e4f848e9c3.jpg?alt=media&token=bfbb6672-ecff-475f-95c7-0386fac1c955')`,aspectRatio:1}}>
        </div>
        </SwiperSlide>
      </Swiper>
      </div>

      {/* Products Section */}
      <div id="products" className="w-full bg-white flex flex-col gap-4 p-8 md:px-24 md:py-8">
        {/* Sales Products */}
        {brands?.map((item:any,idx:number) =>{
          const brandId = item.id;
          const all = productsAll?.filter((data:any) => data.brand.id === brandId).slice(0,7)
          console.log(all)
          return(
            <>
            {all.length === 0 ? null : (
              <div key={idx}>
                <div>
                <p className='text-2xl'>{item.name}</p>
                </div>
                <Swiper
                ref={swiperRef}
                slidesPerView={1}
                spaceBetween={0}
                navigation={true}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 4,
                  },
                  1024: {
                    slidesPerView: 5,
                  },
                }}
                modules={[Pagination, Navigation]}
                className=''
              >
                {all?.map((product:any, idx) => {
                
                return (
                    <SwiperSlide>
                    <CustomCard addedClass='flex w-[250px] sm:max-w-[190px] md:max-w-[250px] md:w-[180px] h-[300px] overflow-visible' key={idx}>
                      <Link className='relative w-full overflow-hidden'
                      key={idx} href={`/product/${product.id}`} passHref>
                        {product.isSaleProduct && <div className="bg-red-700 absolute -left-[75px] -top-[7px] -rotate-45 p-3 w-[200px] z-40 text-center">
                        <div className="break-normal text-center flex flex-col items-center justify-center">
                          <BsFire color="white" size={20} />
                          <CustomLabel
                            children="Hot Deals"
                            variant="text"
                            addedClass="text-sm text-white font-semibold"
                          />
                        </div>
                      </div>}
                        {product.isNewRelease && <div className="bg-green-700 absolute  -left-[70px] -top-[10px] -rotate-45 p-3 w-[200px] z-40 text-center">
                  <div className="break-normal text-center flex flex-col items-center justify-center">
                    <WiStars color="white" size={30} />
                    <CustomLabel
                      children="New Release"
                      variant="text"
                      addedClass="text-sm text-white font-semibold"
                    />
                  </div>
                </div>}
                      <div className="w-full flex flex-col justify-start items-start">
                        <div className=" w-full min-h-[200px] flex justify-center items-center py-5">
                        {loaded ? <Skeleton.Image active /> :                   
                          <Image
                            src={(product.media.length > 0 && product.media[0].url !== '') ? `${imgUrl}${product.media[0].url}` : Noimg}
                            alt={product.name}
                            width={130}
                            height={200}
                          />}

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
                              addedClass="font-semibold text-gray-400 line-clamp-1"
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
                    </SwiperSlide>
                  )})}
                </Swiper>
              </div>
            )}
            </>
          )
        })}
      </div>
      <div id='blogs' className='flex bg-white justify-top flex-col gap-4 items-center p-8'>
        <h3 className='text-[#0029FF] font-semi-bold text-md'>Blogs</h3>
        <div>
        <List
          className="demo-loadmore-list"
          loading={initLoading}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={list}
          renderItem={(item) => (
            <List.Item>
              <Skeleton avatar title={false} loading={item.loading} active>
              <div className='bg-[#435EEA] shadow-custom w-[400px] md:w-[887px] lg:w-[1087px] h-[450px] rounded-md relative md:pt-16'>
                <div className='flex md:grid justify-center items-center md:absolute  md:-right-8 top-12 w-full  md:w-[323.26px] h-32 md:h-[310px] rounded-lg md:bg-white md:shadow-custom1'>
                <Image
                  src={imgUrl + item.imageUrl}
                  alt={item?.title}
                  className='object-fill w-40 md:w-full mt-4 md:mt-0 h-full rounded-lg'
                  width={130}
                  height={230}
                />
                </div>
                <div className='md:w-[481px] h-80 p-4 leading-7'>
                  <div className='md:px-8'>
                    <p className='text-[#C0C0C0]'>{new Date(item.createdAt).toLocaleDateString()}</p>
                    <p className='text-white font-bold text-2xl'>{item.title}</p>
                  </div>
                  <div className='md:p-8'>
                    <div className='text-white text-md font-semibold line-clamp-4' dangerouslySetInnerHTML={{ __html: item.content }} />
                  </div>
                  <div className='flex justify-center items-center absolute bottom-12 md:bottom-28 w-full md:w-[450px]'>
                  <CustomButton
                      children={<Link href={'/product'}>Read More</Link>}
                      buttonType="link"
                      addedClass="text-md bg-white text-[#435EEA] font-bold hover:bg-white w-52 h-12"
                    />
                  </div>
                </div>
            </div>
              </Skeleton>
            </List.Item>
          )}
        />
        </div>
      </div>
    </>
  );
}
