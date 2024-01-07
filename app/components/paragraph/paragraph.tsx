'use client';
import React from 'react'
import { Typography } from 'antd';

const { Paragraph } = Typography;

interface ParagraphProps{
    text?: string | JSX.Element | '';
    isEllipsis?: boolean;
}
export default function CustomParagraph({isEllipsis,text}: ParagraphProps) {
  return (
  <Paragraph  ellipsis={!isEllipsis && { rows: 5 }}>
    {text}
  </Paragraph>
  )
}
