import React, { useEffect, useState } from 'react';

import { Container } from '@mantine/core';
//swipper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/parallax';
import { Autoplay, Pagination, Parallax } from 'swiper/modules';
//components
import {
  BtnPrevNextSlide,
  SlideShowAnimation,
} from '@/components/Slider/SliderShowItem';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

const SlideShowTextAndPicture = () => {
  const [dataInFirebase, setDataInFirebase] = useState<
    {
      title: string;
      url: string;
      link: string;
      btn: string;
    }[]
  >();
  useEffect(() => {
    const fetchData = async () => {
      const reference = collection(db, 'slideShow');
      const querySnapshot = await getDocs(reference);
      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setDataInFirebase(data);
    };
    fetchData();
  }, []);
  console.log(dataInFirebase);

  return (
    <div className='border-b-2 drop-shadow-sm'>
      <Container className='container flex flex-col px-0'>
        <div className='flex w-full '>
          <div className='group relative w-full'>
            <Swiper
              className='mySwiper w-full'
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loopAdditionalSlides={0}
              loop={true}
              parallax={true}
              modules={[Autoplay, Pagination, Parallax]}
            >
              {dataInFirebase?.map((item) => (
                <SwiperSlide>
                  <SlideShowAnimation
                    key={item.title}
                    title={item.title}
                    url={item.url}
                    link={item.link}
                    btn={item.btn}
                  />
                </SwiperSlide>
              ))}
              <div className='absolute top-[42%] z-50 hidden w-full group-hover:block'>
                <div className='flex justify-between'>
                  <BtnPrevNextSlide />
                </div>
              </div>
            </Swiper>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SlideShowTextAndPicture;
