'use client';
import React from 'react';
import { Button } from 'antd';
import clsx from 'clsx';

interface BtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  addedClass?: any;
  buttonType?: 'primary' | 'dashed' | 'default' | 'link' | 'text';
  size?: 'large' | 'middle' | 'small';
  htmlType?: any | 'button';
  icon?: React.ReactNode;
  loading?:boolean;
}

function CustomButton({
  children,
  onClick,
  addedClass,
  buttonType = 'primary',
  size,
  icon,
  htmlType,
  loading
}: BtnProps) {
  return (
    <Button
      icon={icon}
      type={buttonType}
      size={size}
      htmlType={htmlType}
      onClick={onClick}
      className={clsx(addedClass)}
      loading={loading}
    >
      {children}
    </Button>
  );
}

export default CustomButton;
