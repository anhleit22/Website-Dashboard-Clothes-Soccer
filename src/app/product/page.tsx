'use client';
import React, { useEffect, useState } from 'react';
import { FilterTime, NavFilter } from '@/components/layout/nav/NavFilter';
import { Grid } from '@mantine/core';
import { ProductionItem } from '@/components/product/Product';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { useSearchParams } from 'next/navigation';
const page = () => {
  const [dataInFirebase, setDataInFirebase] = useState<any>();
  const searchParams = useSearchParams();

  const search = searchParams?.get('q');
  useEffect(() => {
    const fetchData = async () => {
      //search bằng array
      // const filterProducts = (
      //   items: any,
      //   searchValue: string | null | undefined
      // ): any =>
      //   items.filter((item: any) =>
      //     item.title.toLowerCase().includes(searchValue?.toLowerCase())
      //   );
      // datas = filterProducts(dataInFirebase, search);
      let reference;
      if (search) {
        reference = query(
          collection(db, 'Product'),
          where('value.nameitem', '>=', search)
        );
      } else reference = collection(db, 'Product');
      const querySnapshot = await getDocs(reference);
      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setDataInFirebase(data);
    };
    fetchData();
  }, [search]);

  return (
    <div className='container mx-auto'>
      <div className='grid grid-cols-4'>
        <div className=' relative col-span-1'>
          <NavFilter />
        </div>
        <div className='col-span-3 bg-[white] px-4 py-6'>
          <FilterTime />
          <Grid>
            {dataInFirebase?.map((item: any) => (
              <Grid.Col key={item.UDK} span={{ base: 12, md: 6, lg: 3 }}>
                <ProductionItem type='product' btnBuy data={item.value} />
              </Grid.Col>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default page;
