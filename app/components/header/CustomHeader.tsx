'use client';
import React from 'react';
import { Layout } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

export default function CustomHeader() {
  const { Header } = Layout;
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
      url: '/#Home',
    },
  ];
  return (
    <Header className="header flex items-center">
      <div className="flex-1">
        <Image src="/assets/logo.png" width={100} height={100} alt="logo" />
      </div>
      <div className="flex-grow space-x-20">
        {links?.map((link, idx) => (
          <Link href={link.url} className="font-semibold" key={idx}>
            {link.name}
          </Link>
        ))}
      </div>
    </Header>
  );
}
