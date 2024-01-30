'use client';
import React, { useState,useRef } from 'react'
import { Carousel } from 'antd';
import clsx from 'clsx';
import { LazyImages } from '../images/images';


interface CarouselProps{
    imgList?:string[] | undefined,
}
interface InnerSlider {
    currentSlide: number;
    slideCount: number;
  }
interface CarouselRefType {
    goTo: (slide: number, dontAnimate?: boolean) => void;
    next: () => void;
    prev: () => void;
    autoPlay: (playType?: 'update' | 'leave' | 'blur' | undefined) => void;
    innerSliderts: any; 
    innerSlider: React.MutableRefObject<InnerSlider | null>; 
}
export default function CustomCarousel({imgList}: CarouselProps) {
    console.log(imgList)
    const [current, setCurrent] = useState<number>(0);
    const carouselRef = useRef<CarouselRefType | null>(null);

    const handleBeforeChange = (from: number, to: number) =>{
        setCurrent(to)
    }
    const handleClickPreview = (idx: number) => {
        setCurrent(idx);
        if (carouselRef.current != null) {
            carouselRef.current.goTo(idx);
        }
    };
    const imgListLength = imgList?.length ?? 0;
  return (
    <div className='flex flex-col-reverse md:flex-row gap-4 w-full h-full'>
        {imgListLength > 0 ? (<>
        <div className='flex flex-row md:flex-col gap-8 h-max md:h-80 m-4 md:m-8'>
              {imgList?.map((data, idx) => (
                  <div key={idx} className={clsx('w-20 h-20 md:h-16', current === idx ? 'scale-110' : 'opacity-25')}
                      onClick={() => { handleClickPreview(idx); } }
                  >
                      <LazyImages
                          size='small'
                          images={data}
                          alt="Preview Image" />
                  </div>
              ))}
          </div><div className='rounded-md w-full md:w-96 p-4'>
                  <Carousel dotPosition={'bottom'} ref={carouselRef} swipe beforeChange={handleBeforeChange}>
                      {imgList?.map((data, idx) => (
                          <div key={idx} className='w-full h-80'>
                              <LazyImages
                                  size='large'
                                  images={data}
                                  alt='Noimage'
                                  addedClass={'rounded-md'} />
                          </div>
                      ))}
                  </Carousel>
              </div>
    </>) : (<div className='flex w-full justify-center items-center flex-row md:flex-col gap-8 h-max md:h-80 m-4 md:m-8'>
        No Images Found!
    </div>)}

    </div>
  )
}
