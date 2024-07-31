'use client';
import React, { useEffect, useState } from 'react';
import EditorBlog from '@/components/editor/EditorBlog';
import { Card } from '@mantine/core';
import ListBlog from '@/components/ListBlog';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { PATH_AUTH } from '@/routes/path';
import { useRouter } from 'next/navigation';

const DashboardBlog = () => {
  const [user, setUser] = useState<any>(null);
  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push(PATH_AUTH.login);
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  if (!user) {
    return null;
  }
  return (
    <div className=' px-4'>
      <Card className='m-4 min-h-[70vh] p-6'>
        <EditorBlog />
      </Card>
      <Card className='m-4 p-6'>
        <ListBlog modified />
      </Card>
    </div>
  );
};

export default DashboardBlog;
