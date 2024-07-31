'use client';
import TextHeader from '@/components/TextHeader';
import { db } from '@/firebaseConfig';
import { Card } from '@mantine/core';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Blog = () => {
  const [dataInFirebase, setDataInFirebase] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const reference = collection(db, 'listBlog');
      const querySnapshot = await getDocs(reference);
      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setDataInFirebase(data);
    };
    fetchData();
  }, []);
  return (
    <div className='container mx-auto my-[20px]'>
      <Card className='grid grid-cols-3 rounded-2xl'>
        <div className='col-span-2 pr-2'>
          <TextHeader>Hôm nay có gì ?</TextHeader>
          {dataInFirebase?.map((item: any) => (
            <article
              onClick={() => {
                router.push(`/blog/${item?.listBlog.slug}`);
              }}
              className='mb-[10px] flex  hover:cursor-pointer'
            >
              <img
                className='h-[250px] w-[250px] rounded-lg object-cover'
                src={item.listBlog.avatar}
              ></img>
              <div className='flex flex-col px-3'>
                <span className='my-[5px] w-fit pb-[5px] font-semibold uppercase hover:border-b'>
                  {item.listBlog.nameBlog}
                </span>
                <span className='my-[5px]'>08/04/2024</span>
                <div className='my-[5px] h-[50px]'>
                  <p className='line-clamp-2'>{item.listBlog.introBlog}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className='col-span-1'>
          <img
            className='h-[300px] rounded-lg object-cover'
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNVqCb1t8h_yG9Y97Rv1B9va3MucRwyfiodbNiny1INQ&s'
          ></img>
          <div className='mt-[20px]'>
            <div className='text-primary mb-[10px] border-b pb-[10px] font-medium uppercase'>
              Tin Tức Nỗi Bật
            </div>
            <div className='font-light'>
              <article className='flex'>
                <img
                  className='h-[100px] w-[100px] rounded-lg object-cover'
                  src='https://vudigital.co/wp-content/uploads/2023/10/logo-mu-3-giai-doan-hinh-thanh-bieu-tuong-cua-quy-do.webp'
                ></img>
                <div className='flex flex-col px-3'>
                  <span className='w-fit uppercase hover:border-b'>
                    Lịch bóng đá của MU
                  </span>
                  <span className='my-[5px]'>
                    08/04/2024
                    <span className='ml-[5px]'>10:59PM</span>
                  </span>
                  <span>Tác giả: Lê Hoàng Anh</span>
                </div>
              </article>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Blog;
