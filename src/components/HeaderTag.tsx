import { PATH_PUBLIC } from '@/routes/path';
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

const HeaderTag = ({
  children,
  itemLeft = false,
  className,
  textclassName,
}: {
  children: React.ReactNode;
  itemLeft?: boolean;
  className?: string;
  textclassName?: string;
}) => {
  return (
    <div className='mb-[10px] flex items-center'>
      <div
        className={`${
          className || ''
        } text-primary flex h-[5vh] w-full items-center justify-between border-b text-[16px] font-medium`}
      >
        <div className={`${textclassName || ''} uppercase`}>{children}</div>
        {itemLeft && (
          <a href={PATH_PUBLIC.product}>
            <span className='normal flex items-center'>
              Xem Tất Cả
              <IoIosArrowForward className='p-auto ml-[5px]' />
            </span>
          </a>
        )}
      </div>
    </div>
  );
};

export default HeaderTag;
