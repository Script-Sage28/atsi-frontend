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
import { Skeleton,Select, Space } from 'antd';
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
  const [brand,setBrand] = useState<T_Brand[]>([]);
  const [filter,setFiltered] = useState<Filter>({
    category: {name:'',id:''},
    sort: '',
    brand:{name:'',id:''},
    name:'',
    status:''
  })

  useEffect(() =>{
    const fetchProducts = async ():Promise<void> =>{
      try {
        if(filter.brand?.name !== ''){
          const brandList = await BrandsRequest.GET_ALL({
            name: filter.brand?.name,
            status: '', 
          })
          const results = brandList.data.data;
          setBrand(results)
          setCategory(results[0].Categories)
        }else{
          const brandList = await BrandsRequest.GET_ALL({
            name: '',
            status: '', 
          })
          const catList = await CategoriesRequest.GET_ALL({
            name: '',
            status: '', 
          })
          const results = brandList.data.data;
          setBrand(results)
          setCategory(catList.data.data)
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    void fetchProducts()
  },[filter.brand])

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
  },[filter.sort,filter.category,filter.brand])
  
  const handleBrandClick = (value: string, options: { value: string; label: string; } | { value: string; label: string; }[]) => {
    const selectedOptions = Array.isArray(options) ? options : [options];
  
    selectedOptions.forEach(option => {
      console.log(option.value, option.label);
      setFiltered((prevFilter) => ({
        ...prevFilter,
        brand: {
          id: prevFilter.brand?.id === option.value ? '' : option.value,
          name: prevFilter.brand?.name === option.label ? '' : option.label,
        },
      }));
    });
  };
const handleCategory = (name:string,id:string) =>{
  console.log(name)
  setFiltered(prevFilter => ({
    ...prevFilter,
    category: {id:prevFilter.category?.id === id ? '' : id,name:prevFilter.category?.name === name ? '' : name}
  }));
};
const handleSorting = (data: {value:string;name:string}) =>{
  setFiltered(prevFilter => ({
    ...prevFilter,
    sort: data.value as '' | 'asc' | 'desc' | 'lowest' | 'highest' | undefined
  }));
};
console.log(filter)
  return (
    <>
    {!loading ? (<div className='w-full pl-4 md:pl-10 mb-10'>
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
                    onClick={() =>{handleCategory(data.name,data.id)}}
                    key={idx}>
                    <div className='w-8 md:w-6'>
                    {filter.category?.name === data.name && <FaCheck size={25} className='text-green-500'/>}
                    </div>
                    <p className={clsx('m-0',filter.category?.name === data.name ? 'font-bold' : 'font-normal')}>{data.name}</p>
                    </li>
                ))}
                </ul> 
              </div>

            </div>
            {/* List */}
            <div className='w-full'>
            <div className='w-full flex gap-4 md:gap-12 items-center flex-wrap px-2 md:px-12 mb-4'>
              <div className='flex-1'>
              <CustomLabel
                children="Shop by Brands"
                variant='text'
                addedClass='font-semibold text-md uppercase tracking-widest'
              />
              <Select
                style={{ width: '100%' }}
                size='middle'
                value={filter.brand?.name}
                onChange={(value, option) =>handleBrandClick(value,option)}
                options={(brand?.map((data) => ({
                  value: data.id,
                  label: data.name,
                })) as { value: string; label: string; }[])}
              />
              </div>
              <div className='w-full md:w-[450px] flex flex-nowrap gap-4 items-bottom'>
                <div className='flex-1 flex flex-col'>
                <CustomLabel
                  children="Sort by"
                  variant='text'
                  addedClass='font-semibold text-md uppercase tracking-widest'
                /> 
               <Select
                  style={{ width: '100%' }}
                  size='middle'
                  onChange={(value) =>{handleSorting({value, name: value.name})}}
                  options={Sorting}
                />
                </div>
                <div className='flex justify-end items-end gap-2 shadow-border p-2 rounded-md'>
                    <div className='border-2 border-black-500 p-1 rounded-md'>
                    <TiThSmall size={20} />
                    </div>
                    <div className='border-2 border-black-500 p-1 rounded-md'>
                    <FaListUl size={20} />
                    </div>
                </div>
              </div>
            </div>
            {(brand.length > 0 && filter.brand?.name !== '') && (
              <div className='w-full md:w-11/12 flex flex-col items-start flex-wrap ml-12 pt-8 pb-4 border-b-2 border-gray-400'>
                <CustomLabel
                  children={brand[0].name}
                  variant='text'
                  addedClass='font-semibold text-xl uppercase tracking-widest mb-4'
                /> 
                <CustomLabel
                  children={brand[0].description}
                  variant='text'
                  addedClass='font-semibold text-md uppercase tracking-widest'
                /> 
              </div>
            )}
            <div className='w-full flex flex-wrap gap-4 md:p-8 justify-center md:justify-normal'>
              {product?.map((data,idx) =>{
                const media = (data.media.length > 0 && data.media[0].url !== '') ? `${imgUrl}${data.media[0].url}` : '';
                return(
                <Link href={`/product/${data.id}`} as={`/product/${data.id}`}
                 key={idx} className='w-[200px] md:w-[250px] h-max shadow-border rounded-t-lg hover:shadow-shine bg-gray-200 cursor-pointer'>
                   <Skeleton style={{padding:8,height:'200px'}} loading={loading} avatar active>
                   <div className='w-full min-h-[150px]'>
                    <LazyImages
                      size='large'
                      images={media}
                      addedClass={'rounded-t-lg h-52'}
                      alt='No image'
                    />
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
              )})}
            </div>
            </div>

        </div>
    
    </div>) : 
    <Skeleton style={{padding:32,height:'500px'}} paragraph={{rows:8}} loading={loading} active />}
    </>
  )
}

