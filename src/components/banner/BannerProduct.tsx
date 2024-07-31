import React from 'react';

const BannerProduct = ({
  src,
  size,
  className,
}: {
  src: string;
  size: 'small' | 'big' | 'medium';
  className?: string;
}) => {
  return (
    <div className={`${className || 'm-[5px] '} `}>
      {size && (
        <img
          className={`w-full object-contain ${
            size === 'small'
              ? 'h-[115px]'
              : size === 'big'
              ? 'h-[250px]'
              : 'h-[160px]'
          }`}
          src={src}
          alt='GiamGia'
        />
      )}
    </div>
  );
};

export default BannerProduct;
