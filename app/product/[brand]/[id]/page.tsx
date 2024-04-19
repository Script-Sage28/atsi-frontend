'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Rate,Avatar, Skeleton, Popover, Input, Form, Button, Tag, Tabs } from 'antd';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';
import { FaWhatsapp } from "react-icons/fa";
import { FaViber } from "react-icons/fa6";
import { CustomButton, CustomCard, CustomLabel } from '@/components';
import ReviewForm from '@/components/form/review';
import CustomParagraph from '@/components/paragraph/paragraph';
import { FetchingDetails } from '@/helper/getDetails';
import { T_Product } from '@/types/productList';
import { Peso } from '@/helper/pesoSign';
import { getNickName } from '@/helper/formatName';
import Image from 'next/image';
import Noimg from '../../../../public/assets/noimg.png'
import { AiOutlineMore } from "react-icons/ai";
import useStore from '@/zustand/store/store';
import { selector } from '@/zustand/store/store.provider';
import toast from 'react-hot-toast';
import { FeedbackDelete, FeedbackUpdate, ProductsRequest } from '@/service/request';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './styles.css';
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { BiSolidHot } from 'react-icons/bi';


export default function ProductDetails({ params }:{
    params: { id: string,brand:string };
}) {
  
  const [loading,setLoading] = useState<boolean>(false)
  const [show,setShow] = useState({
    ellipsis: false,
    form:false
  })
  const imgUrl = process.env.NEXT_PUBLIC_PUBLIC_STORAGE_ENDPOINT;
  const { TextArea } = Input;
  const swiperRef = useRef<SwiperRef>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const user = useStore(selector('user'))
  const [form] = Form.useForm();
  const productId = params.id;
  const brandId = params.brand;
  const [details,setDetails] = useState<T_Product | null>(null);
  const [suggest,setSuggest] = useState<T_Product[]>([])
  const [isEdit,setIsEdit] = useState<string>('')
  const [isLoading,setIsLoading] = useState<boolean>(false)
  const arrow:string = 'Show';

  const mergedArrow = useMemo(() => {
    if (arrow === 'Hide') {
      return false;
    }

    if (arrow === 'Show') {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);
  const fetch = async():Promise<void> =>{
    setLoading(true)
    const response = await FetchingDetails(productId)
    const res = await ProductsRequest.GET_ALL({brandId:brandId})
    const list = res.data.data?.slice(0,7)
    console.log(res)
    setSuggest(list)
    setDetails(response.results)
    setLoading(false)
  }
  useEffect(() =>{
     fetch()
  },[])
  const handleEdit = (data?:any) =>{
    if(data){
      setIsEdit(data.id)
      form.setFieldsValue({
        content: data.content,
        rate: data.rating,
      });
    }else{
      setIsEdit('')
    }

  }
  const handleReviewSubmit = async () => {
    await fetch(); 
  };
  const onFinish = async(values:any) =>{
    if (!user.info?.id) {
      toast.error('You must login before taking this action!');
      return; 
    }
    setIsLoading(true)
    const details ={
      id:isEdit,
      content: values.content,
      rating:values.rate,
      updatedBy: user.info?.id
    }

    const res = await FeedbackUpdate.UPDATE_FEED(details)
    if(res.data){
      setIsLoading(false)
      form.resetFields()
      setIsEdit('')
      await fetch();
    }
  }
  const handleDelete = async(value:any) =>{
    if (!user.info?.id) {
      toast.error('You must login before taking this action!');
      return; 
    }
    setIsLoading(true)
    const formData = new FormData();
    formData.append('ids[]',value.id)
    formData.append('updatedBy',user.info?.id)
    const res =await FeedbackDelete.DELETE_FEED(formData)
    if(res.data){
      await fetch();
      setIsLoading(false)
    }
  }
  console.log(details)
  return (
    <>
  {details ? 
       (<div className='px-4 md:px-24 py-8 bg-white text-black pb-32'>
      <Link href={`/product/${brandId}`}  className='flex items-center m-0 md:m-4'>
      <IoIosArrowBack size={30}/>
      <p>Go Back</p>
      </Link >
      <div className='flex flex-col md:flex-row lg:flex-row justify-center items-top gap-4'>
          <div id='details' className='w-full md:w-1/2 h-full flex flex-col m-4 justify-center items-center'>
              <Swiper
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              >
              {details?.media?.map((item:any,idx:number) =>(
                <SwiperSlide key={idx}>
                  <div className='flex justify-center items-center'>
                  <img src={imgUrl + item.url} className='h-[300px]'  alt={''} />
                  </div>
                </SwiperSlide>                 
              ))}
              </Swiper>
              <Swiper
                onSwiper={(swiper:any | null) => setThumbsSwiper(swiper)}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className='mySwiper'
              >
              {details?.media?.map((item:any,idx:number) =>(
              <SwiperSlide key={idx}>
                  <Image src={imgUrl + item.url} width={100} height={100} alt={''} />
                </SwiperSlide>                 
              ))}                  
              </Swiper>
          </div>

          <div className='flex flex-col w-[500px] p-2 h-full rounded-md'>
          <div className='flex flex gap-4 w-full'>
                {details.lazadaLink && <div className='w-[58px] h-[58px] cursor-pointer text-shadow bg-gray-100 drop-shadow-md rounded-sm overflow-hidden'
                  onClick={() => { window.open(`${details.lazadaLink}`, '_blank')}}
                >
                  <img className='text-white  aspect-square object-contain' 
                  src='../../assets/lazada.png'  />
                </div>}
                {details.shoppeeLink && <div className='w-[58px] h-[58px] cursor-pointer text-shadow bg-gray-100 drop-shadow-md rounded-full p-1 overflow-hidden'
                onClick={() => { window.open(`${details.shoppeeLink}`, '_blank')}}
                >
                  <img className='text-white  aspect-square object-contain' 
                  src='../../assets/shopee-logo-0.png'  />
                </div>}
                <CustomButton
                  buttonType='link'
                  // eslint-disable-next-line @next/next/no-img-element
                  icon={<FaViber size={50} className='text-white bg-sky-400 rounded-full shadow-border p-2'/> }
                  children=''
                  onClick={() => { window.open(`https://api.whatsapp.com/send/?phone=%2B639179639906&text&type=phone_number&app_absent=0`, '_blank')}}
                  addedClass={'h-full text-white'}
                />
              </div>
            <div className='flex flex-col gap-2'>
              <CustomLabel
                children={details.name}
                variant='text'
                addedClass='font-bold text-[32px]'
              />
              <CustomLabel
                children={`Stock: ${details.stock}`}
                variant='text'
                addedClass='font-semibold text-[16px]'
              />
                  {(details?.discount && details?.discount !== 0) && <CustomLabel
                      children={`DISCOUNTED PRICE`} 
                      variant="text"
                      addedClass="text-[30px] text-gray-500 font-semibold"
                  />}
                  <CustomLabel
                      children={(details?.discountedPrice && details?.discountedPrice !== 0) ? (<div className='flex gap-4'>
                      <p className='m-0'>{Peso(details?.discountedPrice)}</p>
                      <p className='m-0 line-through text-gray-600'>{Peso(details?.price)}</p>
                    </div>) : Peso(details?.price)} 
                      variant="text"
                      addedClass="text-lg font-semibold text-[#ff4e4e]"
                  />
                  <Tag children={details.category.name} className='w-max' color="#108ee9"  />

            </div>
            <div>
  
            </div>
          </div>
      </div>
      <div>
      <Tabs
        defaultActiveKey="2"
        items={[
          {
            label: 'Description',
            key: '1',
            children: <div>
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
            </div>,
          },
          {
            label: 'Review',
            key: '2',
            children: <div>
      {/* Comments/Rating */}
      <div className='flex flex-col'>
        <div className='w-full flex flex-col'>
          <CustomLabel
            children='Product Reviews'
            variant='text'
            addedClass='text-[28px]'
          />
        </div>
        <div className='w-full'>
          <ReviewForm
            isOpen={true}
            productId={details.id}
            setLoading={setLoading}
            isLoading={loading}
            setShow={() =>{ setShow({...show,form:!show.form})}}
            onReviewSubmit={handleReviewSubmit} 
          />
        </div>
        <div className='w-full h-[400px] overflow-y-auto flex flex-col gap-4'>
          {details.productReviews.length > 0 ? (details.productReviews?.map((data,idx) =>{
            return data?.isDeleted ? null : (
            <div key={idx} className='shadow-border p-4 flex flex-col gap-2'>
              <div className='flex items-center gap-2'>
               <Avatar size={40}>{getNickName(data.createdByUser?.username)}</Avatar> 
                {isEdit !== data.id ? <div className='w-full'>
                    <div className='flex items-center justify-between w-full gap-4'>
                      <div className='flex flex-col md:flex-row gap-4'>
                      <Rate disabled value={data.rating} allowHalf />
                      <p className='text-sm md:text-base'>{new Date(data.createdAt).toLocaleString()}</p>
                      </div>
                      <div>
                      {data.createdByUser?.username === user.info?.username && <Popover className='cursor-pointer p-0' placement="bottomRight" trigger="click" 
                      content={<div className='w-max'>
                        <p onClick={() =>handleEdit(data)} className='cursor-pointer hover:bg-sky-600 p-2 px-4 rounded-lg hover:text-white'>Edit</p>
                        <Button onClick={() =>handleDelete(data)}className='cursor-pointer hover:bg-red-600 rounded-lg border-0'><p className='hover:text-white text-nowrap'>{isLoading ? 'Deleting...' : 'Delete'}</p></Button>
                      </div>} arrow={mergedArrow}>
                      <AiOutlineMore size={24}/>
                      </Popover> }                     
                      </div>
                    </div>
                    <CustomLabel
                      children={data.createdByUser?.username}
                      variant='text'
                      addedClass='text-sm'
                    />
                <div>
                  <CustomParagraph text={data.content}/>
                </div>
                </div> 
                : (isEdit === data.id && <div className='w-full'>
                     <div className='w-full flex justify-end items-end'>
                      <CustomButton
                        children='Cancel'
                        onClick={()  => handleEdit()}
                        addedClass='bg-gray-800 text-white'
                      />
                     </div>
                    <Form 
                     onFinish={onFinish}
                     form={form}
                     className='flex flex-col w-full gap-4'>
                          <Form.Item label="Rating" name="rate" rules={[{ required: true }]}>
                            <Rate value={data.rating} />
                          </Form.Item>
                          <Form.Item label="Review" name="content" rules={[{ required: true }]}>
                          <TextArea rows={4} value={data.content} className='bg-gray-200' placeholder='Write your comments here' />
                          </Form.Item>
                          <Form.Item>
                            <div className='w-fll flex justify-end items-end'>
                            <Button loading={isLoading} className='bg-sky-600 text-white'  type="primary" htmlType="submit">Save</Button>
                            </div>
                          </Form.Item>
                    </Form>

                </div>)}
                </div>

            </div>
          )})) : (<p className='w-full h-[400px] flex justify-center items-center bg-gray-200 rounded-md'><p>No Customer review yet</p></p>)}
        </div>
      </div> 
            </div>,
          },
        ]}
      />
      </div>

      <div id='related' className='mt-4'>
        <p className='text-[36px] mb-8'>Related Products</p>
        <Swiper
          ref={swiperRef}
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
          modules={[Pagination, Navigation]}
        >
          {suggest?.map((product:any, idx) => {             
          return (
              <SwiperSlide>
              <CustomCard addedClass='flex w-full h-[330px] overflow-visible' key={idx}>
                <Link className='relative w-full overflow-hidden'
                key={idx} href={`/product/${brandId}/${product.id}`} passHref>
                  {product.isSaleProduct ? <div className="absolute w-[200px] z-40 left-4 top-4">
                  <BiSolidHot size={28} className='text-red-600' />
                </div> : product.isNewRelease ? <div className="absolute w-[200px] z-40 left-4 top-4">
                  <img className='w-[28px] text-green-600' src={'/assets/icons8-new-100.png'} alt="" />
                </div> : null}
                <div className="w-full flex flex-col justify-center items-center">
                  <div className=" w-full min-h-[200px] max-w-[200px] flex justify-center items-center">
                  {loading ? <Skeleton.Image active /> :                   
                    <Image
                      src={(product.media.length > 0 && product.media[0].url !== '') ? `${imgUrl}${product.media[0].url}` : Noimg}
                      alt={product.name}
                      className='rounded-lg'
                      width={170}
                      height={200}
                    />}

                  </div>
                  <div className="w-full px-4">
                    <CustomLabel
                      children={product?.name}
                      variant="title"
                      titleLevel={5}
                      addedClass='line-clamp-1 text-md text-left'
                    />
                    <p className='text-[12px] text-left'>Stock: {product?.stock}</p>
                    <div className="flex flex-col">
                      <CustomLabel
                        children={product?.category.name}
                        variant="text"
                        addedClass="font-semibold text-gray-400 line-clamp-1 text-left"
                      />
                    {((product?.discount) != null) && <CustomLabel
                        children={`${product?.discount}% Off`} 
                        variant="text"
                        addedClass="sm:text-base md:text-md text-gray-500 font-semibold text-left"
                    />}

                    <CustomLabel
                        children={((product?.discountedPrice) != null) ? (<div className='flex gap-4'>
                        <p className='m-0'>{Peso(product?.discountedPrice)}</p>
                        <p className='m-0 line-through text-gray-600'>{Peso(product?.price)}</p>
                      </div>) : Peso(product?.price)} 
                        variant="text"
                        addedClass="text-lg font-semibold text-[#ff4e4e] text-left"
                    />
                    </div>
                  </div>
                </div>
                </Link>
              </CustomCard>
              </SwiperSlide>
            )})}
        </Swiper>      
      </div>       
    </div>) : 
    <Skeleton style={{padding:32,height:'500px'}} paragraph={{rows:8}} loading={loading} active />}
    </>
  )
}
