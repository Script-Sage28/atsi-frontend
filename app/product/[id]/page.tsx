'use client';
import React, { useEffect, useState } from 'react'
import { Rate,Avatar, Skeleton  } from 'antd';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';
import { FaWhatsapp } from "react-icons/fa";
import { CustomButton, CustomLabel } from '@/components';
import AtsiImg from '../../logo.png'
import ReviewForm from '@/components/form/review';
import CustomParagraph from '@/components/paragraph/paragraph';
import { FetchingDetails } from '@/helper/getDetails';
import { T_Product } from '@/types/productList';
import { Peso } from '@/helper/pesoSign';
import { getNickName } from '@/helper/formatName';
import { CustomSwiper } from '@/components/swiper';
import Image from 'next/image';


export default function ProductDetails({ params }:{
    params: { id: string };
}) {
  const [loading,setLoading] = useState<boolean>(false)
  const [show,setShow] = useState({
    ellipsis: false,
    form:false
  })
  const productId = params.id;
  const [details,setDetails] = useState<T_Product | null>(null);
  const [imgList,setImgList] = useState([]);
  const fetch = async():Promise<void> =>{
    setLoading(true)
    const response = await FetchingDetails(productId)
    console.log(response)
    setImgList(response.img)
    setDetails(response.results)
    setLoading(false)
  }
  useEffect(() =>{
     fetch()
  },[])

  const handleReviewSubmit = async () => {
    await fetch(); 
  };
 
  return (
    <>
  {details ? 
       (<div className='p-4'>
      <Link href={'/product'}  className='flex items-center m-4'>
      <IoIosArrowBack size={30}/>
      <p>Go Back</p>
      </Link >
       <div className='flex flex-col md:flex-row justify-center items-top gap-4'>
            <div className='w-full md:w-1/2 h-full m-4 justify-center items-center flex'>
              {imgList.length > 0 ? <CustomSwiper
                images={imgList}
                imgHeight={320}
                imgWidth={350}
                slideNum={1}
                addedClass='w-[350px] h-[350px]'
              /> : 
              <Image
              src={AtsiImg}
              width={200}
              alt='atsi'
              height={200}
            />}
            </div>
            <div className='flex flex-col shadow-border p-8 w-full md:w-1/2 md:w-96 h-full overflow-auto rounded-md'>
              <div className='flex flex-col gap-2'>
                <CustomLabel
                  children={details.name}
                  variant='text'
                  addedClass='font-bold text-lg'
                />
                    {(details?.discount && details?.discount !== 0) && <CustomLabel
                        children={`DISCOUNTED PRICE`} 
                        variant="text"
                        addedClass="sm:text-base md:text-md text-gray-500 font-semibold"
                    />}
                    <CustomLabel
                        children={(details?.discountedPrice && details?.discountedPrice !== 0) ? (<div className='flex gap-4'>
                        <p className='m-0'>{Peso(details?.discountedPrice)}</p>
                        <p className='m-0 line-through text-gray-600'>{Peso(details?.price)}</p>
                      </div>) : Peso(details?.price)} 
                        variant="text"
                        addedClass="text-lg font-semibold text-[#ff4e4e]"
                    />
                <div className='flex flex-col gap-4 items-center w-full'>
                  {details.lazadaLink && <CustomButton
                    buttonType='link'
                    // eslint-disable-next-line @next/next/no-img-element
                    icon={<img className='w-6' src='../assets/lazada.png'  />}
                    onClick={() => { window.open(`${details.lazadaLink}`, '_blank')}}
                    children='Order in Lazada now!'
                    addedClass={'flex items-center p-2 justify-center shadow-border w-full border-gray-200 text-gray-600 border-2'}
                  />}
                  {details.shoppeeLink && <CustomButton
                    buttonType='link'
                    // eslint-disable-next-line @next/next/no-img-element
                    icon={<img className='w-8' src='../assets/shopee-logo-0.png'  />}
                    children='Order in Shopee now!'
                    onClick={() => { window.open(`${details.shoppeeLink}`, '_blank')}}
                    addedClass={'flex items-center px-2 py-4 justify-center shadow-border w-full  border-gray-200 text-gray-600 border-2'}
                  />}
                  <CustomButton
                    buttonType='link'
                    // eslint-disable-next-line @next/next/no-img-element
                    icon={<FaWhatsapp />}
                    children='Message on WhatsApp'
                    onClick={() => { window.open(`https://api.whatsapp.com/send/?phone=%2B639179639906&text&type=phone_number&app_absent=0`, '_blank')}}
                    addedClass={'flex items-center bg-green-400 justify-center px-2 py-4 shadow-border w-full border-gray-200 text-gray-600 border-2'}
                  />
                </div>
                <hr />
                <div>
                  <CustomParagraph
                    isEllipsis={show.ellipsis}
                    text={details.description}
                  />
                {details.description.length > 100 && (
                  <CustomButton
                    children={show.ellipsis ? 'Hide' : 'See more'}
                    onClick={() =>{ setShow({...show, ellipsis: !show.ellipsis}); }}
                    buttonType='default'
                    addedClass={'bg-transparent text-indigo-400 font-semibold border-0'}
                  />
                )}
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
          <div className='flex justify-end items-end sm:mx-4'>
            <CustomButton
              children={show.form ? 'Cancel Review' : 'Write Review'}
              buttonType='default'
              onClick={() =>{ setShow({...show,form:!show.form}) }}
            />
          </div>
        </div>
        <div className='w-full md:w-1/2'>
          <ReviewForm
            isOpen={show.form}
            productId={details.id}
            setLoading={setLoading}
            isLoading={loading}
            setShow={() =>{ setShow({...show,form:!show.form})}}
            onReviewSubmit={handleReviewSubmit} 
          />
        </div>
        <div className='w-full md:w-1/2 flex flex-col gap-4'>
          {details.productReviews.length > 0 ? (details.productReviews?.map((data,idx) =>{
            console.log(data)
            return(
            <div key={idx} className='shadow-border p-4 flex flex-col gap-2'>
              <div className='flex items-center gap-2'>
               <Avatar size={40}>{getNickName(data.createdByUser?.username)}</Avatar> 
               <div>
                  <div className='flex items-center gap-4'>
                    <Rate disabled value={data.rating} allowHalf />
                    <p className='text-sm md:text-base'>{new Date(data.createdAt).toLocaleString()}</p>
                  </div>
                  <CustomLabel
                    children={data.createdByUser?.username}
                    variant='text'
                  />
               </div>
              </div>
              <div>
                <CustomParagraph text={data.content}/>
              </div>
            </div>
          )})) : (<p>No Customer review yet</p>)}
        </div>
      </div>        
    </div>) : 
    <Skeleton style={{padding:32,height:'500px'}} paragraph={{rows:8}} loading={loading} active />}
    </>
  )
}
