/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BiLogoGmail } from 'react-icons/bi';
import { BsWhatsapp } from 'react-icons/bs';
import { FaMapMarkerAlt, FaFacebookSquare, FaViber } from 'react-icons/fa';
import { CustomLabel } from '@/components';
import { AboutUsList, AllSocialLinks } from '@/service/request';
import useStore from '@/zustand/store/store';
import { Abouts, LinkUs, selector } from '@/zustand/store/store.provider';

export default function CustomFooter() {
  // eslint-disable-next-line no-undef
  const [fetchInterval, setFetchInterval] = useState<NodeJS.Timeout | null>(null);
   const about = useStore(selector('user'))
  const links = [
    {
      id: 0,
      name: 'Home',
      url: '/#Home',
    },
    {
      id: 1,
      name: 'About',
      url: '/#about',
    },
    {
      id: 2,
      name: 'Blog',
      url: '/#Home',
    },
    {
      id: 3,
      name: 'Contact Us',
      url: '/#Home',
    },
    {
      id: 4,
      name: 'Products',
      url: '/#Home',
    },
  ];


  async function Fetch() {
    const res = await AboutUsList.GET_ALL()
    const res1 = await AllSocialLinks.FETCH()
    Abouts(res.data.data)
    LinkUs(res1.data.data[0])
  }
  useEffect(() =>{
    void Fetch();
    const intervalId = setInterval(Fetch, 5000);
    setFetchInterval(intervalId);

    return () => {
      if (fetchInterval !== null) {
        clearInterval(fetchInterval);
      }
    };
  },[])

  return (
    <div id='about' className="bg-[#ECECEC] relative p-8 md:p-24">
      <div className="absolute p-1 bg-[#FFDD55] top-0 right-0 left-0 w-full"></div>
      <div className="w-full flex flex-col md:flex-row gap-4 items-start justify-between">
        {/* Navigate */}
        <div className="flex-shrink w-full md:w-1/4 flex-col flex space-y-5">
          <CustomLabel
            children="Navigate"
            variant="text"
            addedClass="text-[#0038FF] font-semibold text-3xl"
          />

          {links?.map((link, idx) => (
            <Link href={link.url} className="font-semibold" key={idx}>
              {link.name}
            </Link>
          ))}
        </div>

        {about.aboutsUs && <div className="flex-1 flex-col flex space-y-5">
          <CustomLabel
            children="About Us"
            variant="text"
            addedClass="text-[#0038FF] font-semibold text-3xl"
          />
          <div className="w-3/4">
            <CustomLabel
              children={about.aboutsUs.content}
              variant="text"
              addedClass="text-base line-clamp-6"
            />

            <div className="mt-5">
              <CustomLabel
                children="AuxyTech  Technology Solutions INC - We are Part of Your Solution."
                variant="text"
                addedClass="text-base"
              />
            </div>
          </div>
        </div>}

        <div className="grow-0 flex-col flex space-y-5">
          <CustomLabel
            children="Connect With Us"
            variant="text"
            addedClass="text-[#0038FF] font-semibold text-3xl"
          />
            {about.links?.address && <div className="flex items-center space-x-3">
              <FaMapMarkerAlt />
              <CustomLabel
                children={about.links?.address}
                variant="text"
                addedClass="text-base"
              />
            </div>}
            {about.links?.email && <div className="flex items-center space-x-3">
              <BiLogoGmail />
              <CustomLabel
                children={about.links?.email}
                variant="text"
                addedClass="text-base"
              />
            </div>}
          <div className="flex flex-col gap-2 item-center justify-between">
            <CustomLabel
              children="Like and Follow Us on: "
              variant="text"
              addedClass="text-base font-semibold"
            />

            <div className="flex items-center gap-4">
              {about.links?.facebook && <FaFacebookSquare
                size={20}
                title="Facebook"
                className="hover:text-blue-600 cursor-pointer"
                onClick={() => { window.open(`${about.links?.facebook}`, '_blank')}}
              />}
              {about.links?.viber && <FaViber
                size={20}
                title="Viber"
                className="hover:text-pink-600 cursor-pointer"
                onClick={() => { window.open(`${about.links?.viber}`, '_blank')}}
              />}
              {about.links?.whatsapp && <BsWhatsapp
                size={20}
                title="WhatsApp"
                className="hover:text-pink-600 cursor-pointer"
                onClick={() => { window.open(`${about.links?.whatsapp}`, '_blank')}}
              />}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
