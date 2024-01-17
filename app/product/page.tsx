'use client';
import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'antd';
import Link from 'next/link'
import { FaListUl,FaCheck } from 'react-icons/fa6';
import { TiThSmall } from 'react-icons/ti';
import { CustomLabel,LazyImages } from '@/components';
import { T_Brand, T_Categories, T_Product } from '@/types/productList';
import { BrandsRequest, CategoriesRequest } from '@/Api/request';
import { Peso } from '@/helper/pesoSign';
import { FilterSort } from '@/helper/filterSort';
import { Skeleton } from 'antd';
import { Filter } from '@/types/filter';
import clsx from 'clsx';

const Sorting = [
    {
      id: 0,
      name: 'Lowest price',
      url: '/#about',
      value:'lowest'
    },
    {
      id: 1,
      name: 'Highest price',
      url: '/#Home',
      value:'highest'
    },
    {
      id: 2,
      name: 'A-Z',
      url: '/#Home',
      value:'asc'
    },
    {
      id: 3,
      name: 'Z-A',
      url: '/#Home',
      value:'desc'
    }
  ];

export default function Productpage() {
  const imgUrl = process.env.NEXT_PUBLIC_PUBLIC_STORAGE_ENDPOINT;
  const [loading, setLoading] = useState<boolean>(false);
  const [product,setProducts] = useState<T_Product[]>([]);
  const [category,setCategory] = useState<T_Categories[]>([]);
  const [brand,setBrand] = useState<T_Brand[]>([])
  const [filter,setFiltered] = useState<Filter>({
    category: '',
    sort: 'asc',
    brand:'',
    name:'',
    status:''
  })

  useEffect(() =>{
    const fetchProducts = async ():Promise<void> =>{
      try {
        const catList = await CategoriesRequest.GET_ALL({
          name: '',
          status: '', 
        })
        const brandList = await BrandsRequest.GET_ALL({
          name: '',
          status: '', 
        })
        setBrand(brandList.data.data)
        setCategory(catList.data.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    void fetchProducts()
  },[])

  useEffect(() =>{
    const fetchProducts = async():Promise<void> =>{
      try {
        setLoading(true)
        const response = await FilterSort(filter);
        setProducts(response)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
   void fetchProducts()
  },[filter])
console.log(filter)
const handleBrandClick = (field: string, id: string) =>{
  setFiltered(prevFilter => ({
    ...prevFilter,
    [field]: prevFilter[field as keyof typeof prevFilter] === id ? '' : id,
  }));
};
  return (
    <>
    {(brand.length > 0 && category.length > 0) ? (<div className='w-full pl-4 md:pl-10 mb-10'>
        <div>
        <Breadcrumb
            items={[{title: 'Home'},{title: <a href="">Products</a>}]}
        />
        <CustomLabel
            children="Products List" 
            variant="text"
            addedClass="sm:text-base md:text-2xl font-bold"
        />
        </div>
        <div className='flex justify-end items-end gap-2 mr-8'>
            <div className='border-2 border-black-500 p-1 rounded-md'>
            <TiThSmall size={25} />
            </div>
            <div className='border-2 border-black-500 p-1 rounded-md'>
            <FaListUl size={25} />
            </div>
        </div>
        <div className='w-full flex flex-col md:flex-row gap-2'>
            {/* Filtering */}
            <div className='w-full md:w-48 h-full p-4 rounded-lg md:shadow-border'>
              <CustomLabel
                children="Categories"
                variant='text'
                addedClass='font-semibold text-xl uppercase tracking-widest'
              />
              <div className='w-full'>
                <ul className='list-none flex flex-wrap flex-row md:flex-col gap-4 m-4'>
                {category?.map((data,idx) => (
                    <li className='truncate flex items-center gap-2 cursor-pointer'
                    onClick={() =>{handleBrandClick('category',data.id)}}
                    key={idx}>
                    <div className='w-8 md:w-6'>
                    {filter.category === data.id && <FaCheck size={25} className='text-green-500'/>}
                    </div>
                    <p className={clsx('m-0',filter.category === data.id ? 'font-bold' : 'font-normal')}>{data.name}</p>
                    </li>
                ))}
                </ul> 
              </div>
              <CustomLabel
                children="Brands"
                variant='text'
                addedClass='font-semibold text-xl uppercase tracking-widest'
              />
              <div className='w-full'>
                <ul className='list-none flex flex-wrap flex-row md:flex-col gap-4 m-4'>
                {brand?.map((data,idx) => (
                    <li className='truncate flex items-center gap-2 cursor-pointer'
                    onClick={() =>{handleBrandClick('brand',data.id)}}
                    key={idx}>
                    <div className='w-8 md:w-6'>
                    {filter.brand === data.id && <FaCheck size={25} className='text-green-500'/>}
                    </div>
                    <p className={clsx('m-0',filter.brand === data.id ? 'font-bold' : 'font-normal')}>{data.name}</p>
                    </li>
                ))}
                </ul> 
              </div>
              <CustomLabel
                children="Sort by"
                variant='text'
                addedClass='font-semibold text-xl uppercase tracking-widest'
              />
              <div className='w-full'>
                <ul className='list-none flex flex-wrap flex-row md:flex-col gap-4 m-4'>
                {Sorting?.map((sort,idx) => (
                    <li className='truncate flex items-center gap-2 cursor-pointer'
                    onClick={() => {
                      setFiltered((prevFilter) => {
                        return{
                        ...prevFilter,
                        sort: prevFilter['sort'] === sort.value ? '' : sort.value as '' | 'asc' | 'desc' | 'lowest' | 'highest' | undefined
                        }
                      });
                    }}
                    key={idx}>
                    <div className='w-8 md:w-6'>
                    {(filter.sort === sort.value) && (
                      <FaCheck size={25} className='text-green-500' />
                    )}
                    </div>
                    <p className={clsx('m-0',filter.sort === sort.value ? 'font-bold' : 'font-normal')}>{sort.name}</p>
                    </li>
                ))}
                </ul> 
              </div>
            </div>
            {/* List */}
            <div className='w-full flex flex-wrap gap-4 md:p-8 justify-center md:justify-normal'>
              {product?.map((data,idx) =>(
                <Link href={`/product/${data.id}`} as={`/product/${data.id}`}
                 key={idx} className='w-2/5 md:w-[250px] h-max shadow-border rounded-t-lg hover:shadow-shine bg-gray-200 cursor-pointer'>
                   <Skeleton style={{padding:8,height:'200px'}} loading={loading} avatar active>
                   <div className='w-full h-full'>
                    {data.media.length > 0 && 
                    <LazyImages
                      size='large'
                      images={`${imgUrl}${data.media[0].url}`}
                      addedClass={'rounded-t-lg h-52'}
                      alt='No image'
                    />}
                   </div>
                   <div className='h-3/5 p-4 hover:bg-white flex flex-col gap-2'>
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
                   <CustomLabel
                        children={Peso(data.price)} 
                        variant="text"
                        addedClass="text-lg font-semibold text-[#ff4e4e]"
                    />
                   </div>
                   </Skeleton>
                </Link>
              ))}
            </div>
        </div>
    
    </div>) : 
    <Skeleton style={{padding:32,height:'500px'}} paragraph={{rows:8}} loading={loading} active />}
    </>
  )
}

