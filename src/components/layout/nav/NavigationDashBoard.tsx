'use client';
import { navigationDashboard } from '@/components/mock-data';
import { Text } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

const NavigationDashBoard = () => {
  return (
    <div className='!h-full py-4'>
      <Text
        fw={900}
        variant='gradient'
        gradient={{ from: 'rgba(255, 0, 0, 1)', to: 'gray', deg: 90 }}
        className='mx-3 text-[26px]'
      >
        NavigationDashboard
      </Text>
      <ul className='mt-[20px] font-medium'>
        {navigationDashboard.map((item) => (
          <Link href={item.to}>
            <li
              key={item.title}
              className='flex items-center from-red-700 to-slate-600 p-4 hover:bg-gradient-to-r hover:text-[white]'
            >
              <span className='text-[24px]'>{item.title}</span>
              <item.icon className=' ml-[10px] text-[26px]' />
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default NavigationDashBoard;
