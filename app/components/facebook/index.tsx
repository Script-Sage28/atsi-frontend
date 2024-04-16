/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable one-var */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @next/next/inline-script-id */
// 'use client'
// import React, { useEffect } from 'react';

// declare global {
//     interface Window {
//       FB: any;
//       fbAsyncInit: () => void;
//     }
//   }
 
// const FacebookMessenger = () => {
//     useEffect(() => {
//         // Initialize Facebook SDK
//         window.fbAsyncInit = function() {
//           window.FB.init({
//             xfbml: true,
//             version: 'v12.0'
//           });
//         };
    
//         // Load Facebook SDK asynchronously
//         (function(d, s, id) {
//           let js,
//             fjs = d.getElementsByTagName(s)[0];
//           if (d.getElementById(id)) return;
//           js = d.createElement(s) as HTMLScriptElement;
//           js.id = id;
//           js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
//           fjs.parentNode?.insertBefore(js, fjs);
//         })(document, 'script', 'facebook-jssdk');
//       }, []);
    
//       return (
//         <div
//           className="fb-customerchat"
//             // @ts-expect-error
//           attribution="setup_tool"
//           page_id={'271939260034412'}
//           theme_color="#0084FF"
//         ></div>
//       );
// };
    
//     export default FacebookMessenger;


import React from 'react';
import { FacebookProvider, MessageUs } from 'react-facebook';

const MessengerChat = () => {
  return (
    <FacebookProvider appId="271939260034412">
    <MessageUs
      messengerAppId="123456789"
      pageId="271939260034412"
   
    />
    </FacebookProvider>
  );
};

export default MessengerChat;