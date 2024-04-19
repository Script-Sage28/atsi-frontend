'use client';
import { Input, InputNumber, Modal, Skeleton, Slider } from 'antd';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronDown, FaCalendarAlt } from 'react-icons/fa';
import { BiSolidHot } from 'react-icons/bi';
import { CustomButton, CustomCard, CustomLabel } from './components';
import { Peso } from './helper/pesoSign';
import {
  AllBlogs,
  BrandsRequest,
  CategoriesRequest,
  LandingPageList,
  ProductsRequest,
} from './service/request';
// eslint-disable-next-line camelcase
import { T_Blogs, T_Categories, T_LandingPage } from './types/productList';
import { loadProducts, selector } from './zustand/store/store.provider';
import Noimg from '../public/assets/noimg.png';
import useStore from '@/zustand/store/store';
import { Swiper, SwiperSlide, type SwiperRef } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './globals.css';
import clsx from 'clsx';
import { findHighestAndLowestPrices } from './helper/minMaxPrice';
import CustomNextImage from './components/image/CustomNextImage';
import Facebook from './_document';

export default function Home() {
  const [loaded, setLoaded] = useState<boolean>(true);
  const swiperRef = useRef<SwiperRef>(null);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productsAll, setProductsAll] = useState([]);
  const [selectedBlogs, setSelectedBlogs] = useState<T_Blogs | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogs, setBlogs] = useState<T_Blogs[]>([]);
  const [landingData, setLandingData] = useState<T_LandingPage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState('');
  const imgUrl = process.env.NEXT_PUBLIC_PUBLIC_STORAGE_ENDPOINT;
  const { maxPrice, minPrice } = findHighestAndLowestPrices(productsAll);
  const [priceRange, setPriceRange] = useState<number[]>([maxPrice, minPrice]);
  const [minInput, setMinInput] = useState<number | undefined>(0);
  const [maxInput, setMaxInput] = useState<number | undefined>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
    setMinInput(minPrice);
    setMaxInput(maxPrice);
  }, [minPrice, maxPrice]);

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await ProductsRequest.GET_ALL({
          price: '',
          brandId: '',
          categoryId: '',
          name: '',
          status: '',
        });
        const res = await AllBlogs.FETCH({});
        const res1 = await BrandsRequest.GET_ALL({});
        const res3 = await CategoriesRequest.GET_ALL({
          isDeleted: false,
          status: 'Available',
        });
        const res2 = await LandingPageList.GET_ALL();
        const re = await ProductsRequest.GET_ALL({ isDeleted: false });
        setProductsAll(re.data.data);
        setLandingData(res2.data.data);
        setBrands(res1.data.data);
        setCategories(res3.data.data);
        const list = res.data.data.filter(
          (item: { isDeleted: boolean }) => !item.isDeleted,
        );
        const blogs = list?.map((item: any) => ({ ...item, loading: false }));
        setBlogs(blogs);
        loadProducts(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    void fetchProducts();
  }, []);

  const showModal = (data: any) => {
    setIsModalOpen(true);
    setSelectedBlogs(data);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategories(
      categoryName === selectedCategories ? '' : categoryName,
    );
  };
  const handleSliderChange = (value: number[]) => {
    setPriceRange(value);
    setMinInput(value[0]);
    setMaxInput(value[1]);
  };

  const handleMinInputChange = (value: number | null) => {
    if (typeof value === 'number') {
      setMinInput(value);
      setPriceRange([value, priceRange[1]]);
    } else {
      setMinInput(undefined);
    }
  };

  const handleMaxInputChange = (value: number | null) => {
    if (typeof value === 'number') {
      setMaxInput(value);
      setPriceRange([priceRange[0], value]);
    } else {
      setMaxInput(undefined);
    }
  };
  return (
    <>
      {/* Landing Page */}
      <div className="w-full ">
        <Swiper
          ref={swiperRef}
          slidesPerView={1}
          spaceBetween={10}
          modules={[Autoplay, Navigation]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {landingData &&
            landingData.landingPageImages?.length > 0 &&
            landingData.landingPageImages?.map((item: any, idx: number) => {
              return idx === 0 ? (
                <SwiperSlide>
                  <div
                    className=" bg-[#f5f5f5] h-[700px] md:p-52 max-w-full flex flex-row items-center bg-cover bg-center'"
                    style={{ backgroundImage: `url(${imgUrl + item.url})` }}
                  >
                    <div className="flex-grow">
                      <div className="sm:w-full flex flex-col sm:gap-4 md:gap-10 pb-8 pl-4 md:pl-0 md:w-3/4">
                        <div>
                          <CustomLabel
                            children={landingData.title}
                            variant="title"
                            titleLevel={1}
                            addedClass="title"
                          />
                        </div>
                        <div>
                          <CustomLabel
                            children={landingData.content}
                            variant="text"
                            addedClass="sm:text-base md:text-2xl"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="absolute -bottom-2 md:bottom-5 left-1/2 animate-bounce">
                      <FaChevronDown size={30} />
                    </div>
                  </div>
                </SwiperSlide>
              ) : (
                <SwiperSlide>
                  <div
                    className=" bg-[#f5f5f5] h-[700px] bg-cover bg-center md:p-52 max-w-full flex flex-row items-centerbg-cover bg-center'"
                    style={{ backgroundImage: `url(${imgUrl + item.url})` }}
                  ></div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-[400px] flex flex-col justify-top items-center pt-8 h-maxh-[700px]">
          <div className="flex gap-8 items-center">
            <p className="font-bold text-[28px]">Categories</p>
            <CustomButton
              children="Reset filter"
              addedClass="bg-sky-600 text-white"
              onClick={() => setSelectedCategories('')}
            />
          </div>
          <ul className="list-none flex flex-col flex-wrap pt-4 justify-start gap-4">
            {categories?.map((item: T_Categories, idx: number) => (
              <>
                <li
                  key={idx}
                  onClick={() => handleCategoryChange(item.id)}
                  className={clsx(
                    'px-4 py-1 w-max rounded-sm cursor-pointer',
                    selectedCategories === item.id &&
                      'bg-orange-400 text-white border-2 border-orange-500',
                  )}
                >
                  {item.name}
                </li>
              </>
            ))}
          </ul>
          <div className="p-4 bg-white w-64">
            <p className="mb-2">Price Range</p>
            <div>
              <div className="flex gap-2">
                <InputNumber
                  style={{ margin: '0 16px' }}
                  value={minInput}
                  placeholder="Min"
                  onChange={handleMinInputChange}
                />
                <InputNumber
                  style={{ margin: '0 16px' }}
                  value={maxInput}
                  placeholder="Max"
                  onChange={handleMaxInputChange}
                />
              </div>
              <Slider
                range={{ draggableTrack: true }}
                min={0}
                max={maxPrice}
                step={100}
                value={priceRange}
                onChange={handleSliderChange}
              />
            </div>
          </div>
        </div>
        {/* Products Section */}
        <div
          id="products"
          className="w-[65%] bg-white flex flex-col gap-4  md:py-8"
        >
          {/* Sales Products */}
          {isLoading ? (
            <div className="flex gap-2 flex-wrap overflow-x-hidden">
              <Swiper
                ref={swiperRef}
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 4,
                  },
                  1024: {
                    slidesPerView: 5,
                  },
                }}
                modules={[Pagination, Navigation]}
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <SwiperSlide key={index}>
                    <CustomCard addedClass="flex w-full h-[330px] overflow-hidden p-4">
                      <Skeleton.Image active />
                      <div className="w-full px-4">
                        <Skeleton active />
                      </div>
                    </CustomCard>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            brands?.map((item: any, idx: number) => {
              const brandId = item.id;
              const all = productsAll
                ?.filter((data: any) => {
                  const t = data.brand.id === brandId;
                  const isInPriceRange =
                    data.price >= priceRange[0] && data.price <= priceRange[1];
                  const isInSelectedCategories =
                    selectedCategories === '' ||
                    selectedCategories?.includes(data.categoryId);
                  return t && isInPriceRange && isInSelectedCategories;
                })
                .slice(0, 7);
              return (
                <>
                  {all.length === 0 ? null : (
                    <div key={idx}>
                      <div className="pl-12 pr-4 font-bold flex justify-between items-center mb-2">
                        <p className="text-2xl">{item.name}</p>
                        <Link href={`/product/${brandId}`}>View All</Link>
                      </div>
                      <Swiper
                        ref={swiperRef}
                        slidesPerView={1}
                        spaceBetween={30}
                        navigation={true}
                        breakpoints={{
                          640: {
                            slidesPerView: 1,
                          },
                          768: {
                            slidesPerView: 4,
                          },
                          1024: {
                            slidesPerView: 5,
                          },
                        }}
                        modules={[Pagination, Navigation]}
                      >
                        {all?.map((product: any, idx) => {
                          return (
                            <SwiperSlide>
                              <CustomCard
                                addedClass="flex w-full h-[330px] overflow-visible"
                                key={idx}
                              >
                                <Link
                                  className="relative w-full overflow-hidden"
                                  key={idx}
                                  href={`/product/${brandId}/${product.id}`}
                                  passHref
                                >
                                  {product.isSaleProduct ? (
                                    <div className="absolute w-[200px] z-40 left-4 top-4">
                                      <BiSolidHot
                                        size={28}
                                        className="text-red-600"
                                      />
                                    </div>
                                  ) : product.isNewRelease ? (
                                    <div className="absolute w-[200px] z-40 left-4 top-4">
                                      <img
                                        className="w-[28px] text-green-600"
                                        src={'/assets/icons8-new-100.png'}
                                        alt=""
                                      />
                                    </div>
                                  ) : null}
                                  <div className="w-full flex flex-col justify-start items-start">
                                    <div className=" w-full min-h-[200px] flex justify-center items-center">
                                      {loaded ? (
                                        <Skeleton.Image active />
                                      ) : (
                                        <Image
                                          src={
                                            product.media.length > 0 &&
                                            product.media[0].url !== ''
                                              ? `${imgUrl}${product.media[0].url}`
                                              : Noimg
                                          }
                                          alt={product.name}
                                          className="rounded-lg"
                                          width={170}
                                          height={200}
                                        />
                                      )}
                                    </div>
                                    <div className="w-full px-4">
                                      <CustomLabel
                                        children={product?.name}
                                        variant="title"
                                        titleLevel={5}
                                        addedClass="line-clamp-1 text-md text-left"
                                      />
                                      <p className="text-[12px] text-left">
                                        Stock: {product?.stock}
                                      </p>
                                      <div className="flex flex-col">
                                        <CustomLabel
                                          children={product?.category.name}
                                          variant="text"
                                          addedClass="font-semibold text-gray-400 line-clamp-1 text-left"
                                        />
                                        {product?.discount != null && (
                                          <CustomLabel
                                            children={`${product?.discount}% Off`}
                                            variant="text"
                                            addedClass="sm:text-base md:text-md text-gray-500 font-semibold text-left"
                                          />
                                        )}

                                        <CustomLabel
                                          children={
                                            product?.discountedPrice != null ? (
                                              <div className="flex gap-4">
                                                <p className="m-0">
                                                  {Peso(
                                                    product?.discountedPrice,
                                                  )}
                                                </p>
                                                <p className="m-0 line-through text-gray-600">
                                                  {Peso(product?.price)}
                                                </p>
                                              </div>
                                            ) : (
                                              Peso(product?.price)
                                            )
                                          }
                                          variant="text"
                                          addedClass="text-lg font-semibold text-[#ff4e4e] text-left"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </CustomCard>
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                    </div>
                  )}
                </>
              );
            })
          )}
        </div>
      </div>
      <div
        id="blogs"
        className="flex bg-white justify-top flex-col gap-4 items-center p-8 md:px-28"
      >
        <div className="flex flex-col justify-center items-center mb-4">
          <h3 className="font-bold tracking-wider">BLOG</h3>
          <p className="text-lg font-bold">
            Stay in the loop with the latest about ATSI's products
          </p>
        </div>
        <div className="blog flex w-full">
          <Swiper
            ref={swiperRef}
            slidesPerView={1}
            spaceBetween={20}
            navigation={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            modules={[Pagination, Navigation]}
            className="w-full flex gap-8"
          >
            {blogs?.map((item: any, idx) => {
              return (
                <SwiperSlide>
                  <div
                    key={idx}
                    className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
                  >
                    <div className="h-[160px]">
                      <Image
                        src={imgUrl + item.imageUrl}
                        className="object-fill w-full h-full"
                        alt="No pics"
                        width={350}
                        height={150}
                      />
                    </div>
                    <div className="w-full text-left ml-4 mt-4">
                      <p className="line-clamp-1 text-[20px] font-semibold">
                        {item.title}
                      </p>
                      <p className="flex items-center text-[16px] gap-2">
                        <FaCalendarAlt size={20} />
                        {new Date(item.createdAt).toLocaleDateString(
                          undefined,
                          { year: 'numeric', month: 'long', day: 'numeric' },
                        )}
                      </p>
                    </div>
                    <div className="text-left p-4">
                      <div
                        className="line-clamp-4 h-28 text-normal text-[16px]"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      />
                      <CustomButton
                        children="Read more >>"
                        addedClass="bg-transparent text-orange-400 border-none shadow-none mt-4"
                        onClick={() => showModal(item)}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Modal
            title=""
            open={isModalOpen}
            footer={null}
            onCancel={handleCancel}
            width={800}
          >
            {selectedBlogs && (
              <div className="h-max">
                <div className=" mb-4">
                  <Image
                    src={imgUrl + selectedBlogs.imageUrl}
                    className="object-fill min-w-max"
                    alt="No pics"
                    width={400}
                    height={250}
                  />
                </div>
                <div className="w-full text-left ml-4 mt-4">
                  <p className="line-clamp-1 text-[20px] font-semibold">
                    {selectedBlogs.title}
                  </p>
                  <p className="flex items-center text-[16px] gap-2">
                    <FaCalendarAlt size={20} />
                    {new Date(selectedBlogs.createdAt).toLocaleDateString(
                      undefined,
                      { year: 'numeric', month: 'long', day: 'numeric' },
                    )}
                  </p>
                </div>
                <div className="text-left p-4">
                  <div
                    className=" h-max text-normal text-[16px]"
                    dangerouslySetInnerHTML={{ __html: selectedBlogs.content }}
                  />
                </div>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </>
  );
}
