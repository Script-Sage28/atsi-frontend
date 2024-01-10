'use client';
import React, { useState } from 'react'
import { Button, Form, Input,Rate } from 'antd';
import clsx from 'clsx';

interface FormProps{
    isOpen: boolean;
}

export default function ReviewForm({isOpen}: FormProps) {

  return (
    <Form
    name="wrap"
    labelCol={{ flex: '110px' }}
    labelAlign="left"
    wrapperCol={{ flex: 1 }}
    colon={false}
    className={clsx('transition duration-600 ease-in-out',isOpen ? 'w-full p-4 translate-y-6' : 'hidden -translate-y-24')}
  >
    <Form.Item label="Name" name="name" rules={[{ required: true }]}>
      <Input className='bg-gray-200' placeholder='Enter your name(public)' />
    </Form.Item>

    <Form.Item label="Email" name="email" rules={[{ required: true }]}>
      <Input className='bg-gray-200' placeholder='Enter your email(public)' />
    </Form.Item>

    <Form.Item label="Rating" name="rate" rules={[{ required: true }]}>
       <Rate />
    </Form.Item>

    <Form.Item label="Review Title" name="reviewTitle" rules={[{ required: true }]}>
      <Input className='bg-gray-200' placeholder='Give your review a title' />
    </Form.Item>

    <Form.Item label="Reveiw" name="reviewBody" rules={[{ required: true }]}>
      <Input className='bg-gray-200' placeholder='Write your comments here' />
    </Form.Item>

    <Form.Item label=" ">
      <Button type="default" className='bg-sky-400 text-white' htmlType="submit">
        Submit Review
      </Button>
    </Form.Item>
  </Form>
  )
}
