'use client';
import React, { useEffect, useState } from 'react';
import { Spin,Image } from 'antd';
import clsx from 'clsx';


interface LazyImageProps {
  images?: string;
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

  const isValidImageUrl = (url: string): boolean => {
    try {
      // eslint-disable-next-line no-new
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };


  // If the images URL is not valid or empty, set it to the default image
  const imageUrl = images !== undefined && isValidImageUrl(images) ? images : '/assets/noimg.png';


  return (
    <>
      <div className={clsx('relative', addedClass)}>
        {loaded ? (
          <div className='w-full h-full flex justify-center items-center bg-opacity-70'>
            <Spin size={size ?? 'default'} />
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <Image
            className={clsx('w-full object-contain', addedClass)}
            src={imageUrl}
            loading='lazy'
            alt={alt}
          />
        )}
      </div>
    </>
  );
};

