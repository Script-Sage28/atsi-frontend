'use client';
import React from 'react'
import { Button, Form, Input,Rate } from 'antd';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { ProductReview } from '@/service/request';
import useStore from '@/zustand/store/store';
import { selector } from '@/zustand/store/store.provider';

interface FormProps{
    isOpen: boolean;
    productId: string;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading:boolean;
    setShow:() => void;
    onReviewSubmit:() => void;
}

export default function ReviewForm({isOpen,productId,setLoading,isLoading,setShow,onReviewSubmit}: FormProps) {
  const user = useStore(selector('user'))
  const { TextArea } = Input;

  const handleFormSubmit = async (values: any) => {
    console.log('Received values of form: ', values);
  
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!user.info?.id) {
      toast.error('You must login before taking this action!');
      return; 
    }
  
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append('rating', values.rate);
      formData.append('userId', user.info?.id);
      formData.append('comment', values.content);
      formData.append('productId', productId);
      await ProductReview.RATE(formData);
      setLoading(false)
      setShow()
      onReviewSubmit();
    } catch (error: any) {
      console.error('Error during Login:', error.message);
      setLoading(false)
    }
  };
  const onFinish = async(values: any) => {
    void handleFormSubmit(values);
  };
  return (
    <Form
    name="wrap"
    labelCol={{ flex: '110px' }}
    labelAlign="left"
    wrapperCol={{ flex: 1 }}
    colon={false}
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onFinish={onFinish}
    className={clsx('transition duration-600 ease-in-out',isOpen ? 'w-full p-4 translate-y-6' : 'hidden -translate-y-24')}
  >

    <Form.Item label="Rating" name="rate" rules={[{ required: true }]}>
       <Rate />
    </Form.Item>

    <Form.Item label="Review" name="content" rules={[{ required: true }]}>
      <TextArea rows={4} className='bg-gray-200' placeholder='Write your comments here' />
    </Form.Item>

    <Form.Item label=" ">
      <Button type="default" disabled={isLoading} className='bg-sky-400 text-white' htmlType="submit">
        {isLoading ? 'Submitting' : 'Submit Review'}
      </Button>
    </Form.Item>
  </Form>
  )
}
