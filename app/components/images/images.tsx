'use client';
import React, { useEffect, useState } from 'react';
import { Spin,Image } from 'antd';
import clsx from 'clsx';


interface LazyImageProps {
  images?: any;
  addedClass?: any;
  alt?: string;
  size: 'default' | 'small' | 'large';
}

// ... (previous imports)

export const LazyImages: React.FC<LazyImageProps> = ({ images, addedClass, alt, size }) => {
  const [loaded, setLoaded] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(false);
    }, 1000);
  }, []);
  const imgUrl = process.env.NEXT_PUBLIC_PUBLIC_STORAGE_ENDPOINT;
  console.log(images)
  return (
    <>
      <div className={clsx('relative', addedClass)}>
        {loaded ? (
          <div className='w-full h-full flex justify-center items-center bg-opacity-70'>
            <Spin size={size ?? 'default'} />
          </div>
        ) : images instanceof Object ? (
          <Image.PreviewGroup
            items={images.map((item: { url: any; }) => imgUrl + item.url)}
          >
            <Image
              className={clsx('w-full object-contain', addedClass)}
              src={imgUrl + images[0]?.url}
              loading='lazy'
              alt={alt}
            />
          </Image.PreviewGroup>
        ) : (
            <Image
              className={clsx('w-full object-contain', addedClass)}
              src={images}
              loading='lazy'
              alt={alt}
            />
        )}
      </div>
    </>
  );
};

