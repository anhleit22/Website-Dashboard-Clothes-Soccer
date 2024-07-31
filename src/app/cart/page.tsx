'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { Card, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ProductItem, ProductionItem } from '@/components/product/Product';
import { PrimaryButton, PrimaryOutlineButton } from '@/components/Button';

import FormInforCustomer from '@/components/component/FormInforCustomer';
import {  PATH_PUBLIC } from '@/routes/path';

const CartPage = () => {
  const product = useSelector((state: RootState) => state.product.arr);
  const number = useSelector((state: RootState) => state.product.number);
  const formattedNumber = number?.totalProduct.toLocaleString('vi-VN');
  const [dataInFirebase, setDataInFirebase] = useState<ProductItem>({
    nameitem: '',
    UDK: '',
    id: '',
    price: 0,
    quanlity: 0,
    material: '',
    avatar: '',
    album: [''],
    quanlityCart: 0,
    slug: '',
  });
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div className='container mx-auto mb-[10px]'>
      <Card
        className='container '
        shadow='sm'
        padding='lg'
        radius='md'
        withBorder
      >
        <Text
          size='xl'
          fw={900}
          variant='gradient'
          gradient={{ from: 'red', to: 'gray', deg: 90 }}
        >
          GIỎ HÀNG ({number.numberProduct} sản phẩm)
        </Text>
        <div className='mt-[20px] flex'>
          <div className='w-3/4 px-[5px]'>
            {product.map((item) => (
              <ProductionItem key={item.UDK} data={item} type='cart' />
            ))}
          </div>
          <div className='w-1/4'>
            <div className='flex justify-between border-b py-[20px] font-semibold'>
              <span>Thành Tiền: </span>
              <span className='mr-3'>{formattedNumber}đ</span>
            </div>
            <PrimaryButton
              onClick={open}
              className='mt-[10px] w-full'
              text='ĐẶT HÀNG NGAY'
            ></PrimaryButton>
            <Modal
              size={'xl'}
              opened={opened}
              onClose={close}
              title='Thông tin người dùng!'
            >
              <div className='flex'>
                <div className='w-3/5'>
                  <FormInforCustomer
                    productArr={product}
                    data={dataInFirebase}
                    btnCart={false}
                  />
                </div>
                <div className='w-2/5 px-[5px]'>
                  <ul className='list-decimal px-[25px]'>
                    {product.map((item) => (
                      <li className='mt-[2px] h-[5vh] text-[12px]'>
                        Tên: {item.nameitem} - SL: {item.quanlityCart} - MSP:{' '}
                        {item.UDK} - Giá: {item.price}
                      </li>
                    ))}
                  </ul>
                  <div className='flex justify-between border-b py-[20px] font-semibold'>
                    <span>Thành Tiền: </span>
                    <span className='mr-3'>{formattedNumber}đ</span>
                  </div>
                </div>
              </div>
            </Modal>
            <Link href={PATH_PUBLIC.product}>
              <PrimaryOutlineButton
                className='mt-[10px] w-full'
                text='TIẾP TỤC MUA HÀNG'
              ></PrimaryOutlineButton>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CartPage;
