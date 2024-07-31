import React, { useState } from 'react';
import { useSwiper } from 'swiper/react';
import { MdNavigateNext } from 'react-icons/md';
import { GrFormPrevious } from 'react-icons/gr';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
import 'swiper/css/parallax';
import ZoomPicture from '@/components/ZoomPictureHover';

const SliderShowItem = ({
  item,
}: {
  item?: {
    page: {
      title: string;
      src: string;
    }[];
  };
}) => {
  return (
    <div>
      <ul className='grid grid-cols-3 gap-2'>
        {item?.page.map((item) => (
          <a className='col-span-1' href='/' key={item.src}>
            <li
              style={{
                backgroundImage: item.src ? `url(${item.src})` : '',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
              className={`${
                item.src
                  ? 'hover:border-primary group relative h-[30vh] border-2 border-transparent'
                  : 'hover:border-primary relative h-[150px] hover:border-2'
              }`}
            >
              <div className='mb-[5px]'>
                <span className=' group-hover:border-primary group-hover:text-primary absolute bottom-4 left-2 z-50 mt-[20px] text-[18px] font-bold uppercase text-white group-hover:border-b-2'>
                  {item.title}
                </span>
              </div>
            </li>
          </a>
        ))}
      </ul>
    </div>
  );
};

const SlideProductCart = ({ data }: { data?: string[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  return (
    <div className='hover:cursor-pointer'>
      <Swiper
        loop={true}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        pagination={{
          clickable: true,
        }}
      >
        {data?.map((item: string) => (
          <SwiperSlide key={item}>
            <ZoomPicture height={500} zoomScale={3} src={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={8}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mt-2 h-[100px]'
      >
        {data?.map((item: string) => (
          <SwiperSlide key={item}>
            <img src={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
const BtnPrevNextSlide = ({
  className,
  size = 30,
}: {
  className?: string;
  size?: number;
}) => {
  const swiper = useSwiper();
  return (
    <div className='flex w-full items-center justify-between'>
      <div
        className={`${
          className ||
          'flex w-fit items-center justify-center border hover:bg-slate-400'
        }`}
      >
        <button className='p-[5px]' onClick={() => swiper.slidePrev()}>
          <GrFormPrevious size={size} />
        </button>
      </div>
      <div
        className={`${
          className ||
          'flex w-fit items-center justify-center border hover:bg-slate-400'
        }`}
      >
        <button
          className='p-[5px]'
          onClick={() => {
            console.log('click');
            swiper.slideNext();
          }}
        >
          <MdNavigateNext size={size} />
        </button>
      </div>
    </div>
  );
};
const SlideShowAnimation = ({
  title,
  url,
  link,
  btn,
}: {
  title: string;
  url: string;
  link: string;
  btn: string;
}) => {
  return (
    <div className='my-2'>
      <div
        className='swiper h-[500px] bg-cover object-contain text-center'
        style={{
          backgroundImage: `url("${url}")`,
          backgroundRepeat: `no-repeat`,
          backgroundPosition: `center`,
        }}
      >
        <div
          className='parallax-bg'
          data-swiper-parallax-duration='3000'
          data-swiper-parallax='-50%'
        ></div>
        <div className='swiper-wrapper'>
          <div className='swiper-slide'>
            <div className=' flex h-[700px] flex-col items-center justify-center text-[white]'>
              <div
                data-swiper-parallax='-200'
                data-swiper-parallax-duration='3000'
              >
                <h1 className='text-primary text-[27px] font-bold uppercase  tracking-widest'>
                  Gạo Sport
                </h1>
              </div>
              <div
                data-swiper-parallax='-100'
                data-swiper-parallax-duration='1000'
              >
                <p className='text-primary text-[50px] font-semibold'>
                  {title}
                </p>
              </div>
              <div
                data-swiper-parallax-duration='1000'
                data-swiper-parallax-scale='0.6'
              >
                <a href={link}>
                  <button className='mt-[20px] rounded-full bg-slate-500 px-6 py-2 font-semibold hover:bg-red-400'>
                    {btn}
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export {
  SliderShowItem,
  BtnPrevNextSlide,
  SlideProductCart,
  SlideShowAnimation,
};
