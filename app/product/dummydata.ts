const dummyProducts = [
    {
      id: 1,
      name: 'Product A',
      rating: 4.5,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      comments: [
        { user: 'User1', comment: 'Great product!' },
        { user: 'User2', comment: 'Highly recommended.' },
      ],
      images: [
        'https://images.pexels.com/photos/96612/pexels-photo-96612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      ],
      price: 49.99,
      discount: 10, // Percentage discount
      discountedPrice: 44.99,
      lazadaLink: 'https://images.pexels.com/photos/3205735/pexels-photo-3205735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      shopeeLink: 'https://images.pexels.com/photos/3205737/pexels-photo-3205737.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 2,
      name: 'Product B',
      rating: 3.8,
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      comments: [
        { user: 'User3', comment: 'Decent product.' },
        { user: 'User4', comment: 'Could be better.' },
      ],
      images: [
        '/assets/product_3.png',
        '/assets/product_4.png',
      ],
      price: 79.99,
      discount: 15, // Percentage discount
      discountedPrice: 67.99,
      lazadaLink: 'https://www.lazada.com/productB',
      shopeeLink: 'https://shopee.com/productB',
    },
    {
      id: 3,
      name: 'Product C',
      rating: 4.2,
      description: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      comments: [
        { user: 'User5', comment: 'Impressive quality.' },
        { user: 'User6', comment: 'Good value for money.' },
      ],
      images: [
        '/assets/product_4.png',
        '/assets/product_1.png',
      ],
      price: 29.99,
      discount: 5,
      discountedPrice: 28.49,
      lazadaLink: 'https://www.lazada.com/productC',
      shopeeLink: 'https://shopee.com/productC',
    },
    {
      id: 4,
      name: 'Product D',
      rating: 3.8,
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      comments: [
        { user: 'User3', comment: 'Decent product.' },
        { user: 'User4', comment: 'Could be better.' },
      ],
      images: [
        'https://media.istockphoto.com/id/530121569/photo/camera-security.jpg?s=1024x1024&w=is&k=20&c=P5hXI1qMnkiTVGWFEL3vdP1FgFVZKb7WhZHplxyv3Ik=',
        'https://media.istockphoto.com/id/1448266086/photo/modern-public-cctv-camera-recording-cameras-for-monitoring-all-day-and-night-concept-of.jpg?s=1024x1024&w=is&k=20&c=fMpH7H8-s7JNH6taCz8RZEp-cVXX6To7n93vSPOBn-4=',
      ],
      price: 79.99,
      discount: 15, // Percentage discount
      discountedPrice: 67.99,
      lazadaLink: 'https://www.lazada.com/productB',
      shopeeLink: 'https://shopee.com/productB',
    },
    {
      id: 5,
      name: 'Product E',
      rating: 3.8,
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      comments: [
        { user: 'User3', comment: 'Decent product.' },
        { user: 'User4', comment: 'Could be better.' },
      ],
      images: [
        'https://media.istockphoto.com/id/1133894680/photo/security-cctv-camera-in-the-office-building.jpg?s=1024x1024&w=is&k=20&c=xvQ644pji-ZSilcJXVOGZQDU3FOjHzAd3ydn4WPCABU=',
        'https://media.istockphoto.com/id/511061106/photo/security-cctv-camera.jpg?s=1024x1024&w=is&k=20&c=SqDOugcE2gV5CMnnVvdlBBatPEDT3LZJSymd7MjhXX4=',
      ],
      price: 79.99,
      discount: 15, // Percentage discount
      discountedPrice: 67.99,
      lazadaLink: 'https://www.lazada.com/productB',
      shopeeLink: 'https://shopee.com/productB',
    },
    {
      id: 6,
      name: 'Product F',
      rating: 3.8,
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      comments: [
        { user: 'User3', comment: 'Decent product.' },
        { user: 'User4', comment: 'Could be better.' },
      ],
      images: [
        'https://images.pexels.com/photos/96612/pexels-photo-96612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      ],
      price: 79.99,
      discount: 15, // Percentage discount
      discountedPrice: 67.99,
      lazadaLink: 'https://www.lazada.com/productB',
      shopeeLink: 'https://shopee.com/productB',
    },
    {
      id: 7,
      name: 'Product G',
      rating: 3.8,
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      comments: [
        { user: 'User3', comment: 'Decent product.' },
        { user: 'User4', comment: 'Could be better.' },
      ],
      images: [
        'https://media.istockphoto.com/id/1417833241/photo/cctv-camera-on-cement-wall-scan-the-area-for-surveillance-purposes.jpg?s=1024x1024&w=is&k=20&c=A1ojmekIQucSnK1e2hiecSEHMKpanAaEDU78Tnd4oGc=',
        'https://media.istockphoto.com/id/1420920974/photo/cctv-camera-on-cement-wall-scan-the-area-for-surveillance-purpose-technology-and-innovation.jpg?s=1024x1024&w=is&k=20&c=MmrZhPZ-3zeE0A3qR6Mp_NSNEXCzpp1dlsHm8Fql8BY=',
      ],
      price: 79.99,
      discount: 15, // Percentage discount
      discountedPrice: 67.99,
      lazadaLink: 'https://www.lazada.com/productB',
      shopeeLink: 'https://shopee.com/productB',
    },
    {
      id: 8,
      name: 'Product H',
      rating: 3.8,
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      comments: [
        { user: 'User3', comment: 'Decent product.' },
        { user: 'User4', comment: 'Could be better.' },
      ],
      images: [
        'https://media.istockphoto.com/id/848560812/photo/3d-rendering-three-security-cameras.jpg?s=1024x1024&w=is&k=20&c=RdFEH4n_oLQ1Wwbl2WlZXcaEXKkHVFjOH5dhHvJ7wd8=',
        'https://media.istockphoto.com/id/539643726/photo/cctv-security-camera-closed-circuit-television-surveillance-cam.jpg?s=1024x1024&w=is&k=20&c=1TH2j20hMjV3VFonraZ4qLKeoW14eOrR45TnlNCO5EA=',
      ],
      price: 79.99,
      discount: 15, // Percentage discount
      discountedPrice: 67.99,
      lazadaLink: 'https://www.lazada.com/productB',
      shopeeLink: 'https://shopee.com/productB',
    },
    {
      id: 9,
      name: 'Product I',
      rating: 3.8,
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      comments: [
        { user: 'User3', comment: 'Decent product.' },
        { user: 'User4', comment: 'Could be better.' },
      ],
      images: [
        '/assets/product_1.png',
        '/assets/product_2.png',
      ],
      price: 79.99,
      discount: 15, // Percentage discount
      discountedPrice: 67.99,
      lazadaLink: 'https://www.lazada.com/productB',
      shopeeLink: 'https://shopee.com/productB',
    },
    {
      id: 10,
      name: 'Product J',
      rating: 3.8,
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      comments: [
        { user: 'User3', comment: 'Decent product.' },
        { user: 'User4', comment: 'Could be better.' },
      ],
      images: [
        'https://media.istockphoto.com/id/1133894680/photo/security-cctv-camera-in-the-office-building.jpg?s=1024x1024&w=is&k=20&c=xvQ644pji-ZSilcJXVOGZQDU3FOjHzAd3ydn4WPCABU=',
        'https://media.istockphoto.com/id/511061106/photo/security-cctv-camera.jpg?s=1024x1024&w=is&k=20&c=SqDOugcE2gV5CMnnVvdlBBatPEDT3LZJSymd7MjhXX4=',
      ],
      price: 79.99,
      discount: 15, // Percentage discount
      discountedPrice: 67.99,
      lazadaLink: 'https://www.lazada.com/productB',
      shopeeLink: 'https://shopee.com/productB',
    },
  ];
  
  export default dummyProducts;
  