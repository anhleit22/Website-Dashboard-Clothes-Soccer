'use client';
import { PrimaryButton } from '@/components/Button';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import FormProvider from '@/components/hook-form/FormProvider';
import { RHFMutiSelect, RHFTextField } from '@/components/hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { db } from '@/firebaseConfig';
import RHFInputPicture from '@/components/hook-form/RHFInputPicture';
import { collection, addDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { createSlug } from '@/components/func';
import { Value } from '@/app/dashboard/productitem/page';

export const uploadAndReturnDownloadUrl = async (
  storage: any,
  folder: string,
  item: any
) => {
  const name = item?.name;
  const storageRef = ref(storage, `${folder}/${name}`);
  await uploadBytes(storageRef, item);
  const url = await getDownloadURL(ref(storage, `${folder}/${name}`));
  return url;
};

export const setDataFireBase = async (value: any) => {
  try {
    const docRef = await addDoc(collection(db, 'Product'), {
      value,
    });
    console.log(docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
const AddProduct = ({ data }: { data: any }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const defaultValues = {
    nameitem: '',
    UDK: '',
    price: 0,
    quanlity: 0,
    material: '',
    category: '',
    avatar: {},
    album: [{}],
    style: '',
  };
  const LoginSchema = Yup.object().shape({
    nameitem: Yup.string().required('Nhập tên vào'),
    UDK: Yup.string().required('Nhập mã sản phẩm vào'),
    price: Yup.number().required('Nhập giá vào'),
    quanlity: Yup.number().required('Nhập số lượng vào'),
    material: Yup.string().required('Nhập loại vào'),
  });

  const methods = useForm<Value>({
    mode: 'onBlur',
    resolver: yupResolver<any>(LoginSchema),
    defaultValues,
  });
  const { reset, handleSubmit } = methods;

  const onSubmit = async (data: Value) => {
    const storage = getStorage();
    const { avatar, album, ...newObject } = data;
    const pictureAvatarAlbum = {
      avatar: data.avatar,
      album: data.album,
    };

    try {
      const avatarUrl = await uploadAndReturnDownloadUrl(
        storage,
        'avatar',
        pictureAvatarAlbum.avatar
      );

      const albumUrls = await Promise.all(
        pictureAvatarAlbum?.album.map(async (item: any) => {
          return await uploadAndReturnDownloadUrl(storage, 'album', item);
        })
      );

      const modifiedObject = {
        ...newObject,
        slug: createSlug(data.nameitem),
        avatar: avatarUrl,
        album: albumUrls,
      };
      setDataFireBase(modifiedObject)
        .then((id) => {
          console.log(id);
        })
        .catch((error) => {
          console.error(error);
        });
      reset(defaultValues);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div>
      <PrimaryButton
        onClick={open}
        className='absolute right-4 top-4'
        text='Thêm Sản Phẩm'
        endIcon={<FaPlus />}
      ></PrimaryButton>
      {/* Modal thêm sản phẩm */}
      <Modal opened={opened} onClose={close} title='Thêm sản phẩm'>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className='p-4'>
            <div className='mb-[10px]'>
              <div className='mb-[10px]'>
                <span>Tên sản phẩm </span>
                <RHFTextField name='nameitem' placeholder='Nhập tên sản phẩm' />
              </div>
              <div className=''>
                <span>Mã sản phẩm</span>
                <RHFTextField name='UDK' placeholder='Mã sản phẩm' />
              </div>
            </div>
            <div className='mb-[10px] flex'>
              <div className='mr-2'>
                <span>Giá Tiền</span>
                <RHFTextField name='price' placeholder='Giá tiền' />
              </div>
              <div>
                <span>Số Lượng</span>
                <RHFTextField name='quanlity' placeholder='Số lượng' />
              </div>
            </div>
            <div className='mb-[10px]'>
              <span>Chất liệu </span>
              <RHFTextField name='material' placeholder='Loại Vải' />
            </div>
            <div className='mb-[10px]'>
              <span>Danh mục</span>
              <RHFMutiSelect
                type='select'
                name='category'
                options={
                  data[0]?.title || ['CLB', 'FlashSale', 'LocalBrand', 'MU']
                }
                placeholder='Danh mục'
              />
            </div>
            <div className='mb-[10px]'>
              <span>Kiểu Dáng</span>
              <RHFMutiSelect
                type='select'
                name='style'
                options={data[0]?.Styles || ['']}
                placeholder='Kiểu dáng'
              />
            </div>
            <div className='mt-3'>
              <div className='mb-2'>
                <RHFInputPicture label='Tải ảnh đại diện' name='avatar' />
              </div>
              <div className='mb-2'>
                <RHFInputPicture
                  multiple
                  label='Tải album sản phẩm'
                  name='album'
                />
              </div>
            </div>
          </div>
          <PrimaryButton
            type='submit'
            text='Thêm'
            endIcon={<FaPlus />}
          ></PrimaryButton>
        </FormProvider>
      </Modal>
    </div>
  );
};

export default AddProduct;
