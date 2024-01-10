'use client';
import React, { useState } from 'react'
import { Breadcrumb } from 'antd';
import Link from 'next/link'
import { FaListUl,FaCheck } from 'react-icons/fa6';
import { TiThSmall } from 'react-icons/ti';
import dummyProducts from './dummydata'
import { CustomLabel,LazyImages } from '@/components';


const Categories = [
    {
      id: 0,
      name: 'All',
      url: '/#Home',
    },
    {
      id: 1,
      name: 'Highlights',
      url: '/#about',
    },
    {
      id: 2,
      name: 'Fire Alarm',
      url: '/#Home',
    },
    {
      id: 3,
      name: 'CCTV',
      url: '/#Home',
    }
  ];
const Sorting = [
    {
      id: 0,
      name: 'Categories',
      url: '/#Home',
    },
    {
      id: 1,
      name: 'Lowest price',
      url: '/#about',
    },
    {
      id: 2,
      name: 'Highest price',
      url: '/#Home',
    },
    {
      id: 3,
      name: 'A-Z',
      url: '/#Home',
    },
    {
      id: 4,
      name: 'Z-A',
      url: '/#Home',
    }
  ];

export default function Productpage() {
  const [filter,setFiltered] = useState({
    category : 0,
    sort:0
  })
  return (
    <>
    <div className='w-full px-4 md:px-10'>
        <div>
        <Breadcrumb
            items={[
            {
                title: 'Home',
            },
            {
                title: <a href="">Products</a>,
            },
            ]}
        />
        <CustomLabel
            children="Products List" 
            variant="text"
            addedClass="sm:text-base md:text-2xl font-bold"
        />
        </div>
        <div className='flex justify-end items-end gap-2'>
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
                {Categories?.map((category,idx) => (
                    <li className='truncate flex items-center gap-2 cursor-pointer'
                    onClick={() =>{ setFiltered({...filter,category: category.id}); }}
                    key={idx}>
                    <div className='w-8 md:w-6'>
                    {filter.category === category.id && <FaCheck size={25} className='text-green-500'/>}
                    </div>
                     {category.name}
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
                    onClick={() =>{ setFiltered({...filter,sort: sort.id}); }}
                    key={idx}>
                    <div className='w-8 md:w-6'>
                    {filter.sort === sort.id && <FaCheck size={25} className='text-green-500'/>}
                    </div>
                     {sort.name}
                    </li>
                ))}
                </ul> 
              </div>
            </div>
            {/* List */}
            <div className='w-full flex flex-wrap gap-4 md:p-8'>
              {dummyProducts?.map((data,idx) =>(
                <Link href={`/product/${data.id}`} as={`/product/${data.id}`}
                 key={idx} className='w-full flex-grow basis-2/5 md:basis-52 h-max shadow-border rounded-t-lg hover:shadow-shine bg-gray-200 cursor-pointer'>
                   <div className='w-full h-full'>
                    <LazyImages
                      size='large'
                      images={data.images[0]}
                      addedClass={'rounded-t-lg h-52'}
                      alt='No image'
                    />
                   </div>
                   <div className='h-3/5 p-4 hover:bg-white flex flex-col gap-2'>
                   <CustomLabel
                        children={data.name} 
                        variant="text"
                        addedClass="sm:text-base md:text-2xl font-bold"
                    />
                    <CustomLabel
                        children={data.category} 
                        variant="text"
                        addedClass="sm:text-base md:text-md text-gray-500 font-semibold"
                    />
                   <CustomLabel
                        children={`₱${data.price}`} 
                        variant="text"
                        addedClass="text-lg font-semibold text-[#ff4e4e]"
                    />
                   </div>
                </Link>
              ))}
            </div>
        </div>
    
    </div>
    </>
  )
}

