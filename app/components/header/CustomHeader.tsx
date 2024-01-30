/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';
import React, { type ChangeEvent, useCallback, useState, useEffect, ReactNode } from 'react';
import clsx from 'clsx';
import { debounce } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { Popover,Modal,Layout, Input, Form, Typography, Button  } from 'antd';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { IoMenu } from 'react-icons/io5';
import { MdOutlineClear } from 'react-icons/md';
import { ProductsRequest, UserUpdate } from '@/service/request';
import useUserStore from '@/store/userStore';
import { T_Product } from '@/types/productList';
import toast from 'react-hot-toast';
import useStore from '@/zustand/store/store';
import { logout, saveUserInfo, selector } from '@/zustand/store/store.provider';


type FormValues = {
  id: string;
  username: string;
  email: string;
  password: string;
};

export default function CustomHeader() {
  const useDebounce = (func: any) => debounce(func, 1000);
  const [open,setOpen] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useStore(selector('user'));
  const [product,setProducts] = useState<T_Product[]>([])
  const { handleSubmit,control,reset,setValue  } = useForm<FormValues>({
    defaultValues:{
      id:'',
      username:'',
      email:'',
      password:''
    }
  })

  useEffect(() => {
    if (isModalOpen) {
      // Use useEffect to set form values when modal is open
      setValue('username', user.info?.username);
      setValue('email', user.info?.email);
      setValue('id', user.info?.id);
    }
  }, [isModalOpen, user, setValue]); 

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
      name: user.info?.username ? user.info?.username : 'Signin',
      url:  user.info?.username ? '/' : '/login',
    },
  ];

  useEffect(() => {
    SearchProduct()
  },[filter.name])

  const handleOpenChange = () =>{
    if (!open) {
      setValue('username', user.info?.username);
      setValue('email', user.info?.email);
      setValue('id', user.info?.id);
    }
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
    if(filter.name){
      const res = await ProductsRequest.GET_ALL(filter);
      setProducts(res.data.data)
    }
  }

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onSubmit: SubmitHandler<FormValues> = async(data) =>{
    try {
      setLoading(true)
      const res = await UserUpdate.UPDATE_USER(data);
      if(!('message' in res.data)){
        toast.success('Updated Successfully')
        saveUserInfo(res.data.data)
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false)
      setIsModalOpen(false)
    }
  }
  const hanldeLogout = () =>{
    logout()
  }
  const content = (
    <div>
      <p onClick={showModal} className='p-2 cursor-pointer'>Edit details</p>
      <p onClick={hanldeLogout} className='p-2 cursor-pointer'>Logout</p>
    </div>
  );
  const formUpdate: () => ReactNode = () => {
    return <Form
    onFinish={onSubmit}
    >
    <FormItem name="username" control={control}>
    <Typography>Username</Typography>
    <Input placeholder="Your answer..." />;
    </FormItem>
    <FormItem name="email" control={control}>
    <Typography>Email</Typography>
    <Input placeholder="Your answer..." />;
    </FormItem>
    <FormItem name="password" control={control}>
    <Typography>Password</Typography>
    <Input.Password visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
     placeholder="Your answer..." />;
    </FormItem>
    </Form>
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

        {links?.map((link, idx) => {
          return(
          <React.Fragment key={idx}>
          {link.id !== 4 ? <Link href={link.url} className="font-semibold" key={idx}
          >
            {link.name}
          </Link> : user.info?.username ?
           <Popover content={content} trigger="hover" key={idx}>
          <Link href={link.url} className="font-semibold" key={idx}
          >
            {link.name}
          </Link>
          </Popover> : 
          <Link href={link.url} className="font-semibold" key={idx}
          >
            {link.name}
          </Link>}
          </React.Fragment>
        )})}
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
      <ul className='px-1 py-4 h-max flex flex-col gap-2'>
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
    <Modal title="Personal Details" open={isModalOpen} onCancel={handleCancel}
    footer={[
      <Button key="back" onClick={handleCancel}>
        Cancel
      </Button>,
      <Button key="submit" className='bg-sky-500' type="primary" loading={loading} onClick={handleSubmit(onSubmit)}>
        Submit
      </Button>
    ]}>
      {formUpdate()}
    </Modal>
    </>
  );
}
