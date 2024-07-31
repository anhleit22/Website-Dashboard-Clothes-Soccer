import { Card } from '@mantine/core';
import React from 'react';
import { IconType } from 'react-icons';

const LabelBuyProduct = ({
  title,
  icon: Icon,
}: {
  title: string;
  icon: IconType;
}) => {
  return (
    <Card>
      <div className=' flex items-center justify-center font-bold text-rose-900'>
        <span className='mr-[10px] uppercase'>{title}</span>
        <Icon />
      </div>
    </Card>
  );
};

export default LabelBuyProduct;
