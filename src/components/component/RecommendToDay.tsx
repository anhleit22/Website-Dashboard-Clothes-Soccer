import React, { useEffect, useState } from 'react';
import HeaderTag from '@/components/HeaderTag';
import { ProductionItem } from '@/components/product/Product';
import { Container, Grid } from '@mantine/core';
//fireBase
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { query, limit } from 'firebase/firestore';
import { ValueData } from '@/app/page';
import { PrimaryButton } from '@/components/Button';

const RecommendToDay = () => {
  const [dataInFirebase, setDataInFirebase] = useState<ValueData[]>();
  useEffect(() => {
    const fetchData = async () => {
      const reference = query(collection(db, 'Product'), limit(18));
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
    <Container className='mx container relative my-[20px] px-[0px]'>
      <HeaderTag itemLeft>Sản phẩm HOT hôm nay</HeaderTag>
      <div className='border-primary border-4' />
      <div className='py-[20px]'>
        <Grid>
          {dataInFirebase?.map((item: any) => (
            <Grid.Col key={item.value.UDK} span={2}>
              <div>
                <ProductionItem data={item.value} btnBuy type='product' />
              </div>
            </Grid.Col>
          ))}
          <div className='flex w-full justify-center border-t pt-[20px]'>
            <PrimaryButton text='Xem Thêm' />
          </div>
        </Grid>
      </div>
    </Container>
  );
};

export default RecommendToDay;
