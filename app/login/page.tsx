'use client';
import React from 'react'
import { LockOutlined,EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { LoginAccount } from '@/Api/request';
import { CustomLabel } from '@/components';
import useUserStore from '@/store/userStore';


export default function Login() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const onFinish = async(values: any) => {
      console.log('Received values of form: ', values);
      const formData = new FormData();
      formData.append('password',values.password)
      formData.append('username',values.username)
      try {
        const response = await LoginAccount.LOGIN(formData)
        console.log(response)
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if(response.data.message){
          toast.error(response.data.message);
          router.push('/login');
        }else{
          toast.success('Successfully Login!');
          setUser(response.data.data)
          router.push('/');
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
        <a className="text-sky-500 m-0" href="">
          Forgot password?
        </a>
      </Form.Item>

      <Form.Item className='flex flex-col justify-center items-center'>
        <Button type="default" htmlType="submit" className="bg-sky-500 my-4 px-8 text-white font-semibold">
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
