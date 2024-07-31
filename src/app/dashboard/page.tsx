'use client';
import React, { useEffect } from 'react';
import { Card, Grid } from '@mantine/core';
import { RiShoppingCartLine } from 'react-icons/ri';
import { FcMoneyTransfer } from 'react-icons/fc';
import { PiMoney } from 'react-icons/pi';
import NavigationDashBoard from '@/components/layout/nav/NavigationDashBoard';
import BarChartProduction from '@/components/chart/BarChart';
import { Text } from '@mantine/core';
import { PrimaryButton } from '@/components/Button';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { PATH_AUTH } from '@/routes/path';
import { useRouter } from 'next/navigation';
import TextHeader from '@/components/TextHeader';
import CurrentOrder from '@/components/component/CurrentOrder';
import LabelBuyProduct from '@/components/component/LabelBuyProduct';
import { labelproductbuy } from '@/components/mock-data';
import ListBlog from '@/components/ListBlog';

const Page = () => {
  const auth = getAuth();
  const router = useRouter();

  // let fetchData = async () => {
  //   const docRef = doc(db, 'Order');
  //   console.log(docRef);
  //   const docSnap = await getDoc(docRef);
  //   console.log(docSnap);

  //   if (docSnap.exists()) {
  //     console.log('Document data:', docSnap.data());
  //   } else {
  //     console.log('No such document!');
  //   }
  // };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Cho đăng nhập');
      } else {
        console.log('không cho đăng nhập');
        router.push(PATH_AUTH.login);
      }
    });
    // fetchData();
  }, []);

  return (
    <div className='flex !h-[100vh] w-full p-5'>
      <div className='mr-3 !h-full w-1/5 rounded-t-2xl bg-[white]'>
        <NavigationDashBoard />
      </div>
      <div className='w-4/5 px-2'>
        <Grid grow>
          {labelproductbuy.map((item) => (
            <Grid.Col span={4}>
              <LabelBuyProduct title={item.Title} icon={item.icon} />
            </Grid.Col>
          ))}
          <Grid.Col span={8}>
            <Card>
              <div className=''>
                <BarChartProduction />
              </div>
            </Card>
          </Grid.Col>
          <Grid.Col span={4}>
            <Card>
              <CurrentOrder />
            </Card>
          </Grid.Col>
          <Grid.Col span={4}>
            <Card className='min-h-fit'>
              <ListBlog modified />
            </Card>
          </Grid.Col>
        </Grid>
      </div>
    </div>
  );
};
export default Page;
