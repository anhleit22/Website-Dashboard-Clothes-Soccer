import React from 'react';
import { Listblog } from '@/components/ListBlog';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

const ArticleBlog = ({
  data,
  modified,
}: {
  data: Listblog;
  modified: boolean;
}) => {
  return (
    <div className='my-3'>
      <article className=' col-span-1 mb-[10px] flex'>
        <div className='group relative w-1/2'>
          <img className='rounded-lg object-cover' src={data.avatar} />
          {modified && (
            <div className='absolute right-1 top-1'>
              <IoIosCloseCircleOutline
                onClick={async () => {
                  const id = data?.id;
                  if (id) {
                    await deleteDoc(doc(db, 'listBlog', id));
                  }
                }}
                className='text-primary hidden text-[24px] group-hover:block group-hover:cursor-pointer'
              />
            </div>
          )}
        </div>
        <div className='w-1/2 px-2'>
          <div className='my-[5px] pb-[5px] font-semibold uppercase hover:border-b'>
            {data.nameBlog}
          </div>
          <div className='my-[5px] text-[14px]'>
            {data?.date.toDate().getDate() +
              '/' +
              (data?.date.toDate().getMonth() + 1) +
              '/' +
              data?.date.toDate().getFullYear()}{' '}
            -
            <span className='ml-1'>
              {data?.date.toDate().getHours() +
                ':' +
                data?.date.toDate().getMinutes()}
            </span>
          </div>
          <div className='my-[5px] line-clamp-2 h-[50px]'>{data.introBlog}</div>
        </div>
      </article>
    </div>
  );
};

export default ArticleBlog;
