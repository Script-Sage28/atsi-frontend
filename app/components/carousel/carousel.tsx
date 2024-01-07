'use client';
import React, { useState,useRef } from 'react'
import { Carousel } from 'antd';
import { LazyImages } from '../images/images';
import clsx from 'clsx';

interface CarouselProps{
    imgList?:string[],
}
export default function CustomCarousel({imgList = []}: CarouselProps) {
    const [current, setCurrent] = useState<number>(0);
    const carouselRef = useRef<any>(null);

    const handleBeforeChange = (from: number, to: number) =>{
        setCurrent(to)
    }
    const handleClickPreview = (idx: number) => {
        setCurrent(idx);
        if (carouselRef.current) {
            carouselRef.current.goTo(idx);
        }
    };

  return (
    <div className='flex flex-col-reverse md:flex-row gap-4 w-full h-full'>
        <div className='flex flex-row md:flex-col gap-8 h-max md:h-80 m-4 md:m-8'>
        {imgList?.map((data,idx) =>(
            <div key={idx} className={clsx('w-20 h-20 md:h-16',current === idx ? 'scale-110' : 'opacity-25')}
            onClick={() => handleClickPreview(idx)}
            >
            <LazyImages
            size='small'
            images={data}
            alt="Preview Image"
            />           
            </div>
        ))}
        </div>
        <div className='rounded-md w-96'>
        <Carousel dotPosition={'bottom'} ref={carouselRef} swipe beforeChange={handleBeforeChange}>
        {imgList.map((data,idx) =>(
            <div key={idx} className='w-full h-80'>
            <LazyImages
            size='large'
            images={data}
            alt='Noimage'
            addedClass={'rounded-md'}
            />
            </div>
        ))}
        </Carousel>
        </div>

    </div>
  )
}
