'use client';
import React, { useState, useEffect, useCallback, ChangeEvent } from 'react'
import { Breadcrumb, Button, Checkbox, Input, List, Space } from 'antd';
import { debounce } from 'lodash';
import Link from 'next/link'
import { FaListUl } from 'react-icons/fa6';
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
import CustomNextImage from '@/components/image/CustomNextImage';
import ATSI from '../logo.png'

  
export default function Productpage() {
  const useDebounce = (func: any) => debounce(func, 1000);
  const imgUrl = process.env.NEXT_PUBLIC_PUBLIC_STORAGE_ENDPOINT;
  const product = useStore(selector('product'))
  const shopby = useStore(selector('brand_category'))
  const { Search } = Input;
  const countPerPage = 10;
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedBrand, setSelectedBrand] = useState<T_Brand[]>([]);
  const [isRow,setIsRow] = useState<boolean>(true)
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState<T_Product[]>([]);
  const [category,setCategory] = useState<T_Categories[]>([])
  const [selectedCategories, setSelectedCategories] = useState('');
  const [selectedBrands, setSelectedBrands] = useState('');
  const [productName,setProductName] = useState('')
  const [sortOrder, setSortOrder] = useState<string>('A-Z');
  const [filter,setFiltered] = useState<Filter>({
    category: {name:'',id:''},
    sort: '',
    brand:{name:'',id:''},
    name:'',
    status:'',
    price:''
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
            brand: shopby.brand,
            category: results[0].Categories
          }
          setSelectedBrand(shopby.brand?.filter((item:T_Brand) => item.id === filter.brand?.id))
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
        setInitLoading(true)
        setLoading(true)
        const response = await FilterSort(filter);
        loadProducts(response)
        setLoading(false)
        setInitLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
   void fetchProducts()
  },[filter.sort,filter.category,filter.brand,filter.name])


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
    if(selectedBrands){
      const cat = shopby.brand?.filter((data: { id: string; }) => data.id === selectedBrands)
      setSelectedBrand(cat)
      setCategory(cat[0].Categories)
    }else{
      setSelectedBrand([])
      setCategory(shopby.category)
    }
  },[selectedBrands])
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

      return isInSelectedCategories && inBrand && nameMatches;
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
  useEffect(() =>{
      const list = filteredAndSortedProducts?.map((item:any) => ({...item,loading:false}))
      setList(list)
  },[selectedCategories,selectedBrands,sortOrder,product.list,productName])

  console.log(productName)
  return (
    <>
    <div className='w-full bg-white text-black pl-4 md:pl-10 mb-10'>
        <div className='mb-4'>
        <Breadcrumb
            items={[{title: 'Home'},{title: <a href="">Products</a>}]}
        />
        <CustomLabel
            children="Products List" 
            variant="text"
            addedClass="sm:text-base md:text-2xl font-bold mb-8"
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
                  <ul className='list-none flex flex-wrap flex-row md:flex-col pt-4 justify-start gap-4'>
                  {category?.map((item:T_Categories,idx:number) =>(
                  <Checkbox name={item.name} checked={selectedCategories?.includes(item.id)} key={idx} onChange={() => handleCategoryChange(item.id)}>{item.name}</Checkbox>
                  ))}
                  </ul> 
                </div>
              </div>
            </div>

            {/* List */}
            <div className='w-full'>
            <div className='w-full md:w-11/12 md:w-1/2 pl-2 md:pl-8 mb-2 h-max'>
              <Search
                  placeholder="Search Products..."
                  className='bg-white rounded-md h-[50px]'
                  name='name'
                  size='large'
                  onChange={useDebounce(onSetFilter)}
                />
              </div>
            <div className='w-full flex gap-4 md:gap-12 items-start flex-wrap px-2 md:pr-12 md:pl-8 mb-4'>
              <div className='flex-1'>
              <Select
                style={{ width: '100%',height:'50px' }}
                size='middle'
                allowClear
                placeholder='Shopby Brands'
                onChange={handleBrandChange}
                options={(shopby.brand.map((data:T_Brand) => ({
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
                  loading={initLoading}
                  itemLayout="vertical"
                  pagination={{
                    onChange: (page) => {
                      console.log(page);
                    },
                    pageSize: 10,
                    position:'bottom',
                    align:'center'
                  }}
                  
                  dataSource={list}
                  renderItem={(data:any,idx:number) => (
                    <List.Item>
                      <div key={idx} className={clsx('w-full shadow-border rounded-t-lg hover:shadow-shine bg-gray-200 h-[370px] cursor-pointer')}>
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
                          <Link href={`/product/${data.id}`} as={`/product/${data.id}`} 
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
                      <Link href={`/product/${data.id}`} as={`/product/${data.id}`} key={idx} 
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
    </>
  )
}




