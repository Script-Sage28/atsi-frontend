'use client';
import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  addedClass?: string;
  onClick?:  () => void;
}

export default function CustomCard(props: Props) {
  return (
    <motion.div
      layout
      initial={{ scale: 1 }}
      whileHover={{
        scale: 1.01,
      }}
      className={clsx(
        props.addedClass,
        'rounded-2xl border relative border-gray-300 hover:drop-shadow-md bg-white flex flex-col items-center justify-between space-y-0',
      )}
      onClick={props.onClick}
    >
      {props.children}
    </motion.div>
  );
}
