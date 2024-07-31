'use client';
import React, { useEffect, useState } from 'react';
import HeaderPage from '@/components/layout/header/Header';
import { Container } from '@mantine/core';
import { Footter } from '@/components/layout/footter/Footter';
import { Tooltip } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { MdKeyboardArrowUp } from 'react-icons/md';

const LayoutDefault = ({ children }: { children: React.ReactNode }) => {
  const [scroll, scrollTo] = useWindowScroll();
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    handleScroll();
  }, [scroll.y]);

  const handleScroll = () => {
    if (scroll.y > 0) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  return (
    <div className='relative flex w-full flex-col bg-slate-300'>
      <div className='bg-primary sticky top-0 z-50 flex w-full justify-around'>
        <HeaderPage />
      </div>
      <div className='mt-[1px]'>{children}</div>
      <div className='z-100 fixed bottom-[5%] right-[2%]'>
        <div className='w-full'>
          {showScrollButton && (
            <div
              onClick={() => scrollTo({ y: 0 })}
              className='bg-primary group mx-auto mb-[30px] h-[30px] w-[30px] items-center justify-center hover:cursor-pointer'
            >
              <MdKeyboardArrowUp size={30} className='text-[white]' />
            </div>
          )}
        </div>
        <Tooltip
          className='z-100'
          label='Gởi tin nhắn Messenger'
          color='red'
          position='left'
          offset={5}
        >
          <div className='h-[50px] w-[50px]'>
            <a href='/'>
              <img
                className='rounded-full'
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX0dlIUJ5uXZ1Y-XI8cNrQDvtrdPaR4hDI1SMIMkhGAw&s'
              ></img>
            </a>
          </div>
        </Tooltip>
        <Tooltip
          className='z-100'
          label='Gởi tin nhắn Zalo'
          color='red'
          position='left'
          offset={5}
        >
          <div className='mt-[20px]'>
            <a href='/'>
              <img
                className='h-[50px] w-[50px] rounded-full object-cover'
                src='https://inuvdp.com/wp-content/uploads/2022/08/logo-zalo-02.jpg'
              ></img>
            </a>
          </div>
        </Tooltip>
      </div>
      <div className=' bg-slate-800 pt-[5px]'>
        <Container className='mx container mt-[50px] p-[5px]'>
          <Footter />
        </Container>
      </div>
    </div>
  );
};

export default LayoutDefault;
