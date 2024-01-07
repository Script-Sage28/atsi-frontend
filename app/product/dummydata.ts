const dummyProducts = [
    {
      id: 1,
      name: 'Product A',
      category: 'CCTV',
      rating: 4.5,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit aliquet sagittis id consectetur purus ut faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada. Mi in nulla posuere sollicitudin aliquam ultrices sagittis. Lectus magna fringilla urna porttitor rhoncus. Malesuada fames ac turpis egestas integer. Senectus et netus et malesuada fames ac turpis. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Nunc eget lorem dolor sed viverra ipsum. Duis tristique sollicitudin nibh sit amet commodo. Sollicitudin aliquam ultrices sagittis orci. Curabitur gravida arcu ac tortor dignissim convallis. Luctus accumsan tortor posuere ac ut consequat semper viverra nam. Pretium quam vulputate dignissim suspendisse in est.',
      comments: [
        { user: 'User1', comment: 'Great product!',rate:4.6,date:'10/18/2023' },
        { user: 'User2', comment: 'Highly recommended.',rate:4.6,date:'10/18/2023' },
      ],
      images: [
        '/assets/product_6.jpg',
        '/assets/product_1.png',
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
      category: 'CCTV',
      rating: 3.8,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit aliquet sagittis id consectetur purus ut faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada. Mi in nulla posuere sollicitudin aliquam ultrices sagittis. Lectus magna fringilla urna porttitor rhoncus. Malesuada fames ac turpis egestas integer. Senectus et netus et malesuada fames ac turpis. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Nunc eget lorem dolor sed viverra ipsum. Duis tristique sollicitudin nibh sit amet commodo. Sollicitudin aliquam ultrices sagittis orci. Curabitur gravida arcu ac tortor dignissim convallis. Luctus accumsan tortor posuere ac ut consequat semper viverra nam. Pretium quam vulputate dignissim suspendisse in est.',
      comments: [
        { user: 'User1', comment: 'Great product!',rate:4.6,date:'10/18/2023' },
        { user: 'User2', comment: 'Highly recommended.',rate:4.6,date:'10/18/2023' },
      ],
      images: [
        '/assets/product_5.jpg',
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
      category: 'CCTV',
      rating: 4.2,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit aliquet sagittis id consectetur purus ut faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada. Mi in nulla posuere sollicitudin aliquam ultrices sagittis. Lectus magna fringilla urna porttitor rhoncus. Malesuada fames ac turpis egestas integer. Senectus et netus et malesuada fames ac turpis. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Nunc eget lorem dolor sed viverra ipsum. Duis tristique sollicitudin nibh sit amet commodo. Sollicitudin aliquam ultrices sagittis orci. Curabitur gravida arcu ac tortor dignissim convallis. Luctus accumsan tortor posuere ac ut consequat semper viverra nam. Pretium quam vulputate dignissim suspendisse in est.',
      comments: [
        { user: 'User1', comment: 'Great product!',rate:4.6,date:'10/18/2023' },
        { user: 'User2', comment: 'Highly recommended.',rate:4.6,date:'10/18/2023' },
      ],
      images: [
        '/assets/product_7.jpg',
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
      category: 'Highlights',
      rating: 3.8,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit aliquet sagittis id consectetur purus ut faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada. Mi in nulla posuere sollicitudin aliquam ultrices sagittis. Lectus magna fringilla urna porttitor rhoncus. Malesuada fames ac turpis egestas integer. Senectus et netus et malesuada fames ac turpis. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Nunc eget lorem dolor sed viverra ipsum. Duis tristique sollicitudin nibh sit amet commodo. Sollicitudin aliquam ultrices sagittis orci. Curabitur gravida arcu ac tortor dignissim convallis. Luctus accumsan tortor posuere ac ut consequat semper viverra nam. Pretium quam vulputate dignissim suspendisse in est.',
      comments: [
        { user: 'User1', comment: 'Great product!',rate:4.6,date:'10/18/2023' },
        { user: 'User2', comment: 'Highly recommended.',rate:4.6,date:'10/18/2023' },
      ],
      images: [
        '/assets/product_8.jpg',
        '/assets/product_1.png',
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
      category: 'Highlights',
      rating: 3.8,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit aliquet sagittis id consectetur purus ut faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada. Mi in nulla posuere sollicitudin aliquam ultrices sagittis. Lectus magna fringilla urna porttitor rhoncus. Malesuada fames ac turpis egestas integer. Senectus et netus et malesuada fames ac turpis. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Nunc eget lorem dolor sed viverra ipsum. Duis tristique sollicitudin nibh sit amet commodo. Sollicitudin aliquam ultrices sagittis orci. Curabitur gravida arcu ac tortor dignissim convallis. Luctus accumsan tortor posuere ac ut consequat semper viverra nam. Pretium quam vulputate dignissim suspendisse in est.',
      comments: [
        { user: 'User1', comment: 'Great product!',rate:4.6,date:'10/18/2023' },
        { user: 'User2', comment: 'Highly recommended.',rate:4.6,date:'10/18/2023' },
      ],
      images: [
        '/assets/product_4.png',
        '/assets/product_1.png',
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
      category: 'CCTV',
      rating: 3.8,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit aliquet sagittis id consectetur purus ut faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada. Mi in nulla posuere sollicitudin aliquam ultrices sagittis. Lectus magna fringilla urna porttitor rhoncus. Malesuada fames ac turpis egestas integer. Senectus et netus et malesuada fames ac turpis. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Nunc eget lorem dolor sed viverra ipsum. Duis tristique sollicitudin nibh sit amet commodo. Sollicitudin aliquam ultrices sagittis orci. Curabitur gravida arcu ac tortor dignissim convallis. Luctus accumsan tortor posuere ac ut consequat semper viverra nam. Pretium quam vulputate dignissim suspendisse in est.',
      comments: [
        { user: 'User1', comment: 'Great product!',rate:4.6,date:'10/18/2023' },
        { user: 'User2', comment: 'Highly recommended.',rate:4.6,date:'10/18/2023' },
      ],
      images: [
        '/assets/product_8.jpg',
        '/assets/product_1.png',
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
      category: 'CCTV',
      rating: 3.8,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit aliquet sagittis id consectetur purus ut faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada. Mi in nulla posuere sollicitudin aliquam ultrices sagittis. Lectus magna fringilla urna porttitor rhoncus. Malesuada fames ac turpis egestas integer. Senectus et netus et malesuada fames ac turpis. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Nunc eget lorem dolor sed viverra ipsum. Duis tristique sollicitudin nibh sit amet commodo. Sollicitudin aliquam ultrices sagittis orci. Curabitur gravida arcu ac tortor dignissim convallis. Luctus accumsan tortor posuere ac ut consequat semper viverra nam. Pretium quam vulputate dignissim suspendisse in est.',
      comments: [
        { user: 'User1', comment: 'Great product!',rate:4.6,date:'10/18/2023' },
        { user: 'User2', comment: 'Highly recommended.',rate:4.6,date:'10/18/2023' },
      ],
      images: [
        '/assets/product_5.jpg',
        '/assets/product_1.png',
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
      category: 'CCTV',
      rating: 3.8,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit aliquet sagittis id consectetur purus ut faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada. Mi in nulla posuere sollicitudin aliquam ultrices sagittis. Lectus magna fringilla urna porttitor rhoncus. Malesuada fames ac turpis egestas integer. Senectus et netus et malesuada fames ac turpis. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Nunc eget lorem dolor sed viverra ipsum. Duis tristique sollicitudin nibh sit amet commodo. Sollicitudin aliquam ultrices sagittis orci. Curabitur gravida arcu ac tortor dignissim convallis. Luctus accumsan tortor posuere ac ut consequat semper viverra nam. Pretium quam vulputate dignissim suspendisse in est.',
      comments: [
        { user: 'User1', comment: 'Great product!',rate:4.6,date:'10/18/2023' },
        { user: 'User2', comment: 'Highly recommended.',rate:4.6,date:'10/18/2023' },
      ],
      images: [
        '/assets/product_6.jpg',
        '/assets/product_1.png',
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
      category: 'Fire Alarm',
      rating: 3.8,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit aliquet sagittis id consectetur purus ut faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada. Mi in nulla posuere sollicitudin aliquam ultrices sagittis. Lectus magna fringilla urna porttitor rhoncus. Malesuada fames ac turpis egestas integer. Senectus et netus et malesuada fames ac turpis. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Nunc eget lorem dolor sed viverra ipsum. Duis tristique sollicitudin nibh sit amet commodo. Sollicitudin aliquam ultrices sagittis orci. Curabitur gravida arcu ac tortor dignissim convallis. Luctus accumsan tortor posuere ac ut consequat semper viverra nam. Pretium quam vulputate dignissim suspendisse in est.',
      comments: [
        { user: 'User1', comment: 'Great product!',rate:4.6,date:'10/18/2023' },
        { user: 'User2', comment: 'Highly recommended.',rate:4.6,date:'10/18/2023' },
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
      category: 'Fire Alarm',
      rating: 3.8,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit aliquet sagittis id consectetur purus ut faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada. Mi in nulla posuere sollicitudin aliquam ultrices sagittis. Lectus magna fringilla urna porttitor rhoncus. Malesuada fames ac turpis egestas integer. Senectus et netus et malesuada fames ac turpis. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Nunc eget lorem dolor sed viverra ipsum. Duis tristique sollicitudin nibh sit amet commodo. Sollicitudin aliquam ultrices sagittis orci. Curabitur gravida arcu ac tortor dignissim convallis. Luctus accumsan tortor posuere ac ut consequat semper viverra nam. Pretium quam vulputate dignissim suspendisse in est.',
      comments: [
        { user: 'User1', comment: 'Great product!',rate:4.6,date:'10/18/2023' },
        { user: 'User2', comment: 'Highly recommended.',rate:4.6,date:'10/18/2023' },
      ],
      images: [
        '/assets/product_2.png',
        '/assets/product_1.png',
      ],
      price: 79.99,
      discount: 15, // Percentage discount
      discountedPrice: 67.99,
      lazadaLink: 'https://www.lazada.com/productB',
      shopeeLink: 'https://shopee.com/productB',
    },
  ];
  
  export default dummyProducts;
  