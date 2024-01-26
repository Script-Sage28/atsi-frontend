/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';
import React, { type ChangeEvent, useCallback, useState, useEffect } from 'react';
import { Layout, Input } from 'antd';
import clsx from 'clsx';
import { debounce } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { IoMenu } from 'react-icons/io5';
import { MdOutlineClear } from 'react-icons/md';
import { ProductsRequest } from '@/Api/request';
import useUserStore from '@/store/userStore';
import { T_Product } from '@/types/productList';

export default function CustomHeader() {
  const useDebounce = (func: any) => debounce(func, 1000);
  const [open,setOpen] = useState(false)
  const user = useUserStore((state) => state.user);
  const [product,setProducts] = useState<T_Product[]>([])
  const [filter, setFilter] = useState({
    name: '',
    status: '',
  });
  const { Header } = Layout;
  const { Search } = Input;
  const links = [
    {
      id: 0,
      name: 'Home',
      url: '/#Home',
    },
    {
      id: 1,
      name: 'About',
      url: '/#about',
    },
    {
      id: 2,
      name: 'Contact Us',
      url: '/#Home',
    },
    {
      id: 3,
      name: 'Products',
      url: '/product',
    },
    {
      id: 4,
      name: user ? user.username : 'Signin',
      url:  user ? '/' : '/login',
    },
  ];
  const handleOpenChange = () =>{
    setOpen(!open)
  }

  const onSetFilter = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);
  const SearchProduct = async() =>{
    console.log('sera')
    if(filter.name){
      const res = await ProductsRequest.GET_ALL(filter);
      setProducts(res.data.data)
    }
  }
  return (
    <>
    <Header className="header p-2 md:p-8 w-full flex justify-between md:justify-none items-center">
      <div className="flex-1 w-full flex justify-between items-center ">
        {open && <MdOutlineClear size={40} className='md:hidden ease-in-out cursor-pointer' 
        onClick={handleOpenChange} />}
        {!open && <IoMenu size={40} className='md:hidden ease-in-out cursor-pointer' 
        onClick={handleOpenChange} />}
        <Image src="/assets/logo.png" width={100} height={100} alt="logo" />
      </div>
      <div className="hidden md:flex flex-grow space-x-20">

        {links?.map((link, idx) => (
          <Link href={link.url} className="font-semibold" key={idx}>
            {link.name}
          </Link>
        ))}
      </div>
    </Header>
    <div className={clsx(!open ? 'hidden h-0 transform scale-y-0' : 'z-50 h-max w-full bg-zinc-300 absolute top-16 overflow-hidden transition-transform transform scale-y-100 ease-in-out duration-300')}>
      <div className="md:hidden p-4">
      <Search
        placeholder="Search Products..."
        allowClear
        className='bg-white rounded-md'
        name='name'
        onChange={useDebounce(onSetFilter)}
        onSearch={SearchProduct}
      />
      <ul className='px-1 py-4 h-max'>
      {product.map((data,idx) =>{
        return(
          <Link href={`/product/${data.id}`} as={`/product/${data.id}`}
           className="px-4 py-2 bg-white rounded-md text-base"
           key={idx}>{data.name}</Link>
        )
      })}
      </ul>

      </div>
      <div className="flex flex-wrap flex-col gap-4 px-4 pb-12 pt-4 md:hidden">
          {links?.map((link, idx) => (
            <Link href={link.url} className="font-semibold flex-grow text-gray-500 hover:text-white hover:bg-zinc-500 p-4 rounded-md" 
            key={idx}>

              {link.name}
            </Link>
          ))}
      </div>     
    </div>
    </>
  );
}
