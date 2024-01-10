'use client';
import React from 'react'
import { Typography } from 'antd';

const { Paragraph } = Typography;

interface ParagraphProps{
    // eslint-disable-next-line no-undef
    text?: string | JSX.Element | '';
    isEllipsis?: boolean;
}
export default function CustomParagraph({isEllipsis,text}: ParagraphProps) {
  return (
  <Paragraph  ellipsis={!(isEllipsis ?? false) && { rows: 5 }}>
    {text}
  </Paragraph>
  )
}
