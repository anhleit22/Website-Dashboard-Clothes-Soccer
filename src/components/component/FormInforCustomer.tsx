'use client';
import React, { useState } from 'react';
import * as Yup from 'yup';

import FormProvider from '@/components/hook-form/FormProvider';
import { RHFMutiSelect, RHFTextField } from '@/components/hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PrimaryButton, PrimaryOutlineButton } from '@/components/Button';
import { FaCartArrowDown } from 'react-icons/fa';
import RHFArea from '@/components/hook-form/RHFArea';
import 'swiper/css';
import 'swiper/css/parallax';
import { useDispatch } from 'react-redux';
import { addCart } from '@/lib/features/ShoppingCart/ShoppingCartSlice';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { ProductItem } from '@/components/product/Product';
import { addNotication } from '@/lib/features/Notification/NotificationSlice';

const FormInforCustomer = ({
  data,
  btnCart,
  productArr,
}: {
  data: ProductItem;
  btnCart: boolean;
  productArr?: ProductItem[];
}) => {
  const dispath = useDispatch();
  const LoginSchema = Yup.object().shape({
    note: Yup.string().required(
      'Nên điền ghi chú để nhận đồ hợp ý nhé!, Ghi tên người nhận hàng zô đây!'
    ),
    transport: Yup.string().required('Địa chỉ là bắt buộc'),
    size: Yup.string().required('Chưa chon size'),
    phoneNumber: Yup.string()
      .nullable()
      .matches(/^[0-9]+$/, 'Chỉ được có số!')
      .min(10, 'SĐT ít nhất 10 số nhé!')
      .max(15, 'Không thể vượt quá 15 số')
      .required('Nhập sđt để nhận hàng nhé :)'),
  });

  const defaultValues = {
    note: '',
    transport: '',
    size: '29',
    phoneNumber: '',
  };

  type FormValuesProps = {
    size: string;
    transport: string;
    note: string;
    phoneNumber: string;
  };
  const methods = useForm<FormValuesProps>({
    mode: 'onSubmit',
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const { reset, handleSubmit } = methods;
  const updateFormData = (data: FormValuesProps, UDK: string) => {
    const day = new Date();
    return {
      ...data,
      UDK: UDK,
      productArr: productArr || [],
      timestamp: day,
      state: false,
    };
  };

  const onSubmit = async (dataForm: FormValuesProps) => {
    let Data = updateFormData(dataForm, data?.UDK);
    reset(defaultValues);
    try {
      const docRef = await addDoc(collection(db, 'Order'), {
        Data,
      });
      dispath(addNotication(true));
      test();
      localStorage.removeItem('listItem');
      console.log(docRef.id);
    } catch (error) {
      console.log('Lỗi');
      test();
    }
  };
  const dispatch = useDispatch();
  function test() {
    setTimeout(() => {
      dispath(addNotication(false));
    }, 3000);
  }
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <table className='mb-[20px] w-full'>
        <tbody className='mt-[10px]'>
          <tr className='h-[7vh]'>
            <td className='mr-4 w-[10vh]'>Vận Chuyển</td>
            <td className='my-[10px] ml-2 '>
              <RHFTextField
                className='w-full'
                name='transport'
                placeholder='Địa chỉ nhận hàng'
              ></RHFTextField>
            </td>
          </tr>
          <tr className='h-[7vh]'>
            <td className='mr-4 w-[10vh]'>Số điện thoại</td>
            <td className=' my-[10px] ml-2'>
              <RHFTextField
                className='w-full'
                name='phoneNumber'
                placeholder='Địa chỉ nhận hàng'
              ></RHFTextField>
            </td>
          </tr>
          <tr className='h-[7vh]'>
            <td className=' mr-4 w-[10vh]'>Size</td>
            <td className=' my-[10px] ml-2'>
              <RHFMutiSelect
                className='w-full'
                name='size'
                options={['29', '30', '40']}
                placeholder='kk'
                type='select'
              ></RHFMutiSelect>
            </td>
          </tr>
          <tr className='h-[7vh]'>
            <td className='w-[10vh]'>
              <div>Ghi Chú</div>
            </td>
            <td className='my-[10px] ml-2'>
              <RHFArea className='w-full' name='note'></RHFArea>
            </td>
          </tr>
        </tbody>
      </table>
      <div className='m-[20px] flex justify-center'>
        {btnCart && (
          <div className='mr-[20px]'>
            <PrimaryOutlineButton
              onClick={() => {
                dispatch(addCart({ data }));
              }}
              rightIcon={<FaCartArrowDown className='text-primary mr-[10px]' />}
              text='Thêm vào giỏ hàng'
            />
          </div>
        )}
        <PrimaryButton type='submit' text='Mua ngay' />
      </div>
    </FormProvider>
  );
};

export default FormInforCustomer;
