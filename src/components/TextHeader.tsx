import React, { ReactNode } from 'react';
import { Text } from '@mantine/core';

const TextHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      size='xl'
      fw={900}
      variant='gradient'
      gradient={{ from: 'rgba(255, 0, 0, 1)', to: 'gray', deg: 90 }}
      className='mb-3 text-[30px]'
    >
      {children}
    </Text>
  );
};

export default TextHeader;
