'use client';
import React, { useEffect, useState } from 'react';
import { Card, Image, Text } from '@mantine/core';
import { CiCalendar } from 'react-icons/ci';
import ListBlog from '@/components/ListBlog';
import TextHeader from '@/components/TextHeader';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { usePathname } from 'next/navigation';
import { db } from '@/firebaseConfig';
import { useCreateBlockNote } from '@blocknote/react';
import HtmlConvert from '@/components/HtmlConvert';

type Blog = {
  avatar: string;
  html: string;
  introBlog: string;
  nameBlog: string;
  slug: string;
  date: any;
};

const page = () => {
  const [dataInFirebase, setDataInFirebase] = useState<Blog>({
    avatar: '',
    html: ' ',
    introBlog: '',
    nameBlog: '',
    slug: '',
    date: new Date(),
  });
  const pathname = usePathname();
  const slugProduct = pathname?.replace('/blog/', '');
  console.log(slugProduct);

  useEffect(() => {
    const fetchData = async () => {
      const reference = query(
        collection(db, 'listBlog'),
        where('listBlog.slug', '==', slugProduct)
      );
      const querySnapshot = await getDocs(reference);
      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setDataInFirebase(data[0].listBlog);
    };
    fetchData();
  }, []);
  const editor = useCreateBlockNote();

  return (
    <div className=''>
      <div className='container mx-auto'>
        <Card radius={'md'} className='m-4 p-10'>
          <div className='mx-auto'>
            <TextHeader>{dataInFirebase?.nameBlog}</TextHeader>
          </div>
          <span className='mb-[30px] flex h-[30px] items-center justify-center text-[14px]'>
            <span className='flex items-center border p-1'>
              <CiCalendar />
              <p>01/06/2024 - 09:00PM</p>
            </span>
            <span className='mx-1 border p-1'>Tác giả: Admin.</span>
          </span>
          <Text size='xl' lineClamp={4} className='border-b-2 pb-[20px]'>
            {dataInFirebase?.introBlog}
          </Text>
          <Text
            size='xl'
            lineClamp={4}
            className='mt-[20px] border-b-2 pb-[20px] h'
          >
            <Image
              radius='md'
              h={400}
              fit='contain'
              src={dataInFirebase?.avatar}
            />
            <HtmlConvert html={dataInFirebase.html} />
          </Text>
          <div className='my-[10px]'>
            <span>Xem Thếm:</span>
            <ul className='flex list-disc justify-between px-4'>
              <li className=''>
                <p>Những đôi giày đá bóng đắt nhất thế giới [Update 2021]</p>
              </li>
              <li className=''>
                <p>Những đôi giày đá bóng đắt nhất thế giới [Update 2021]</p>
              </li>
            </ul>
            <div className='mt-[10px] text-right'>
              <p className='text-primary italic'>
                Cần tư vấn chọn mua giày bóng đá, hãy để Gạo Sport đồng hành
                cùng các bạn!
              </p>
            </div>
          </div>
        </Card>
        <Card radius={'md'} className='m-4 p-10'>
          <ListBlog modified />
        </Card>
      </div>
    </div>
  );
};

export default page;
