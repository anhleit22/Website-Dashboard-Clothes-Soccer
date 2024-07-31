import { PrimaryButton } from '@/components/Button';
import TextHeader from '@/components/TextHeader';
import React from 'react';

const CurrentOrder = () => {
  return (
    <div>
      <TextHeader>Current Order</TextHeader>
      <div className='mt-[10px] flex items-center'>
        <div className='flex border p-1'>
          <img
            className='mr-2 h-[50px] w-[50px] object-contain'
            src='https://icdn.24h.com.vn/upload/3-2022/images/2022-09-24/manchester_header-500-1663965181-869-width500height485.jpg'
          ></img>
          <div className='flex flex-col'>
            <div className='flex font-medium'>
              <div className=' truncate text-[16px] font-medium'>
                Áo bóng đá Mu 2009
              </div>
              <div className='ml-4 text-[12px]'>
                Thời Gian Đặt Hàng: 10.00PM 12/3/2024
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-[15px]'>
        <PrimaryButton text='Xem tất cả' className='px-2 text-[12px]' />
      </div>
    </div>
  );
};

export default CurrentOrder;
