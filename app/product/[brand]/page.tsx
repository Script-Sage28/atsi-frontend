'use client';
import React, { useState, useEffect, useCallback, ChangeEvent, useRef } from 'react'
import { Button,Input, InputNumber, List, Slider} from 'antd';
import { debounce } from 'lodash';
import Link from 'next/link'
import { FaListUl } from 'react-icons/fa6';
import { TiThSmall } from 'react-icons/ti';
import { CustomLabel,LazyImages } from '@/components';
import { T_Brand, T_Categories, T_LandingPage, T_Product } from '@/types/productList';
import { BrandsRequest, CategoriesRequest, LandingPageList } from '@/service/request';
import { Peso } from '@/helper/pesoSign';
import { Skeleton,Select } from 'antd';
import clsx from 'clsx';
import useStore from '@/zustand/store/store';
import { loadBrandCategory, selector } from '@/zustand/store/store.provider';
import { Swiper, SwiperSlide,type SwiperRef } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../../globals.css'
import { findHighestAndLowestPrices } from '@/helper/minMaxPrice';

  
export default function Productpage({ params }:{
  params: { brand: string };
}) {
  const useDebounce = (func: any) => debounce(func, 1000);
  const product = useStore(selector('product'))
  const shopby = useStore(selector('brand_category'))
  const { Search } = Input;
  const countPerPage = 25;
  const swiperRef = useRef<SwiperRef>(null);
  const brandParams = params.brand;
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedBrand, setSelectedBrand] = useState<T_Brand[]>([]);
  const [isRow,setIsRow] = useState<boolean>(true)
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState<T_Product[]>([]);
  const [category,setCategory] = useState<T_Categories[]>([])
  const [landingData,setLandingData] = useState<T_LandingPage | null>(null);
  const [selectedCategories, setSelectedCategories] = useState('');
  const [selectedBrands, setSelectedBrands] = useState(brandParams || '');
  const [productName,setProductName] = useState('')
  const [sortOrder, setSortOrder] = useState<string>('A-Z');
  const { maxPrice, minPrice } = findHighestAndLowestPrices(product.list);
  const [priceRange,setPriceRange] = useState<number[]>([maxPrice, minPrice])
  const [minInput, setMinInput] = useState<number | undefined>(0);
  const [maxInput, setMaxInput] = useState<number | undefined>(0);
  const imgUrl = process.env.NEXT_PUBLIC_PUBLIC_STORAGE_ENDPOINT;

  const onLoadMore = () => {
    setLoading(true);
    const nextItems = product.list?.slice(list.length, list.length + countPerPage);
    setList([...list, ...nextItems]);
    setLoading(false);
  };

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
  
  const onSetFilter = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setProductName(value)
  }, []);

  useEffect(() =>{
    async function Fetch(){
      const res = await BrandsRequest.GET_ALL({})
      const res1 = await CategoriesRequest.GET_ALL({})
      const res2 = await LandingPageList.GET_ALL()
      const payload = {
        brand:res.data.data,
        category:res1.data.data
      }
      setLandingData(res2.data.data)
      loadBrandCategory(payload)
      setInitLoading(false)
    }
    Fetch()
  },[])

  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
    setMinInput(minPrice);
    setMaxInput(maxPrice);
}, [minPrice, maxPrice]);

  useEffect(() =>{
    if(selectedBrands){
      const cat = shopby.brand?.filter((data: { id: string; }) => data.id === selectedBrands)
      console.log(cat)
      if(cat.length > 0){
        console.log(cat)
        setSelectedBrand(cat)
        setCategory(cat[0].Categories)
      }
    }else{
      setSelectedBrand([])
      setCategory(shopby.category)
    }
  },[selectedBrands])

  useEffect(() =>{
    const list = filteredAndSortedProducts?.map((item:any) => ({...item,loading:false}))
    setList(list)
},[selectedCategories,selectedBrands,sortOrder,product.list,productName,priceRange,minInput,maxInput])
const handleSliderChange = (value: number[]) => {
  setPriceRange(value);
  setMinInput(value[0]);
  setMaxInput(value[1]);
  };

  const handleMinInputChange = (value: number | null) => {
  if (typeof value === 'number') {
  setMinInput(value);
  setPriceRange([value, priceRange[1]]);
  } else {
  setMinInput(undefined);
  }
  };

  const handleMaxInputChange = (value: number | null) => {
  if (typeof value === 'number') {
  setMaxInput(value);
  setPriceRange([priceRange[0], value]);
  } else {
  setMaxInput(undefined);
  }
};

  const handleSortChange = (value: string) => {
      setSortOrder(value);
  };
  const handleBrandChange = (brandName: string) => {
    setSelectedBrands(brandName);
  };
   const handleCategoryChange = (categoryName: string) => {
      setSelectedCategories(categoryName === selectedCategories ? '' : categoryName);
  };
  const filteredAndSortedProducts = product.list?.filter((product:T_Product) => {
      const isInSelectedCategories = selectedCategories === '' || selectedCategories?.includes(product.categoryId);
      const inBrand = !selectedBrands || selectedBrands?.includes(product.brandId)
      const nameMatches = !productName || product.name?.toLowerCase().includes(productName.toLowerCase());
      const isInPriceRange = product.price >= Math.min(...priceRange) && product.price <= Math.max(...priceRange);
      console.log(isInPriceRange)
      return isInSelectedCategories && inBrand && nameMatches && isInPriceRange
  }).sort((a: { name: string; price: number; }, b: { name: string; price: number; }) => {
      if (sortOrder === 'A-Z') {
          return a.name.localeCompare(b.name);
      } else if (sortOrder === 'Z-A') {
          return b.name.localeCompare(a.name);
      } else if (sortOrder === 'Highest Price') {
          return b.price - a.price;
      } else if (sortOrder === 'Lowest Price') {
          return a.price - b.price;
      }
  })
  console.log(priceRange)

  return (
    <>
    <div className='w-full bg-white text-black mb-10'>
    <Swiper
        ref={swiperRef}
        slidesPerView={1}
        spaceBetween={10}
        modules={[Autoplay, Navigation]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
      {landingData && landingData.landingPageImages?.length > 0 && landingData.landingPageImages?.map((item:any,idx:number) =>{
        return idx === 0 ? (
          <SwiperSlide>
          <div className=" bg-[#f5f5f5] h-[700px] md:p-52 max-w-full flex flex-row items-center bg-cover bg-center'" style={{backgroundImage:`url(${imgUrl + item.url})`}}>
          <div className="flex-grow">
            <div className="sm:w-full flex flex-col sm:gap-4 md:gap-10 pb-8 pl-4 md:pl-0 md:w-3/4">
              <div>
              <CustomLabel
                children={landingData.title}
                variant="title"
                titleLevel={1}
                addedClass="title"
              />
              </div>
              <div>
                <CustomLabel
                  children={landingData.content}
                  variant="text"
                  addedClass="sm:text-base md:text-2xl"
                />
              </div>
            </div>
          </div>
          </div>
          </SwiperSlide>
        ) : (
          <SwiperSlide>
          <div className=" bg-[#f5f5f5] h-[700px] bg-cover bg-center md:p-52 max-w-full flex flex-row items-centerbg-cover bg-center'" style={{backgroundImage:`url(${imgUrl + item.url})`}}>
          </div>
          </SwiperSlide>
        )
      })}


    </Swiper>
    <div className='my-4 px-8 mt-16'>
      <div className='w-full justify-end items-end flex flex-col  mb-2 h-max mt-8'>
        <p className='w-[80%] text-left text-[20px] mb-2'>Search products:</p>
      <Search
          placeholder="Enter product here..."
          className='bg-white w-[80%] rounded-md h-[50px]'
          name='name'
          size='large'
          onChange={useDebounce(onSetFilter)}
        />
      </div>
        <div className='w-full flex flex-col md:flex-row gap-2'>
            {/* Filtering */}
            <div className='flex h-max flex-col gap-4'>
              <div className='flex flex-col shadow-border w-full md:w-80 p-4'>
                <p className='text-red-400 mb-4 font-bold'>DELIVERY</p>
                <p className='m-0'>METRO MANILA ONLY FOR ORDER</p>
                <p className='m-0'> 1000 PESO ABOVE. 2-3 working days</p>
              </div>
              <div className='w-full md:w-80 h-full p-4 rounded-lg md:shadow-border'>
                <CustomLabel
                  children={selectedBrand.length > 0 ? `${selectedBrand[0].name} Categories` : "All Categories"}
                  variant='text'
                  addedClass='font-semibold text-xl uppercase tracking-widest'
                />
                <div className='w-full h-max'>
                  <ul className='list-none flex flex-wrap pt-4 justify-start gap-4'>
                  {category?.map((item:T_Categories,idx:number) =>(
                    <>
                    <li key={idx} onClick={() => handleCategoryChange(item.id)} className={clsx('px-4 py-1 w-max rounded-sm cursor-pointer',selectedCategories === item.id && 'bg-orange-400 text-white border-2 border-orange-500')}>{item.name}</li>
                    </>
                  ))}
                  </ul> 
                </div>
                <div className='p-4 bg-white w-64'>
                  <p className='mb-2'>Price Range</p>
                  <div>
                  <div className='flex gap-2'>
                      <InputNumber
                          style={{ margin: '0 16px' }}
                          value={minInput}
                          placeholder='Min'
                          onChange={handleMinInputChange}
                      />
                      <InputNumber
                          style={{ margin: '0 16px' }}
                          value={maxInput}
                          placeholder='Max'
                          onChange={handleMaxInputChange}
                      />
                  </div>
                      <Slider 
                          range={{ draggableTrack: true }}
                          min={0}
                          max={maxPrice}
                          step={100}
                          value={priceRange}
                          onChange={handleSliderChange}
                      />
                  </div>
                  </div>
              </div>
            </div>

            {/* List */}
            <div className='w-full'>
            <div className='w-full flex gap-4 md:gap-12 items-start flex-wrap px-2 md:pr-12 md:pl-8 mb-4'>
              <div className='flex-1 flex-col md:flex-row flex md:items-center gap-4'>
                <label className='whitespace-nowrap h-full text-[20px]' htmlFor="">Shop by:</label>
              <Select
                style={{ width: '100%',height:'50px' }}
                size='middle'
                allowClear
                placeholder='Shop by Brands'
                value={selectedBrands || brandParams}
                onChange={handleBrandChange}
                options={(shopby.brand?.map((data:T_Brand) => ({
                  value: data.id,
                  label: data.name,
                })) as { value: string; label: string; }[])}
                optionLabelProp="label" 
              />
              </div>
              <div className='w-full md:w-[450px] flex flex-nowrap gap-4 items-bottom'>
                <div className='flex-1 flex'>

                  <Select
                  style={{ width: '100%',height:'50px' }}
                  size='middle'
                  allowClear
                  defaultValue="A-Z"
                  onChange={handleSortChange}
                  options={[
                      { value: 'A-Z', label: 'A-Z' },
                      { value: 'Z-A', label: 'Z-A' },
                      { value: 'Highest Price', label: 'Highest Price' },
                      { value: 'Lowest Price', label: 'Lowest Price' },
                  ]}
                  />
                </div>
                <div className='hidden md:flex lg:flex justify-end items-end gap-2 shadow-border p-2 rounded-md'>
                    <div onClick={() => { setIsRow(true)}}
                     className='border-2 border-black-500 p-1 rounded-md cursor-pointer'>
                    <TiThSmall size={20} />
                    </div>
                    <div onClick={() => { setIsRow(false)}}
                     className='border-2 border-black-500 p-1 rounded-md cursor-pointer'>
                    <FaListUl size={20} />
                    </div>
                </div>
              </div>
            </div>
            {(selectedBrand?.length > 0) && (
              selectedBrand?.map((item:T_Brand,idx) =>(
              <div key={idx} className='w-full md:w-11/12 flex flex-col items-start flex-wrap md:ml-12 pt-8 pb-4 border-b-2 border-gray-400 mb-4'>
                <CustomLabel
                  children={item.name}
                  variant='text'
                  addedClass='font-semibold text-xl uppercase tracking-widest mb-4'
                /> 
                <CustomLabel
                  children={item.description}
                  variant='text'
                  addedClass='font-semibold text-md uppercase tracking-widest'
                /> 
              </div>
              ))
            )}
            {list?.length > 0 ? (
            <div className={clsx(isRow ? 'flex-row' : 'flex-col','w-full flex flex-wrap gap-4 md:p-8 justify-stretch items-normal md:justify-normal')}>
                {isRow ? 
                  <List
                  className="demo-loadmore-list"
                  grid={{
                    gutter: 16,
                    xs: 2,
                    sm: 2,
                    md: 3,
                    lg: 4,
                    xl: 5,
                    xxl: 5,
                  }}
                  itemLayout="vertical"
                  pagination={{
                    onChange: (page) => {
                      console.log(page);
                    },
                    pageSize: 25,
                    position:'bottom',
                    align:'center'
                  }}
                  
                  dataSource={list}
                  renderItem={(data:any,idx:number) => (
                    <List.Item>
                      <div key={idx} className={clsx('w-full shadow-border rounded-t-lg hover:shadow-shine bg-gray-200 h-max pb-4 cursor-pointer')}>
                          <Skeleton style={{padding:8,height:'200px'}} loading={loading} avatar active>
                          <div className='w-full min-w-full min-h-[140px] flex justify-center items-center relative'>
                          <LazyImages
                            size='large'
                            images={data.media}
                            addedClass={'rounded-t-lg'}
                            alt='No image'
                          />
                            {data.status !== 'Available' && <div className='absolute px-4 py-2 bg-black text-white w-max'><p>{data.status === 'Out_of_Stock' ? data.status.replace(/_/g, ' ') : data.status}</p></div>}
                          </div>
                          <Link href={`/product/${selectedBrands}/${data.id}`} as={`/product/${selectedBrands}/${data.id}`} 
                          className='h-3/5 p-4 hover:bg-white flex flex-col gap-2'>
                          <CustomLabel
                              children={data.name} 
                              variant="text"
                              addedClass="sm:text-base md:text-xl font-bold line-clamp-1"
                          />
                          <CustomLabel
                              children={data.category.name} 
                              variant="text"
                              addedClass="sm:text-base md:text-md text-gray-500 font-semibold"
                          />
                          {(data.discount && data.discount !== 0) && <CustomLabel
                              children={`DISCOUNTED PRICE`} 
                              variant="text"
                              addedClass="sm:text-base md:text-md text-gray-500 font-semibold"
                          />}
                          <CustomLabel
                              children={(data.discountedPrice && data.discountedPrice !== 0) ? (<div className='flex gap-4'>
                              <p className='m-0'>{Peso(data.discountedPrice)}</p>
                              <p className='m-0 line-through text-gray-600'>{Peso(data.price)}</p>
                            </div>) : Peso(data.price)} 
                              variant="text"
                              addedClass="text-lg font-semibold text-[#ff4e4e]"
                          />
                          </Link>
                          </Skeleton>
                      </div>
                    </List.Item>
                  )}
                  /> :
                  <List
                  className="demo-loadmore-list"
                  loading={initLoading}
                  itemLayout="horizontal"
                  loadMore={loadMore}
                  dataSource={list}
                  renderItem={(data:any,idx:number) => (
                    <List.Item>
                      <Link href={`/product/${selectedBrands}/${data.id}`} as={`/product/${selectedBrands}/${data.id}`} key={idx} 
                      className={clsx('w-[500px] md:w-full h-max shadow-border flex flex-col md:flex-row rounded-t-lg hover:shadow-shine bg-gray-200 cursor-pointer')}>
                        <Skeleton style={{padding:8,height:'200px'}} loading={loading} avatar active>
                        <div className='w-full max-w-[350px] min-h-[250px] flex justify-center items-center relative py-4'>
                          <LazyImages
                            size='large'
                            images={data.media}
                            addedClass={'rounded-lg h-[250px] w-[250px]'}
                            alt='No image'
                          />
                          {data.status !== 'Available' && <div className='absolute px-4 py-2 bg-black text-white w-max'><p>{data.status === 'Out_of_Stock' ? data.status.replace(/_/g, ' ') : data.status}</p></div>}
                        </div>
                        <div className='p-4 hover:bg-white flex flex-col md:flex-row gap-2 w-full'>
                          <div className='w-[80%] flex justify-center items-center flex-col'>
                          <CustomLabel
                              children={data.name} 
                              variant="text"
                              addedClass="sm:text-base md:text-xl font-bold line-clamp-1"
                          />
                          <CustomLabel
                              children={data.category.name} 
                              variant="text"
                              addedClass="sm:text-sm md:text-md text-gray-500 font-semibold line-clamp- 4"
                          />
                          <div>
                          <div className='line-clamp-4' dangerouslySetInnerHTML={{ __html: data.description }} />
                          </div>
                          </div>

                        <CustomLabel
                              children={(data.discountedPrice && data.discountedPrice !== 0) ? (<div className='flex gap-8\2 flex-col'>
                              <p className='m-0'>{Peso(data.discountedPrice)}</p>
                              <p className='m-0 line-through text-gray-600'>{Peso(data.price)}</p>
                              </div>) : Peso(data.price)} 
                              variant="text"
                              addedClass="text-2xl font-semibold text-[#ff4e4e] w-[20%]"
                          />
                        </div>
                        </Skeleton>
                      </Link>
                    </List.Item>
                  )}
                  />}
            </div>) : (
            <div className='w-full h-96 flex justify-center items-center'>
            <p>No products Available</p>
            </div>
            )}
            </div>

        </div>
    </div>
    </div>
    </>
  )
}




