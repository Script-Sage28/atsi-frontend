import React, { Fragment } from 'react';
import { ConfigProvider } from 'antd';
import type { Metadata } from 'next';
// import { Oxygen } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Facebook from './_document';
import { CustomFooter, CustomHeader } from './components';
import { appTheme } from '../theme/app-theme';
import '@/styles/main.css';

// const inter = Oxygen({
//   subsets: ['latin'],
//   weight: '300',
// });

export const metadata: Metadata = {
  title: 'ATSI - Auxytech Technology Solutions',
  description: 'ATSI web app developed by Angelo Mien',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <html lang="en">
        <Facebook />
        <a href="https://auxytech.com/" referrerPolicy="origin"></a>
        <link rel="icon" type="image/png" href={`/logo.png `} />
        <body className="bg-white text-black">
          <ConfigProvider theme={appTheme}>
            <Toaster />
            <CustomHeader />
            {children}
            <CustomFooter />
          </ConfigProvider>
        </body>
      </html>
    </Fragment>
  );
}
