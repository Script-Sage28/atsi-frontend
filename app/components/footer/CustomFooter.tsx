'use client';
import React from 'react';
import Link from 'next/link';
import { BiLogoGmail } from 'react-icons/bi';
import { BsWhatsapp } from 'react-icons/bs';
import { FaMapMarkerAlt, FaFacebookSquare, FaInstagram } from 'react-icons/fa';
import { CustomLabel } from '@/components';

export default function CustomFooter() {
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

  const socialAccounts = [
    {
      id: 0,
      name: '1157 Concepcion Aguila St. Quiapo Manila ',
      icon: <FaMapMarkerAlt size={20} color="brown" />,
    },
    {
      id: 1,
      name: 'auxytechph@gmail.com',
      icon: <BiLogoGmail size={20} color="red" />,
    },
    {
      id: 2,
      name: '+63 917 963 9906',
      icon: <BsWhatsapp size={20} color="green" />,
    },
  ];
  return (
    <div className="bg-[#ECECEC] relative p-24">
      <div className="absolute p-1 bg-[#FFDD55] top-0 right-0 left-0 w-full"></div>
      <div className="w-full flex items-start">
        {/* Navigate */}
        <div className="flex-shrink w-1/4 flex-col flex space-y-5">
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

        <div className="flex-1 flex-col flex space-y-5">
          <CustomLabel
            children="About Us"
            variant="text"
            addedClass="text-[#0038FF] font-semibold text-3xl"
          />
          <div className="w-3/4">
            <CustomLabel
              children="We are a team of passionate people whose goal is to provide relevant ICT products. We are passionate to have a win-win cooperation with partners and end-user in solving their project requirements by providing products and sharing technical know-how."
              variant="text"
              addedClass="text-base"
            />

            <div className="mt-5">
              <CustomLabel
                children="AuxyTech  Technology Solutions INC - We are Part of Your Solution."
                variant="text"
                addedClass="text-base"
              />
            </div>
          </div>
        </div>

        <div className="grow-0 flex-col flex space-y-5">
          <CustomLabel
            children="Connect With Us"
            variant="text"
            addedClass="text-[#0038FF] font-semibold text-3xl"
          />

          {socialAccounts.map((account, idx) => (
            <div key={idx} className="flex items-center space-x-3">
              {account.icon}
              <CustomLabel
                children={account.name}
                variant="text"
                addedClass="text-base"
              />
            </div>
          ))}

          <div className="flex item-center justify-between">
            <CustomLabel
              children="Like and Follow Us on: "
              variant="text"
              addedClass="text-base font-semibold"
            />

            <div className="flex items-center gap-2">
              <FaFacebookSquare
                size={20}
                title="Facebook"
                className="hover:text-blue-600 cursor-pointer"
              />
              <FaInstagram
                size={20}
                title="Instagram"
                className="hover:text-pink-600 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
