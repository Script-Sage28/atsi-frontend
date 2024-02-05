'use client';
import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import clsx from 'clsx';

interface LazyImageProps {
  images?: string;
  addedClass?: any;
  alt?: string;
  size: 'default' | 'small' | 'large';
}

// ... (previous imports)

export const LazyImages: React.FC<LazyImageProps> = ({ images, addedClass, alt, size }) => {
  console.log(images);
  const [loaded, setLoaded] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(false);
    }, 1000);
  }, []);

  const isValidImageUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleImageError = () => {
    // If the image fails to load, setLoaded to true to show the default image
    setLoaded(true);
  };

  // If the images URL is not valid or empty, set it to the default image
  const imageUrl = isValidImageUrl(images) ? images : '/assets/noimg.png';

  return (
    <>
      <div className={clsx('relative', addedClass)}>
        {loaded ? (
          <div className='w-full h-full flex justify-center items-center bg-opacity-70'>
            <Spin size={size ?? 'default'} />
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={clsx('w-full object-fill', addedClass)}
            src={imageUrl}
            loading='lazy'
            alt={alt}
            width={500}
            height={300}
          />
        )}
      </div>
    </>
  );
};

