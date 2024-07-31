import { PrimaryButton } from '@/components/Button';
import HeaderTag from '@/components/HeaderTag';
import ListBlog from '@/components/ListBlog';
import { PATH_PUBLIC } from '@/routes/path';
import { Container } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

const DescriptionPage = () => {
  return (
    <Container className='container relative mx-auto'>
      <div className='relative mx-auto my-2 grid grid-cols-2'>
        <img
          className='relative col-span-1 h-[40vh] w-[100vh] object-contain'
          src='../images/Intro/ADSGaosport.jpg'
        />
        <div className='col-span-1'></div>
      </div>
      <HeaderTag>Hôm nay có gì ?</HeaderTag>
      <ListBlog modified={false} />
      <div className='flex w-full justify-center border-t py-[20px]'>
        <Link href={PATH_PUBLIC.blog}>
          <PrimaryButton text='Xem Thêm' />
        </Link>
      </div>
    </Container>
  );
};

export default DescriptionPage;
