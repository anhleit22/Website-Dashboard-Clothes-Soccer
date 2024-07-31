import * as React from 'react';
import { Container } from '@mantine/core';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import HeaderTag from '@/components/HeaderTag';
import { SliderShowItem } from '@/components/Slider/SliderShowItem';

export const SliderProviderProduct = ({
  tittle,
  data,
  children,
  dataType = 'SliderShowItem' || 'ProductionItem',
}: {
  dataType: string;
  children?: React.ReactElement;
  tittle: string;
  data: {
    page: number[];
  }[];
}) => {
  let buttonContent: any;

  return (
    <Container className='mx container relative my-[20px]  border px-[0px]'>
      <div className='h-[361px] overflow-hidden bg-[#ffffff]'>
        <div className='flex items-center'>
          <HeaderTag>{tittle}</HeaderTag>
          {children || <div>{children}</div>}
        </div>
        <div className='group h-full'>
          <Swiper spaceBetween={30} loopAdditionalSlides={0}>
            {data.map((item, index) => (
              <SwiperSlide>
                <SliderShowItem key={index} item={item} type='button' />
              </SwiperSlide>
            ))}

            {/* <div className='hidden group-hover:block'>
              <div className='absolute right-[20px] top-[42%] z-50'>
                <div className='flex justify-between'>
                 
                </div>
              </div>
              <div className='absolute left-[20px] top-[42%] z-50'>
                <div className='flex justify-between'>
                  <div>
                    <BtnPrevSlide
                      size={20}
                      className='rounded-full border bg-[white] shadow-inner transition-all hover:scale-150'
                    />
                  </div>
                </div>
              </div>
            </div> */}
          </Swiper>
        </div>
      </div>
    </Container>
  );
};
