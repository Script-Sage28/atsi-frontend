'use client';
import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'antd';
import Link from 'next/link'
import { FaListUl,FaCheck } from 'react-icons/fa6';
import { TiThSmall } from 'react-icons/ti';
import { CustomLabel,LazyImages } from '@/components';
import { T_Brand, T_Categories, T_Product } from '@/types/productList';
import { BrandsRequest, CategoriesRequest } from '@/service/request';
import { Peso } from '@/helper/pesoSign';
import { FilterSort } from '@/helper/filterSort';
import { Skeleton,Select } from 'antd';
import { Filter } from '@/types/filter';
import clsx from 'clsx';
import useStore from '@/zustand/store/store';
import { loadBrandCategory, loadProducts, selector } from '@/zustand/store/store.provider';

const Sorting = [
    {
      id: 0,
      name: 'Sort By',
      url: '/#about',
      value:''
    },
    {
      id: 1,
      name: 'Lowest price',
      url: '/#about',
      value:'lowest'
    },
    {
      id: 2,
      name: 'Highest price',
      url: '/#Home',
      value:'highest'
    },
    {
      id: 3,
      name: 'A-Z',
      url: '/#Home',
      value:'asc'
    },
    {
      id: 4,
      name: 'Z-A',
      url: '/#Home',
      value:'desc'
    }
  ];

  
export default function Productpage() {
  const imgUrl = process.env.NEXT_PUBLIC_PUBLIC_STORAGE_ENDPOINT;
  const product = useStore(selector('product'))
  const shopby = useStore(selector('brand_category'))
  const [loading, setLoading] = useState<boolean>(false);
  const [isRow,setIsRow] = useState<boolean>(true)
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
          const data = {
            brand: results,
            category: results[0].Categories
          }
          loadBrandCategory(data)
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
          const data = {
            brand: results,
            category: catList.data.data
          }
          loadBrandCategory(data)
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
        loadProducts(response)
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
  setFiltered(prevFilter => ({
    ...prevFilter,
    category: {id:prevFilter.category?.id === id ? '' : id,name:prevFilter.category?.name === name ? '' : name}
  }));
};
const handleSorting = (data: {value:string}) =>{
  setFiltered(prevFilter => ({
    ...prevFilter,
    sort: data.value as '' | 'asc' | 'desc' | 'lowest' | 'highest' | undefined
  }));
};
console.log(shopby)
console.log(product)
  return (
    <>
    {product.list.length > 0 ? (<div className='w-full pl-4 md:pl-10 mb-10'>
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
                {shopby.category.map((data: T_Categories) => (
                    <li className='truncate flex items-center gap-2 cursor-pointer'
                    onClick={() =>{handleCategory(data.name,data.id)}}
                    key={data.id}>
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
              <Select
                style={{ width: '100%',height:'50px' }}
                size='middle'
                value={filter.brand?.name ? filter.brand?.name : 'Shop by Brands'}
                onChange={(value, option) =>handleBrandClick(value,option)}
                options={(shopby.brand.map((data:T_Brand) => ({
                  value: data.id,
                  label: data.name,
                })) as { value: string; label: string; }[])}
              />
              </div>
              <div className='w-full md:w-[450px] flex flex-nowrap gap-4 items-bottom'>
                <div className='flex-1 flex'>
               <Select
                  style={{ width: '100%',height:'50px' }}
                  size='middle'
                  value={filter.sort ? filter.sort : 'Sort by'}
                  onChange={(value) =>{handleSorting({value})}}
                  options={Sorting}
                />
                </div>
                <div className='flex justify-end items-end gap-2 shadow-border p-2 rounded-md'>
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
            {(shopby.brand.length > 0 && filter.brand?.name !== '') && (
              <div className='w-full md:w-11/12 flex flex-col items-start flex-wrap ml-12 pt-8 pb-4 border-b-2 border-gray-400'>
                <CustomLabel
                  children={shopby.brand[0].name}
                  variant='text'
                  addedClass='font-semibold text-xl uppercase tracking-widest mb-4'
                /> 
                <CustomLabel
                  children={shopby.brand[0].description}
                  variant='text'
                  addedClass='font-semibold text-md uppercase tracking-widest'
                /> 
              </div>
            )}
            <div className={clsx(isRow ? 'flex-row' : 'flex-col','w-full flex flex-wrap gap-4 md:p-8 justify-center items-center md:justify-normal')}>
              {product.list.map((data:T_Product,idx: React.Key | null | undefined) =>{
                const media = (data.media.length > 0 && data.media[0].url !== '') ? `${imgUrl}${data.media[0].url}` : '';
                const HTMLViewer = () => {
                  return (
                    <div dangerouslySetInnerHTML={{ __html: data.description }} />
                  );
                };
                return(
                <>
                {isRow ? <Link href={`/product/${data.id}`} as={`/product/${data.id}`} key={idx} 
                 className={clsx('w-[200px] md:w-[250px] h-max shadow-border rounded-t-lg hover:shadow-shine bg-gray-200 cursor-pointer')}>
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
                </Link> :
                <Link href={`/product/${data.id}`} as={`/product/${data.id}`} key={idx} 
                className={clsx('w-[500px] md:w-full h-max shadow-border flex flex-col md:flex-row rounded-t-lg hover:shadow-shine bg-gray-200 cursor-pointer')}>
                  <Skeleton style={{padding:8,height:'200px'}} loading={loading} avatar active>
                  <div className='w-full min-h-[150px]'>
                   <LazyImages
                     size='large'
                     images={media}
                     addedClass={'rounded-t-lg h-[250px] w-full'}
                     alt='No image'
                   />
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
                       addedClass="sm:text-sm md:text-md text-gray-500 font-semibold"
                   />
                    <div>
                      {HTMLViewer()}
                    </div>
                    </div>

                  <CustomLabel
                       children={Peso(data.price)} 
                       variant="text"
                       addedClass="text-2xl font-semibold text-[#ff4e4e] w-[20%]"
                   />
                  </div>
                  </Skeleton>
               </Link>}
                </>
              )})}
            </div>
            </div>

        </div>
    
    </div>) : 
    <Skeleton style={{padding:32,height:'500px'}} paragraph={{rows:8}} loading={loading} active />}
    </>
  )
}

