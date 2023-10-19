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
  icon?: React.ReactNode;
}

function CustomButton({
  children,
  onClick,
  addedClass,
  buttonType = 'primary',
  size,
  icon,
}: BtnProps) {
  return (
    <Button
      icon={icon}
      type={buttonType}
      size={size}
      onClick={onClick}
      className={clsx(addedClass)}
    >
      {children}
    </Button>
  );
}

export default CustomButton;
