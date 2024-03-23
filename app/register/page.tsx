/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';
import React, { useState } from 'react'
import { LockOutlined,EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { CustomLabel } from '@/components';
import { RegisterAccount } from '@/service/request';


export default function Register() {
  const router = useRouter();
  const [isLoading,setIsLoading] = useState(false)
    const onFinish = async(values: any) => {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('email',values.email)
        formData.append('password',values.password)
        formData.append('username',values.username)
        formData.append('type','User')
        try {
          const response = await RegisterAccount.REGISTER(formData);
      
          if (response.status === 200) {
            toast.success('Successfully registered!');
            setIsLoading(false)
            router.push(`/login`);
          } else {
            setIsLoading(false)
            toast.error(response.data.message || 'Registration failed');
          }
        } catch (error: any) {
          console.error('Error during registration:', error.message);
          setIsLoading(false)
          toast.error('An error occurred during registration.');
        }
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
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
        rules={[
          { required: true, message: 'Please input your Password!' },
          { min: 8, message: 'Password must be at least 8 characters long' },
        ]}
      >
      <Input.Password
        prefix={<LockOutlined className="site-form-item-icon" />}
        size='large'
        placeholder="input password"
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
      </Form.Item>

      <Form.Item className='flex flex-col justify-center items-center'>
        <Button type="default" htmlType="submit" loading={isLoading} className="bg-sky-500 my-4 px-8 text-white font-semibold">
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
