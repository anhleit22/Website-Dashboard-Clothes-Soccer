'use client';
import { Card, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import {
  booleanFilterFn,
  DataGrid,
  dateFilterFn,
  highlightFilterValue,
  numberFilterFn,
  stringFilterFn,
} from 'mantine-data-grid';
import NavigationDashBoard from '@/components/layout/nav/NavigationDashBoard';
import ProductOrder, { orderProducts } from '@/components/product/ProductOrder';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import TextHeader from '@/components/TextHeader';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { PATH_AUTH } from '@/routes/path';

const page = () => {
  const [dataInFirebase, setDataInFirebase] = useState<orderProducts>();
  const auth = getAuth();
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const reference = query(
        collection(db, 'Order'),
        where('Data.state', '>=', false)
        // where('Data.productArr', 'array-contains', true)
      );
      const querySnapshot = await getDocs(reference);
      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        let dataMod = {
          ...doc.data().Data,
          id: doc.id,
        };
        data.push(dataMod);
      });
      setDataInFirebase(data);
    };
    fetchData();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Cho đăng nhập');
      } else {
        console.log('không cho đăng nhập');
        router.push(PATH_AUTH.login);
      }
    });
  }, []);

  const arr = dataInFirebase?.map((item) => {
    return {
      id: item.UDK,
      text: item.phoneNumber,
      'Địa Chỉ': item.transport,
      'Số Loại Hàng': item.productArr.length || 1,
      'Ngày Giờ': item.timestamp.toDate(),
      Bán: item.state,
    };
  });
  console.log(arr);

  return (
    <Card className='flex flex-row'>
      <div className=' !h-full w-1/5'>
        <NavigationDashBoard />
      </div>
      <div className='block w-4/5'>
        <TextHeader>All Order</TextHeader>
        <DataGrid
          data={arr || []}
          striped
          highlightOnHover
          withGlobalFilter
          withPagination
          withColumnFilters
          withSorting
          withColumnResizing
          columns={[
            {
              accessorKey: 'text',
              header: 'Số điện thoại',
              filterFn: stringFilterFn,
              size: 300,
              cell: highlightFilterValue,
            },
            {
              accessorKey: 'Địa Chỉ',
              filterFn: stringFilterFn,
            },
            { accessorKey: 'Số Loại Hàng', filterFn: numberFilterFn },
            {
              accessorKey: 'Ngày Giờ',
              filterFn: dateFilterFn,
            },
            {
              accessorKey: 'Bán',
              filterFn: booleanFilterFn,
            },
          ]}
        />
        <Text
          size='xl'
          fw={900}
          variant='gradient'
          gradient={{ from: 'rgba(255, 0, 0, 1)', to: 'gray', deg: 90 }}
          className='mb-4 text-[30px]'
        >
          Order
        </Text>
        <ProductOrder />
      </div>
    </Card>
  );
};

export default page;
