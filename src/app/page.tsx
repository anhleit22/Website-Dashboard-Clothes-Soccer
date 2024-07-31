'use client';

import React from 'react';

import Category from '@/components/component/Category';
import RecommendToDay from '@/components/component/RecommendToDay';
import Flashsale from '@/components/component/Flashsale';
import DescriptionPage from '@/components/component/DescriptionPage';
import SlideShowTextAndPicture from '@/components/component/SlideShowTextAndPicture';

export type ValueData = {
  nameitem: string;
  UDK: string;
  price: number;
  quanlity: number;
  material: string;
  category: string;
  album: string[];
  avatar: string;
}[];
export default function HomePage() {
  return (
    <div className='bg-[white]'>
      {/*SlideShowTextAndPicture*/}
      <SlideShowTextAndPicture />
      {/* // Flash sale */}
      <Flashsale />
      {/* //Danh mục */}
      <Category />
      {/* Gợi ý hốm nay*/}
      <RecommendToDay />
      {/* Diễn tả trang web*/}
      <DescriptionPage />
    </div>
  );
}
