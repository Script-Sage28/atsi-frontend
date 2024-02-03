'use client';
import React from 'react'
import { Typography } from 'antd';

const { Paragraph } = Typography;

interface ParagraphProps{
    // eslint-disable-next-line no-undef
    text: string | '';
    isEllipsis?: boolean;
}
export default function CustomParagraph({isEllipsis,text}: ParagraphProps) {
  const HTMLViewer = () => {
    return (
      <div dangerouslySetInnerHTML={{ __html: text }} />
    );
  };
  return (
  <Paragraph  ellipsis={!(isEllipsis ?? false) && { rows: 5 }}>
    {HTMLViewer()}
  </Paragraph>
  )
}
