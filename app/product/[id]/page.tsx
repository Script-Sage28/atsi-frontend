'use client';
import React, { useEffect, useState } from 'react'
import { Rate,Avatar, Skeleton  } from 'antd';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';
import { CustomButton, CustomLabel } from '@/components';
import CustomCarousel from '@/components/carousel/carousel';
import ReviewForm from '@/components/form/review';
import CustomParagraph from '@/components/paragraph/paragraph';
import { FetchingDetails } from '@/helper/getDetails';
import { T_Product } from '@/types/productList';
import { Peso } from '@/helper/pesoSign';
import { getNickName } from '@/helper/formatName';


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
  useEffect(() =>{
    const fetch = async():Promise<void> =>{
      setLoading(true)
      const response = await FetchingDetails(productId)
      setImgList(response.img)
      setDetails(response.results)
      setLoading(false)
    }
     fetch()
  },[])
  return (
    <>
  
  {details ? 
       (<div className='p-4'>
      <Link href={'/product'}  className='flex items-center m-4'>
      <IoIosArrowBack size={30}/>
      <p>Go Back</p>
      </Link >
       <div className='flex flex-col md:flex-row justify-center items-top gap-4'>
            <div className='w-full h-full m-4'>
              <CustomCarousel
                imgList={imgList}
              />
            </div>
            <div className='flex flex-col shadow-border p-8 w-full md:w-96 h-full overflow-auto rounded-md'>
              <div className='flex flex-col gap-2'>
                <CustomLabel
                  children={details.name}
                  variant='text'
                />
                <Rate disabled value={details.rating} allowHalf />
                <CustomLabel
                    children={Peso(details.price)} 
                    variant="text"
                    addedClass="text-lg font-semibold text-[#ff4e4e]"
                />
                <div className='flex flex-col gap-4 items-center'>
                  <CustomButton
                    buttonType='link'
                    // eslint-disable-next-line @next/next/no-img-element
                    icon={<img className='w-6' src='../assets/lazada.png'  />}
                    onClick={() => { window.open(`${details.lazadaLink}`, '_blank')}}
                    children='Order in Lazada now!'
                    addedClass={'flex items-center p-2 shadow-border w-48 border-gray-200 text-gray-600 border-2'}
                  />
                  <CustomButton
                    buttonType='link'
                    // eslint-disable-next-line @next/next/no-img-element
                    icon={<img className='w-12' src='../assets/shopee-logo-0.png'  />}
                    children='Order in Shopee now!'
                    onClick={() => { window.open(`${details.shoppeeLink}`, '_blank')}}
                    addedClass={'flex items-center px-2 py-4 shadow-border w-48 border-gray-200 text-gray-600 border-2'}
                  />
                </div>
                <hr />
                <div>
                  <CustomParagraph
                    isEllipsis={show.ellipsis}
                    text={details.description}
                  />
                  <CustomButton
                    children={show.ellipsis ? 'Hide' : 'See more'}
                    onClick={() =>{ setShow({...show,ellipsis: !show.ellipsis}); }}
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
          <div className='flex justify-end items-end sm:mx-4'>
            <CustomButton
              children={show.form ? 'Cancel Review' : 'Write Review'}
              buttonType='default'
              onClick={() =>{ setShow({...show,form:!show.form}); }}
            />
          </div>
        </div>
        <div className='w-full md:w-1/2'>
          <ReviewForm
            isOpen={show.form}
            productId={details.id}
          />
        </div>
        <div className='w-full md:w-1/2 flex flex-col gap-4'>
          {details.productReviews.length > 0 ? (details.productReviews?.map((data,idx) =>(
            <div key={idx} className='shadow-border p-4 flex flex-col gap-2'>
              <div className='flex items-center gap-2'>
               <Avatar size={40}>{getNickName(data.user?.username)}</Avatar> 
               <div>
                  <div className='flex items-center gap-4'>
                    <Rate disabled value={data.rating} allowHalf />
                    <p className='text-sm md:text-base'>{new Date(data.createdAt).toLocaleString()}</p>
                  </div>
                  <CustomLabel
                    children={data.user.email}
                    variant='text'
                  />
               </div>
              </div>
              <div>
                <CustomParagraph text={data.content}/>
              </div>
            </div>
          ))) : (<p>No Customer review yet</p>)}
        </div>
      </div>        
    </div>) : 
    <Skeleton style={{padding:32,height:'500px'}} paragraph={{rows:8}} loading={loading} active />}
    </>
  )
}
