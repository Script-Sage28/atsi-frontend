'use client';
import React, { useEffect, useState } from 'react';
import { Spin, Image } from 'antd';
import clsx from 'clsx';
import AtsiImg from '../../logo.png';

interface LazyImageProps {
  images?: any;
  addedClass?: any;
  alt?: string;
  size: 'default' | 'small' | 'large';
}

export const LazyImages: React.FC<LazyImageProps> = ({ images, addedClass, alt, size }) => {
  const [loaded, setLoaded] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(false);
    }, 1000);
    return () => { clearTimeout(timer); };
  }, []);

  const imgUrl = process.env.NEXT_PUBLIC_PUBLIC_STORAGE_ENDPOINT;

  const renderImage = () => {
    if (loaded) {
      return (
        <div className='w-full h-full flex justify-center items-center bg-opacity-70'>
          <Spin size={size ?? 'default'} />
        </div>
      );
    } else if (images instanceof Object && images.length > 0) {
      return (
        <Image.PreviewGroup items={images.map((item: { url: any }) => imgUrl + item.url)}>
          <Image
            className={clsx('w-full object-contain', addedClass)}
            src={images[0]?.url !== '' ? imgUrl + images[0]?.url : AtsiImg}
            loading='lazy'
            alt={alt}
          />
        </Image.PreviewGroup>
      );
    } else {
      return (
        <Image
          className={clsx('w-full object-contain', addedClass)}
          src={(images === '' || images.length === 0) ? AtsiImg : images}
          loading='lazy'
          alt={alt}
        />
      );
    }
  };

  return (
    <div className={clsx('relative', addedClass)}>
      {renderImage()}
    </div>
  );
};
