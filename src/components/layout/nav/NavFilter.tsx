'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RHFMutiSelect } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import { Card, Text } from '@mantine/core';
import { RangeSlider } from '@mantine/core';
import { PrimaryButton } from '@/components/Button';
import { CiFilter } from 'react-icons/ci';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import Link from 'next/link';

type FormValuesProps = {
  size: string;
};
const NavFilter = () => {
  const defaultValues = {
    size: '',
  };

  const methods = useForm<FormValuesProps>({
    mode: 'onTouched',
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = (data: FormValuesProps) => {
    console.log(data);
    reset(defaultValues);
    console.log(value);
  };

  const [value, setValue] = useState<[number, number]>([0, 300000]);
  const [dataInFirebase, setDataInFirebase] = useState<any>([]);
  useEffect(() => {
    let fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'TableContent'));
      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setDataInFirebase(data);
    };
    fetchData();
  }, []);
  let dataInFirebaseList: any;

  if (dataInFirebase[0] !== undefined) {
    dataInFirebaseList = dataInFirebase[0];
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card className=' rounded-none'>
        <div className='py-3'>
          <div className='mb-4 border-4 p-2'>
            <Text size='lg' className='px-2 font-bold'>
              Danh Sách Sản Phẩm
            </Text>
          </div>
          <ul className='mb-2'>
            {dataInFirebaseList?.title?.map((item: string) => (
              <li
                key={item}
                className='flex justify-between border-b px-2 py-3'
              >
                <Link
                  href={`/product?q=${item}`}
                  className='hover:text-primary hover:underline'
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='mb-[10px] border-b py-2'>
          <div className='mb-4 border-4 p-2'>
            <Text size='lg' className='px-2 font-bold'>
              Size
            </Text>
          </div>
          <RHFMutiSelect
            name='size'
            options={dataInFirebaseList?.Zise || ['']}
            placeholder='Chọn một size thích hợp'
            type='select'
          />
        </div>
        <div className='mb-[10px] border-b py-2'>
          <div className='mb-4 border-4 p-2'>
            <Text size='lg' className='px-2 font-bold'>
              Khoảng Giá
            </Text>
          </div>
          <div>
            <RangeSlider
              color='gray'
              value={value}
              onChange={setValue}
              min={0}
              max={300000}
              step={10000}
            />
          </div>
        </div>
        <div className='mb-[10px] border-b py-2'>
          <div className='mb-4 border-4 p-2'>
            <Text size='lg' className='px-2 font-bold'>
              Kiểu Dáng
            </Text>
          </div>
          <div>
            <RHFMutiSelect
              name='Style'
              options={dataInFirebaseList?.Styles || ['']}
              placeholder='Chọn một style thích hợp'
              type='select'
            />
          </div>
        </div>
        <div className='mb-[10px] border-b py-2'>
          <div className='mb-4 w-fit p-2'>
            <PrimaryButton
              type='submit'
              text='Chọn Lọc'
              endIcon={<CiFilter className='text-[white]' />}
            />
          </div>
        </div>
      </Card>
    </FormProvider>
  );
};

type Options = {
  Options: string;
};

const FilterTime = () => {
  const defaultValues = {
    Options: '',
  };

  const methods = useForm<Options>({
    mode: 'onChange',
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = (data: Options) => {
    console.log(data);
    reset(defaultValues);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className='flex w-full justify-end'>
        <div className='w-fit'>
          <RHFMutiSelect
            name='Options'
            options={[
              'Mới Nhất',
              'Thứ tự: Giá cao đến thấp',
              'Thứ tự: Giá thấp đến cao',
            ]}
            placeholder='Mới Nhất'
            type='select'
          />
        </div>
      </div>
    </FormProvider>
  );
};

export { NavFilter, FilterTime };
