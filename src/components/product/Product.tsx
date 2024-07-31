import React, { useState } from 'react';
import { Card, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { productionDetail } from '@/components/mock-data';
import { PrimaryButton } from '@/components/Button';
import { BsCart2 } from 'react-icons/bs';
import { CiSettings } from 'react-icons/ci';
import { IoMdClose } from 'react-icons/io';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import {
  addCart,
  deleteCart,
  minusCart,
} from '@/lib/features/ShoppingCart/ShoppingCartSlice';
import { useDispatch } from 'react-redux';
import { IoCloseOutline } from 'react-icons/io5';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { TbShoppingCartPlus } from 'react-icons/tb';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { PATH_PUBLIC } from '@/routes/path';

const PorductFiller = () => {
  return (
    <div className='flex w-[123px] flex-col items-center justify-center p-[10px]'>
      <div className=''>
        <img
          className=' h-[80px] w-[80px] rounded-full object-contain'
          src='https://cdn.boo.vn/media/catalog/product/1/_/1.0.02.3.22.002.223.23-11000032-bst-1_5.jpg'
        ></img>
      </div>
      <p className='mt-[10px] h-[40px] text-[13px]'>Thời Trang Nam</p>
    </div>
  );
};
export interface ProductItem {
  nameitem: string;
  UDK: string;
  id: string;
  price: number;
  quanlity: number;
  material: string;
  avatar: string;
  album: string[];
  quanlityCart: number;
  slug: string;
}
const ProductionItem = ({
  data,
  type,
  btnBuy = false,
  btnSettingProduction = false,
}: {
  data?: ProductItem;
  btnBuy?: boolean;
  btnSettingProduction?: boolean;
  type: 'flashSale' | 'product' | 'cart';
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const formattedNumber = data?.price.toLocaleString('vi-VN');
  let buttonContent;
  switch (type) {
    case 'flashSale':
      buttonContent = (
        <div className='mt-[15px] border hover:drop-shadow-md'>
          <Container className=' w-[186px] px-[0] '>
            <div className=' relative transition '>
              <div className='p-[1px]'>
                <div className='relative'>
                  <span className='absolute right-0 top-0 bg-[yellow] px-[10px] text-[12px]'>
                    -50%
                  </span>
                  <img className='h-full w-[186px]' src={data?.avatar}></img>
                </div>
                <img
                  className='absolute top-0 h-[186px] w-full'
                  src='https://down-vn.img.susercontent.com/file/vn-50009109-25370a2a70652ec8b73f1d22907e58da'
                ></img>
              </div>
              <div className='flex justify-center'>
                <div className='mr-[10px] text-[14px] text-slate-300 line-through'>
                  {formattedNumber}
                </div>
                <div className='text-primary'>90,000đ</div>
              </div>
              <div className='p-[10px]'>
                <PrimaryButton
                  className='w-full'
                  text=''
                  onClick={() => {
                    dispatch(addCart({ data }));
                  }}
                  endIcon={<TbShoppingCartPlus className='text-[white]' />}
                />
              </div>
            </div>
          </Container>
        </div>
      );
      break;
    case 'product':
      buttonContent = (
        <Card
          className='hover:animate-moveUp animate-moveReverse hover:border-primary group p-1 hover:cursor-pointer'
          shadow='sm'
          radius='md'
          withBorder
        >
          <div className='group-hover:block '>
            {btnSettingProduction && (
              <div className='absolute right-1 z-50 hidden p-2 group-hover:block'>
                {/* <PrimaryButton
                    onClick={() => {
                      open;
                      console.log(data);
                    }}
                    className='px-[15px]'
                    text=''
                    startIcon={
                      <CiSettings className=' text-[16px] font-medium text-[white]' />
                    }
                  /> */}
                <PrimaryButton
                  className='px-[15px]'
                  text=''
                  onClick={async () => {
                    const id = data?.id;
                    if (id) {
                      await deleteDoc(doc(db, 'Product', id));
                    }
                  }}
                  startIcon={
                    <IoMdClose className='text-[16px] font-medium text-[white]' />
                  }
                />
              </div>
            )}
            <div
              onClick={() => {
                router.push(`/product/${data?.slug}`);
              }}
              className='p-[1px]'
            >
              <div className='h-[230px] overflow-hidden'>
                <img
                  className='hover:animate-scalsePhoto animate-scalseReverse  object-contain'
                  src={data?.avatar}
                ></img>
              </div>
              <div className='my-3 h-[20px] px-[5px]'>
                <p className='m-auto truncate text-[black]'>{data?.nameitem}</p>
              </div>
              <div className='flex justify-between px-[5px]'>
                <div className='text-primary mt-[5px] font-semibold '>
                  {formattedNumber}đ
                </div>
                <div className='mt-[5px] font-semibold '>
                  Còn lại:
                  <span className='ml-2 text-[green]'>{data?.quanlity} SP</span>
                </div>
              </div>
            </div>

            {btnBuy && (
              <Link href={PATH_PUBLIC.cart}>
                <div className='p-[10px]'>
                  <PrimaryButton
                    onClick={() => {
                      dispatch(addCart({ data }));
                    }}
                    className='w-full'
                    text='Mua Ngay'
                  />
                </div>
              </Link>
            )}
          </div>
        </Card>
      );
      break;
    case 'cart':
      buttonContent = (
        <div className='flex w-full'>
          <img className='h-[25%] w-1/4 p-[10px]' src={data?.avatar}></img>
          <div className='flex h-fit w-3/4 items-center justify-between px-[10px] py-[5px]'>
            <span className='pr-[2px]'>{data?.nameitem}</span>
            <span className='pr-[2px]'>{formattedNumber}</span>
            <div className='my-[10px] flex w-fit'>
              <button
                className='border px-[2vh] py-[1vh]'
                onClick={(event) => {
                  event.preventDefault();
                  if (data?.quanlityCart) {
                    if (data?.quanlityCart > 1) {
                      dispatch(minusCart({ data }));
                    }
                  }
                }}
              >
                <FaMinus />
              </button>
              <span className='border-y px-[5vh] py-[2vh]'>
                {data?.quanlityCart}
              </span>
              <button
                className='border px-[2vh] py-[1vh]'
                onClick={(event) => {
                  event.preventDefault();
                  dispatch(addCart({ data }));
                }}
              >
                <FaPlus />
              </button>
            </div>
            <div className='hover:bg-primary hover:text-[white]'>
              <IoCloseOutline
                onClick={() => {
                  dispatch(deleteCart({ data }));
                }}
                size={25}
              />
            </div>
          </div>
        </div>
      );
      break;
    default:
      buttonContent = null;
  }
  return <div>{buttonContent}</div>;
};

type ProductionDetails = {
  list: string;
  title: string;
};
const ProductionDetail = () => {
  return (
    <div className='p-[15px]'>
      <div className='mb-[10px]'>
        <div className='mb-[20px] text-[20px] font-medium uppercase'>
          Chi tiết sản phẩm
        </div>
        <table className=' w-full p-5'>
          <tbody className='m-[10px] mt-0'>
            {productionDetail.map((item: ProductionDetails) => (
              <tr key={item.list} className='mb-[18px] h-[35px] text-[14px]'>
                <td className='w-[120px] text-gray-400'>{item.list}</td>
                <td className=''>{item.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mb-[10px]'>
        <div className='mb-[20px] text-[20px] font-medium uppercase'>
          Hướng dẫn chọn SIZE áo quần ở GẠO SPORT
        </div>
        <div className='mb-[10px] flex justify-around'>
          <div>
            <span className='text-primary mb-[10px] font-semibold uppercase'>
              Người lớn
            </span>
            <img
              className='h-[60vh] w-[50vh]'
              src='../images/size/nguoilon.jpg'
            />
          </div>
          <div>
            <span className='text-primary mb-[10px] font-semibold uppercase'>
              Em bé
            </span>
            <img className='h-[60vh] w-[50vh]' src='../images/size/embe.jpg' />
          </div>
        </div>
      </div>
      <div className='mb-[10px]'>
        <div className='mb-[20px] text-[20px] font-medium uppercase'>
          Mô tả sản phẩm
        </div>
        <div className='text-[16px]'>
          <p>
            Hãy chào đón bộ sưu tập mới nhất từ Gạo Sport - một thương hiệu nổi
            tiếng với sự kết hợp giữa chất lượng và phong cách. Bộ sưu tập quần
            áo thể thao này không chỉ mang lại sự thoải mái và tiện ích mà còn
            là biểu tượng của phong cách thể thao đẳng cấp.
          </p>
          <p className='my-[10px]'>
            Ưu điểm nổi bật của bộ sưu tập này bao gồm:
          </p>
          <ul className='mx-4 list-decimal'>
            <li>
              <strong>Chất liệu chất lượng:</strong> Gạo Sport sử dụng các loại
              vải cao cấp, thoáng khí và co giãn tốt, giúp người mặc cảm thấy
              thoải mái và tự tin trong mọi hoạt động thể thao.
            </li>
            <li>
              <strong>Thiết kế độc đáo:</strong> Bộ sưu tập này được thiết kế
              với sự chú ý đến chi tiết, từ cắt may tinh tế đến các đường nét
              thẩm mỹ, tạo nên sự sang trọng và hiện đại cho người mặc.
            </li>
            <li>
              <strong>Đa dạng kiểu dáng và màu sắc:</strong> Với nhiều kiểu dáng
              và màu sắc phong phú, từ phong cách cổ điển đến các xu hướng mới
              nhất, bộ sưu tập này đáp ứng nhu cầu của mọi người, từ người tập
              thể dục đến các vận động viên chuyên nghiệp.
            </li>
            <li>
              <strong>Giá thành hợp lý:</strong> Mặc dù có chất lượng và thiết
              kế đẳng cấp, sản phẩm của Gạo Sport vẫn được bán với mức giá phải
              chăng, phù hợp với đa số người tiêu dùng.
            </li>
          </ul>
          <p className='my-[10px]'>
            Với bộ sưu tập quần áo thể thao từ Gạo Sport, bạn không chỉ có được
            sự thoải mái và phong cách mà còn là sự tự tin và niềm vui khi thể
            hiện bản thân trên sân tập và sân đấu. Hãy khám phá ngay hôm nay và
            trải nghiệm sự khác biệt mà Gạo Sport mang lại!
          </p>
          <p className='my-[10px]'>
            Mọi thắc mắc xin liên hệ Gạo Sport - Mua hàng nhanh:
            <Link
              className='text-primary ml-1 font-semibold hover:underline'
              href={'/'}
            >
              Nhắn tin Gạo nhé.
            </Link>
          </p>
          <p className='my-[10px]'>
            Anh em có nhu cầu trang trí thêm mặt lưng áo xin vui lòng liên hệ
            Facebook hoặc Zalo Gạo Sport
            <Link
              className='text-primary mx-1 font-semibold hover:underline'
              href={'/'}
            >
              Nhắn tin Facebook Gạo nhé
            </Link>
            &
            <Link
              className='text-primary ml-1 font-semibold hover:underline'
              href={'/'}
            >
              Zalo Gạo.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export { PorductFiller, ProductionItem, ProductionDetail };
