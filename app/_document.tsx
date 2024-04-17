/* eslint-disable @next/next/inline-script-id */
// import Script from 'next/script';

function Facebook() {
  return (
    <>
      <div id="fb-root"></div>

      <div id="fb-customer-chat" className="fb-customerchat"></div>
      {/* <Script
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            var chatbox = document.getElementById('fb-customer-chat');
            chatbox.setAttribute("page_id", "271939260034412");
            chatbox.setAttribute("attribution", "biz_inbox");
            chatbox.setAttribute('theme_color', '#01224F');
            chatbox.setAttribute(
              'logged_in_greeting',
              'Good day! How may I help you?',
            );
            chatbox.setAttribute(
              'logged_out_greeting',
              'Good day! How may I help you?',
            );
            
            window.fbAsyncInit = function() {
              FB.init({
                xfbml            : true,
                version          : 'v13.0'
              });
            };
      
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        `,
        }}
      ></Script> */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            var chatbox = document.getElementById('fb-customer-chat');
            chatbox.setAttribute("page_id", "702149526870091");
            chatbox.setAttribute("attribution", "biz_inbox");
            
            window.fbAsyncInit = function() {
              FB.init({
                xfbml            : true,
                version          : 'v12.0'
              });
            };
      
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        `,
        }}
      ></script>
    </>
  );
}

export default Facebook;
