'use client';
import React from 'react'

export default function ProductDetails({ params }:{
    params: { id: string };
}) {
  return (
    <div>
      <h1>Product Details</h1>
      <p>ID: {params.id}</p>
    </div>
  )
}
