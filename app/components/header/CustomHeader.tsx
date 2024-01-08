'use client';
import React, { useState } from 'react';
import { Layout, Input, Space } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { IoMenu } from "react-icons/io5";
import { MdOutlineClear } from "react-icons/md";

export default function CustomHeader() {
  const [open,setOpen] = useState(false)
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
      name: 'Blog',
      url: '/#Home',
    },
    {
      id: 3,
      name: 'Contact Us',
      url: '/#Home',
    },
    {
      id: 4,
      name: 'Products',
      url: '/#products',
    },
    {
      id: 5,
      name: 'Signin',
      url: '/login',
    },
  ];
  return (
    <>
    <Header className="header p-2 md:p-8 w-full flex justify-between md:justify-none items-center">
      <div className="flex-1 w-full flex justify-between items-center ">
        {open && <MdOutlineClear size={40} className='md:hidden ease-in-out cursor-pointer' 
        onClick={() =>setOpen(!open)} />}
        {!open && <IoMenu size={40} className='md:hidden ease-in-out cursor-pointer' 
        onClick={() =>setOpen(!open)} />}
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
      />
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
