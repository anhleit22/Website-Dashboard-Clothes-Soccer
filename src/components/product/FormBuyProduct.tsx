'use client';
import React from 'react';
import { Grid } from '@mantine/core';
import { Rating } from '@mantine/core';

import 'swiper/css';
import 'swiper/css/parallax';

import { ProductItem } from '@/components/product/Product';
import { SlideProductCart } from '@/components/Slider/SliderShowItem';
import FormInforCustomer from '@/components/component/FormInforCustomer';

const FormBuyProduct = ({ data }: { data: ProductItem }) => {
  const formattedNumber = data?.price.toLocaleString('vi-VN');
  return (
    <div className='container bg-[white] p-3'>
      <Grid>
        {/* image production */}
        <Grid.Col span={4}>
          <div className='mr-[10px]'>
            <SlideProductCart data={data?.album} />
          </div>
        </Grid.Col>
        <Grid.Col span={8}>
          <div className='mb-[20px] text-[25px] font-medium'>
            {data?.nameitem}
          </div>
          {/* Rating start and list buy */}
          <div className='flex justify-between px-[10px]'>
            <div className='flex'>
              <div className='flex border-r px-[10px]'>
                <div className='border-primary  text-primary mb-[2px] mr-[10px]  border-b'>
                  5.0
                </div>
                <Rating color='red' value={5} fractions={2} />
              </div>
              <div className='flex px-[10px]'>
                <div className='mb-[2px]  mr-[10px]'>14,6K</div>
                <div>Đã Bán</div>
              </div>
              <div className='px-[5px]'>
                Mã Sản Phẩm :
                <span className='ml-[5px] font-semibold italic '>
                  {data?.UDK}
                </span>
              </div>
            </div>
          </div>
          {/* giá */}
          <div className='mt-[10px] rounded-md bg-[#f5f5f5] p-4'>
            <div className='text-primary text-[30px]'>
              <span>{formattedNumber}đ</span>
            </div>
            <div className='flex items-center'>
              <div className='mx-2'>Tình Trạng:</div>
              <span className=' mr-[5px] p-[5px] text-[green]'>
                {data?.quanlity} sản phẩm.
              </span>
            </div>
          </div>
          {/* form bán hàng */}
          <FormInforCustomer btnCart data={data} />
          <div className='item flex items-center'>
            <p className='my-auto'>Gọi điện để được tư vấn:</p>
            <a
              className='text-primary ml-[5px] text-[16px] font-semibold'
              href='tel:0927993249'
            >
              0927993249
            </a>
          </div>
          <div className='mt-[10px] flex items-center'>
            <p className='mr-2'>Chất nhận mọi thanh toán:</p>
            <div className='flex'>
              <img
                className='ml-4 h-[30px] w-[30px]'
                src='https://bizweb.dktcdn.net/100/415/445/themes/804210/assets/payment-1.svg?1708498874444'
              ></img>
              <img
                className='ml-4 h-[30px] w-[30px]'
                src='https://bizweb.dktcdn.net/100/415/445/themes/804210/assets/payment-4.svg?1708498874444'
              ></img>
              <img
                className='ml-4 h-[30px] w-[30px]'
                src='https://bizweb.dktcdn.net/100/415/445/themes/804210/assets/payment-2.svg?1708498874444'
              ></img>
              <img
                className='ml-4 h-[30px] w-[30px]'
                src='https://bizweb.dktcdn.net/100/415/445/themes/804210/assets/payment-3.svg?1708498874444'
              ></img>
            </div>
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default FormBuyProduct;
