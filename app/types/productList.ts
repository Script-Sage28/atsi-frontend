/* eslint-disable no-use-before-define */
interface LandingPageImage {
  id: string;
  landingPageContentId: string;
  url: string;
  createdAt: string;
  createdBy: string;
  updatedBy: null | string;
  updatedAt: null | string;
  isDeleted: boolean;
  createdByUser: {
    id: string;
    username: string;
    email: string;
    password: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    type: string;
    isDeleted: boolean;
  };
  updatedByUser: null;
}
interface CreatedByUser {
  id: string;
  username: string;
  email: string;
  password: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  type: string;
  isDeleted: boolean;
}
export interface  T_Blogs{
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  isDeleted: boolean;
  createdByUser: any;
  updatedByUser: any;
  loading:boolean;
}

export interface T_Brand {
    id: string;
    name: string;
    description: string;
    logo: string;
    createdAt: Date;
    createdBy: string;
    updatedBy: null | string;
    updatedAt: null | Date;
    status: string;  
}
export interface T_Categories {
    id: string;
    name: string;
    description: string;
    status: string;
    createdAt: Date;
    createdBy: string;
    updatedAt: null | Date;
    updatedBy: null | string;
    brandsId:string;
    updatedByUser: null | string;
    createdByUser:{
        id: string;
        username: string;
        email: string;
        password: string;
        status: string;
        createdAt: string;
        updatedAt: string | null;
        type: string;
    }
    Brands: T_Brand;
}
export interface T_Feedback{
  id: string;
  content: string;
  productsId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string | null;
  updatedBy: string | null;
  isDeleted: boolean;
  rating: number;
  createdByUser: {
    id: string;
    username: string;
    email: string;
    password: string;
    status: string;
    createdAt: string;
    updatedAt: null | string;
    type: string;
  };
  updatedByUser: null | {
    id: string;
    username: string;
    email: string;
    password: string;
    status: string;
    createdAt: Date;
    updatedAt: null | string;
    type: string;
  };
  product: T_Product; 
}
export interface T_LandingPage{
  id: string;
  content: string;
  title: string;
  createdBy: string;
  createdAt: string;
  updatedBy: null | string;
  updatedAt: string;
  isDeleted: boolean;
  status: string;
  createdByUser: CreatedByUser;
  updatedByUser: null;
  landingPageImages: LandingPageImage[];
}
export interface T_Product {
    id: string;
    name: string;
    description: string;
    discount: null | number;
    stock: number;
    price: number;
    discountedPrice: null | number;
    rating: number | undefined;
    status: string;
    lazadaLink: null | string;
    shoppeeLink: null | string;
    isSaleProduct: boolean;
    categoryId: string;
    createdBy: string;
    updatedBy: null | string;
    createdAt: Date;
    updatedAt: null | string;
    brandId: string;
    createdByUser: {
      id: string;
      username: string;
      email: string;
      password: string;
      status: string;
      createdAt: string;
      updatedAt: null | string;
      type: string;
    };
    updatedByUser: null | {
      id: string;
      username: string;
      email: string;
      password: string;
      status: string;
      createdAt: Date;
      updatedAt: null | string;
      type: string;
    };
    media: Array<{
      id: string;
      url: string;
      createdAt: Date;
      createdBy: string;
      updatedBy: null | string;
      updatedAt: null | Date;
      productsId: string;
    }>;
    category: {
      id: string;
      name: string;
      description: string;
      status: string;
      createdAt: Date;
      createdBy: string;
      updatedAt: null | Date;
      updatedBy: null | string;
      brandsId: string;
    };
    brand: {
      id: string;
      name: string;
      description: string;
      logo: string;
      createdAt: Date;
      createdBy: string;
      updatedAt: null | Date;
      updatedBy: null | string;
      status: string;
    };
    productReviews: Array<{
      id: string;
      content: string;
      productsId: string;
      usersId: string;
      createdAt: Date; 
      updatedAt: string | null;
      rating:number | undefined;
      isDeleted: boolean;
      createdByUser:{
        id: string;
        username: string;
        email: string;
        password: string;
        status: string;
        createdAt: string;
        updatedAt: string | null;
        type: string;
      }
    }>;
}
export interface T_ProductList {
    onSale: T_Product[];
    latest: T_Product[];
    allProducts: T_Product[];
}


