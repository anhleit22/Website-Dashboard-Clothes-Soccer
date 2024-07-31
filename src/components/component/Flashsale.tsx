import Countdown from '@/components/Countdown';
import HeaderTag from '@/components/HeaderTag';
import { BtnPrevNextSlide } from '@/components/Slider/SliderShowItem';
import { ProductItem, ProductionItem } from '@/components/product/Product';
import { db } from '@/firebaseConfig';
import { Container, Grid } from '@mantine/core';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

export type DataInFirebase = {
  id: string;
  value: ProductItem;
}[];

const Flashsale = () => {
  const [dataFlashSale, setDataFlashSale] = useState<DataInFirebase>([]);
  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(db, 'Product'),
        where('value.category', '==', 'Flashsale')
      );
      const querySnapshot = await getDocs(q);
      let searchResult: any[] = [];
      querySnapshot.forEach((doc) => {
        searchResult.push({ id: doc.id, ...doc.data() });
      });
      setDataFlashSale(searchResult);
    };
    fetchData();
  }, []);
  console.log(dataFlashSale);

  return (
    <Container className='container my-[20px] px-[0px]'>
      <div className='h-[361px] overflow-hidden'>
        <div className='relative'>
          <HeaderTag>Giảm giá</HeaderTag>
          <div className='absolute left-[90px] top-[5px]'>
            <Countdown initialTime={6000} />
          </div>
        </div>
        <div className='group relative z-0 h-full '>
          <Swiper loopAdditionalSlides={0}>
            <SwiperSlide>
              <Grid gutter={'xs'}>
                {dataFlashSale?.map((item) => (
                  <Grid.Col key={item.id} span={2}>
                    <ProductionItem data={item.value} type='flashSale' />
                  </Grid.Col>
                ))}
              </Grid>
            </SwiperSlide>
            {/* <div className='hidden group-hover:block'>
              <BtnPrevNextSlide />
            </div> */}
          </Swiper>
        </div>
      </div>
    </Container>
  );
};

export default Flashsale;
