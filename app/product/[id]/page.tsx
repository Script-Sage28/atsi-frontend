'use client';
import React, { useState } from 'react'
import dummyProducts from '../dummydata';
import { IoIosArrowBack } from "react-icons/io";
import Link from 'next/link';
import CustomCarousel from '@/components/carousel/carousel';
import { CustomButton, CustomLabel } from '@/components';
import { Rate,Avatar  } from 'antd';
import CustomParagraph from '@/components/paragraph/paragraph';
import ReviewForm from '@/components/form/review';


export default function ProductDetails({ params }:{
    params: { id: number };
}) {
  const [show,setShow] = useState({
    ellipsis: false,
    form:false
  })
  const productId = params.id;
  const product = dummyProducts.find((data) => {
    return data.id == productId;
  });
  return (
    <div className='p-4'>
      <Link href={'/product'}  className='flex items-center m-4'>
      <IoIosArrowBack size={30}/>
      <p>Go Back</p>
      </Link >
       {/* Product Details */}
      <div className='flex flex-col md:flex-row justify-center items-top gap-4'>
        <div className='w-max h-full m-4'>
          <CustomCarousel
            imgList={product?.images}
          />
        </div>
        <div className='flex flex-col shadow-border p-8 w-96 h-full overflow-auto rounded-md'>
          <div className='flex flex-col gap-2'>
            <CustomLabel
              children={product?.name}
              variant='text'
            />
            <Rate disabled value={product?.rating} allowHalf />
            <CustomLabel
                children={`₱${product?.price}`} 
                variant="text"
                addedClass="text-lg font-semibold text-[#ff4e4e]"
            />
            <div className='flex flex-col gap-4 items-center'>
              <CustomButton
                buttonType='link'
                icon={<img className='w-6' src='../assets/lazada.png'  />}
                children='Order in Lazada now!'
                addedClass={'flex items-center p-2 shadow-border w-48 border-gray-200 text-gray-600 border-2'}
              />
              <CustomButton
                buttonType='link'
                icon={<img className='w-12' src='../assets/shopee-logo-0.png'  />}
                children='Order in Shopee now!'
                addedClass={'flex items-center px-2 py-4 shadow-border w-48 border-gray-200 text-gray-600 border-2'}
              />
            </div>
            <hr />
            <div>
              <CustomParagraph
                isEllipsis={show.ellipsis}
                text={product?.description}
              />
              <CustomButton
                children={show.ellipsis ? 'Hide' : 'See more'}
                onClick={() =>setShow({...show,ellipsis: !show.ellipsis})}
                buttonType='default'
                addedClass={'bg-transparent text-indigo-400 font-semibold border-0'}
              />
            </div>
          </div>
          <div>

          </div>
        </div>
      </div>
      {/* Comments/Rating */}
      <div className='flex flex-col justify-center items-center py-4'>
        <div className='w-full flex flex-col gap-4 mb-4 md:w-1/2'>
          <CustomLabel
            children='CUSTOMER REVIEWS'
            variant='text'
          />
          <div className='flex justify-between items-center sm:mx-4'>
            <div className='flex flex-col'>
            <Rate disabled value={product?.rating} allowHalf />
            <CustomLabel
              children={`Based on ${product?.comments.length} reviews.`}
              variant='text'
            />
            </div>
            <CustomButton
              children={show.form ? 'Cancel Review' : 'Write Review'}
              buttonType='default'
              onClick={() =>setShow({...show,form:!show.form})}
            />
          </div>
        </div>
        <div className='w-full md:w-1/2'>
          <ReviewForm
            isOpen={show.form}
          />
        </div>
        <div className='w-full md:w-1/2 flex flex-col gap-4'>
          {product?.comments.map((data,idx) =>(
            <div className='shadow-border p-4 flex flex-col gap-2'>
              <div className='flex items-center gap-2'>
               <Avatar size={40}>{data.user}</Avatar> 
               <div>
                  <div className='flex items-center gap-4'>
                    <Rate disabled value={data.rate} allowHalf />
                    <p>{data.date}</p>
                  </div>
                  <CustomLabel
                    children={data.user}
                    variant='text'
                  />
               </div>
              </div>
              <div>
                <CustomParagraph text={data.comment}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
