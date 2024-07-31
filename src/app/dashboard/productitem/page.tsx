'use client';
import { ProductionItem } from '@/components/product/Product';
import { Card, Grid } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

import TextHeader from '@/components/TextHeader';
import AddProduct from '@/components/product/AddProduct';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { PATH_AUTH } from '@/routes/path';
export type Value = {
  nameitem: string;
  UDK: string;
  price: number;
  quanlity: number;
  material: string;
  category?: string;
  avatar: object;
  album: object[];
};
const ProducItemDashboard = () => {
  type ValueData = {
    nameitem: string;
    UDK: string;
    price: number;
    quanlity: number;
    material: string;
  }[];
  const [dataInFirebase, setDataInFirebase] = useState<ValueData>();
  const [dataList, setDataList] = useState<any>([]);
  const auth = getAuth();
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'Product'));
      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        let dataMod = {
          ...doc.data().value,
          id: doc.id,
        };
        data.push(dataMod);
      });
      setDataInFirebase(data);
      const q = await getDocs(collection(db, 'TableContent'));
      const datas: any[] = [];
      q.forEach((doc) => {
        datas.push(doc.data());
      });
      setDataList(datas);
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

  return (
    <Card className='relative'>
      <TextHeader>All Product</TextHeader>
      <Grid className='mt-[20px]'>
        {dataInFirebase?.map((item?: any) => (
          <Grid.Col key={item.UDK} span={2}>
            <ProductionItem type='product' btnSettingProduction data={item} />
          </Grid.Col>
        ))}
      </Grid>
      <AddProduct data={dataList} />
    </Card>
  );
};

export default ProducItemDashboard;
