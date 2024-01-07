'use client';
import React, { useEffect, useState } from 'react'
import clsx from 'clsx';
import { Spin } from 'antd';

interface LazyImageProps {
    images:string;
    addedClass?: any;
    alt?:string;
    size:"default" | "small" | "large" ;
}

export const LazyImages: React.FC<LazyImageProps> = ({ images,addedClass, alt,size }) => {
  const [loaded,setLoaded] = useState<boolean>(true);

  useEffect(() =>{
    setTimeout(() =>{
      setLoaded(false)
    },1000)
  },[])

  return (
    <>
    <div className={clsx('relative',addedClass)}>
      {loaded ? 
      <div className='w-full h-full flex justify-center items-center bg-opacity-70'>
        <Spin size={size || 'default'} />
      </div> : 
      <img  className={clsx('w-full', addedClass)}
      src={images}
      loading='lazy'
      alt={alt} 
      width={500} 
      height={300}       
      />}
    </div>

    </>
  )
}
