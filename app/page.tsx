'use client';
import Image from 'next/image';
import { BsFire } from 'react-icons/bs';
import { FaChevronDown } from 'react-icons/fa';
import { WiStars } from 'react-icons/wi';
import { CustomButton, CustomCard, CustomLabel } from './components';

export default function Home() {
  // Initializations
  interface Product {
    id: number;
    name: string;
    category: string;
    imageUrl: string;
    price: string;
    discount: string;
    discountedPrice: string;
  }

  const products: Product[] = [
    {
      id: 0,
      name: 'Product 1',
      category: 'Fire Alarm',
      imageUrl: '/assets/product_1.png',
      price: '₱ 2,180.00',
      discount: '',
      discountedPrice: '',
    },
    {
      id: 1,
      name: 'Product 2',
      category: 'CCTV',
      imageUrl: '/assets/product_2.png',
      price: '₱ 2,180.00',
      discount: '',
      discountedPrice: '',
    },
    {
      id: 2,
      name: 'Product 3',
      category: 'Fire Alarm',
      imageUrl: '/assets/product_3.png',
      price: '₱ 2,180.00',
      discount: '',
      discountedPrice: '',
    },
    {
      id: 3,
      name: 'Product 4',
      category: 'Fire Alarm',
      imageUrl: '/assets/product_4.png',
      price: '₱ 2,180.00',
      discount: '',
      discountedPrice: '',
    },
    {
      id: 4,
      name: 'Product 5',
      category: 'Fire Alarm',
      imageUrl: '/assets/product_1.png',
      price: '₱ 2,180.00',
      discount: '',
      discountedPrice: '',
    },
  ];

  return (
    <>
      {/* Landing Page */}
      <div className="container h-fit-to-screen-without-header p-52 flex flex-row items-center">
        <div className="flex-grow">
          <div className="w-3/4">
            <CustomLabel
              children="AuxyTech Technology Solutions Inc."
              variant="title"
              titleLevel={1}
              addedClass="title"
            />

            <div className="my-20">
              <CustomLabel
                children="We provide trusted security solutions: CCTV, PABX, Access Control, FDAS, PA System, Data Cabinets, Fiber Optics, AV Cables, and more, ensuring your safety and security."
                variant="text"
                addedClass="text-2xl mt-10"
              />
            </div>

            <div className="flex flex-row gap-5">
              <CustomButton
                addedClass="bg-[#00A3FF] p-7 rounded-xl flex items-center justify-center text-xl"
                children="View Products"
              />
              <CustomButton
                addedClass="bg-white text-[#00A3FF] border border-[#00A3FF] p-7 rounded-xl flex items-center justify-center text-xl"
                children="Browse More"
              />
            </div>
          </div>
        </div>
        {/* <div className="flex-grow items-center justify-center flex">
          <Image
            src="/assets/landing_image.png"
            width={450}
            height={450}
            alt="camera"
          />
        </div> */}

        <div className="absolute bottom-5 left-1/2 animate-bounce">
          <FaChevronDown size={30} />
        </div>
      </div>

      {/* Products Section */}
      <div id="products" className="px-40 py-14">
        {/* Sales Products */}
        <div className="grid grid-cols-1">
          <div className="flex flex-row items-start justify-between">
            <CustomLabel
              children="Sales Products"
              variant="title"
              titleLevel={4}
            />

            <CustomButton
              children="View All"
              buttonType="link"
              addedClass="text-base"
            />
          </div>

          <div className="mt-10 grid grid-flow-col-dense grid-cols-5 space-x-10">
            {products.map((product, idx) => (
              <CustomCard key={idx} addedClass="relative overflow-hidden">
                <div className="bg-red-700 absolute -left-[75px] -top-[7px] -rotate-45 p-3 w-[200px] z-50 text-center">
                  <div className="break-normal text-center flex flex-col items-center justify-center">
                    <BsFire color="white" size={20} />
                    <CustomLabel
                      children="Hot Deals"
                      variant="text"
                      addedClass="text-sm text-white font-semibold"
                    />
                  </div>
                </div>
                <div className="w-full flex-grow flex flex-col justify-start items-start">
                  <div className="flex-grow w-full flex justify-center items-center py-5">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={130}
                      height={130}
                    />
                  </div>

                  <div className="w-full px-5 pb-2">
                    <CustomLabel
                      children={product?.name}
                      variant="title"
                      titleLevel={5}
                    />
                    <div className="flex flex-col">
                      <CustomLabel
                        children={product?.category}
                        variant="text"
                        addedClass="font-semibold text-gray-400"
                      />

                      <CustomLabel
                        children={product?.price}
                        variant="text"
                        addedClass="text-[#0038FF] text-2xl font-semibold"
                      />
                    </div>
                  </div>
                </div>
              </CustomCard>
            ))}
          </div>
        </div>

        {/* New Products */}
        <div className="grid grid-cols-1 mt-16 ">
          <div className="flex flex-row items-start justify-between">
            <CustomLabel
              children="Latest Products"
              variant="title"
              titleLevel={4}
            />

            <CustomButton
              children="View All"
              buttonType="link"
              addedClass="text-base"
            />
          </div>

          <div className="mt-10 grid grid-flow-col-dense grid-cols-5 space-x-10">
            {products.map((product, idx) => (
              <CustomCard key={idx} addedClass="relative overflow-hidden">
                <div className="bg-green-700 absolute  -left-[70px] -top-[10px] -rotate-45 p-3 w-[200px] z-50 text-center">
                  <div className="break-normal text-center flex flex-col items-center justify-center">
                    <WiStars color="white" size={30} />
                    <CustomLabel
                      children="New Release"
                      variant="text"
                      addedClass="text-sm text-white font-semibold"
                    />
                  </div>
                </div>
                <div className="w-full flex-grow flex flex-col justify-start items-start">
                  <div className="flex-grow w-full flex justify-center items-center py-5">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={130}
                      height={130}
                    />
                  </div>

                  <div className="w-full px-5 pb-2">
                    <CustomLabel
                      children={product?.name}
                      variant="title"
                      titleLevel={5}
                    />
                    <div className="flex flex-col">
                      <CustomLabel
                        children={product?.category}
                        variant="text"
                        addedClass="font-semibold text-gray-400"
                      />

                      <CustomLabel
                        children={product?.price}
                        variant="text"
                        addedClass="text-2xl font-semibold"
                      />
                    </div>
                  </div>
                </div>
              </CustomCard>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
