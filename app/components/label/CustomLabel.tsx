import React from 'react';
import { Typography } from 'antd';

interface labelProps {
  children: React.ReactNode;
  variant: 'text' | 'title';
  titleLevel?: 1 | 2 | 3 | 4 | 5;
  disabled?: boolean;
  textType?: 'secondary' | 'success' | 'warning' | 'danger';
  addedClass?: string;
}

const { Title, Text } = Typography;
export default function CustomLabel({
  children,
  variant = 'text',
  titleLevel,
  disabled,
  textType,
  addedClass,
}: labelProps) {

  return variant === 'text' ? (
    <Text className={addedClass} type={textType}>
      {children}
    </Text>
  ) : (
    <Title level={titleLevel} className={addedClass} disabled={disabled}>
      {children}
    </Title>
  );
}
