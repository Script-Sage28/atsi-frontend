'use client';
import React from 'react'
import { LockOutlined,EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { CustomLabel } from '@/components';
import Link from 'next/link';

export default function Register() {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
  return (
    <div className='w-full flex flex-col justify-center items-center px-2 md:px-10 pt-4 md:pt-20'>
    <CustomLabel
        children='REGISTRATION'
        variant='text'
        addedClass='font-extrabold text-2xl'
    />
   <Form
    labelCol={{ flex: '100px' }}
    labelAlign="left"
    wrapperCol={{ flex: 1 }}
    colon={false}
    name="normal_login"
    className=" p-4 w-full md:w-1/3 flex flex-col justify-center items-center"
    initialValues={{ remember: true }}
    onFinish={onFinish}
    >
      <Form.Item
        name="username"
        className='w-full'
        label='Username:'
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input size='large' placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="email"
        className='w-full'
        label='Email:'
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input size='large' placeholder="Email address" />
      </Form.Item>
      <Form.Item
        label='Password'
        className='mb-2 w-full'
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
      <Input.Password
        prefix={<LockOutlined className="site-form-item-icon" />}
        size='large'
        placeholder="input password"
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
      </Form.Item>

      <Form.Item className='flex flex-col justify-center items-center'>
        <Button type="default" htmlType="submit" className="bg-sky-500 my-4 px-8 text-white font-semibold">
          CREATE
        </Button>
        <div>
         <Link className='text-sky-500' href="/login">Already have account? Signin now!</Link>
        </div>

      </Form.Item>
   </Form> 
    </div>
  )
}
