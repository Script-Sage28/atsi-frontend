'use client';
import React, { useState } from 'react'

interface LazyImageProps {
    images:string;
    images1?:string;
    alt?:string;
}

export const LazyImages: React.FC<LazyImageProps> = ({ images,images1, alt }) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [loaded,setLoaded] = useState<boolean>(false);

  const handleImageLoad = () =>{
    setLoaded(true)
  }
  const handleMouseEnter = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };
  const containerStyle: React.CSSProperties = {
    backgroundImage: `url('${hovered ? images1 : images}')`,
    opacity: 1,
    transition: 'opacity 0.5s ease, background-image 0.5s ease',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };
  return (
    <div className='w-full h-full p-2 rounded-t-lg'
     style={containerStyle} 
     onMouseEnter={handleMouseEnter}
     onMouseLeave={handleMouseLeave}
     >
      <img className='object-cover w-full h-full rounded-t-lg'
       src={hovered ? images1 : images} 
       alt={alt} 
       loading='lazy' 
       onLoad={handleImageLoad} />
    </div>
  )
}
