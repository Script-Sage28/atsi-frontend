/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
'use client';
import React, { useState } from 'react'
import { LockOutlined,EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { CustomLabel } from '@/components';
import { LoginAccount } from '@/service/request';
import { saveUserInfo } from '@/zustand/store/store.provider';


export default function Login() {
  const router = useRouter();
  const [isLoading,setIsLoading] = useState(false)
  const onFinish = async(values: any) => {
      const formData = new FormData();
      formData.append('password',values.password)
      formData.append('username',values.username)
      try {
        setIsLoading(true)
        const response = await LoginAccount.LOGIN(formData);
        if (response.status === 200) {
          if (!('message' in response.data)) {
            console.log(response.data.data);
            saveUserInfo(response.data.data);
            toast.success('Login successfully');
            setIsLoading(false)
            router.push('/')
          } else {
            console.error('Login failed:', response.data.message);
            setIsLoading(false)
            toast.error(response.data.message);
          }
        }

      } catch (error: any) {
        console.error('Error during Login:', error.message);
        toast.error('An error occurred during login.');
      }
    };
  return (
    <div className='w-full flex flex-col justify-center items-center px-2 md:px-10 pt-4 md:pt-20'>
        <CustomLabel
            children='LOGIN'
            variant='text'
            addedClass='font-extrabold text-2xl'
        />
   <Form
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
        <Input size='large' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
      <Form.Item className='flex justify-end items-end mr-2 mb-0'>
        <a className="text-sky-500 m-0" href="/forgotPassword">
          Forgot password?
        </a>
      </Form.Item>

      <Form.Item className='flex flex-col justify-center items-center'>
        <Button type="default" htmlType="submit" loading={isLoading}  className="bg-sky-500 my-4 px-8 text-white font-semibold">
          Log in
        </Button>
        <div>
        or <Link className='text-sky-500' href="/register">Register now!</Link>
        </div>

      </Form.Item>
   </Form>      
    </div>
  )
}
