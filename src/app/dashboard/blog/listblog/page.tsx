'use client';
import ListBlog from '@/components/ListBlog';
import { Card } from '@mantine/core';
import React from 'react';

const page = () => {
  return (
    <Card className='m-4 p-6'>
      <ListBlog modified />
    </Card>
  );
};

export default page;
