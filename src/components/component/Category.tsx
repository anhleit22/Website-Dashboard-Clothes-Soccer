import HeaderTag from '@/components/HeaderTag';
import { SliderShowItem } from '@/components/Slider/SliderShowItem';
import { danhMuc } from '@/components/mock-data';
import { Container } from '@mantine/core';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

const Category = () => {
  return (
    <Container className='mx container relative my-[20px] px-[0px]'>
      <HeaderTag>Danh Mục</HeaderTag>
      <div className='relative z-0 h-full'>
        <Swiper spaceBetween={30} loopAdditionalSlides={0}>
          {danhMuc.map((item) => (
            <SwiperSlide key={item.id}>
              <SliderShowItem item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
};

export default Category;
