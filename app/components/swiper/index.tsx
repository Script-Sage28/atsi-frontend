
import { useRef } from 'react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Navigation,Thumbs ,FreeMode} from 'swiper/modules';
import { Swiper, SwiperSlide,type SwiperRef } from 'swiper/react';

interface Images{
    images?:any;
    slideNum?:number;
    spaceBetween?:number;
    imgWidth?:number;
    imgHeight?:number;
    addedClass?:string;
}

export const CustomSwiper = (props:Images) => {
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <div className='flex flex-col w-full h-max gap-4 justify-center items-center'>
    <Swiper
      modules={[FreeMode, Navigation, Thumbs]}
      spaceBetween={props.spaceBetween ?? 20}
      slidesPerView={props.slideNum ?? 2}
      navigation={true}
      ref={swiperRef}
      className={props.addedClass}
    >
      {props.images?.map((item:string,idx: number) =>(
        <SwiperSlide key={idx} virtualIndex={idx}   
        
        >
            <Image 
             width={props.imgWidth}
             height={props.imgHeight}
             className='object-fill'
             alt='gallery'
             src={item} />
        </SwiperSlide>
      ))}
    </Swiper>
    <Swiper
      ref={swiperRef}
      spaceBetween={2}
      slidesPerView={4}
      freeMode={true}
      watchSlidesProgress={true}
      modules={[FreeMode, Navigation, Thumbs]}
      className='h-96 w-96 h-max'
    >
      {props.images?.map((item:string,idx: number) =>(
        <SwiperSlide>
        <Image 
          width={50}
          height={50}
          alt='thumbnail'
          className='object-cover w-max ml-4'
          src={item} 
        />
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
  )
}
