'use client';
import React, { useEffect } from 'react';
import EditorBlog from '@/components/editor/EditorBlog';
import { Card } from '@mantine/core';
import ListBlog from '@/components/ListBlog';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { PATH_AUTH } from '@/routes/path';

const DashboardBlog = () => {
  const auth = getAuth();
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Cho đăng nhập');
      } else {
        console.log('không cho đăng nhập');
        router.push(PATH_AUTH.login);
      }
    });
  }, []);
  return (
    <div className='px-4'>
      <Card className='m-4 p-6'>
        <ListBlog />
      </Card>
      <Card className='m-4 p-6'>
        <EditorBlog />
      </Card>
    </div>
  );
};

export default DashboardBlog;
