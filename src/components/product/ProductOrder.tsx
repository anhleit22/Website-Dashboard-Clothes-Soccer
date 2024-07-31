import { ProductItem } from '@/components/product/Product';
import { db } from '@/firebaseConfig';
import { Card } from '@mantine/core';
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { Table, TableData } from '@mantine/core';
import { PrimaryButton } from '@/components/Button';

export type orderProducts = {
  id: string;
  UDK: string;
  count: number;
  note: string;
  phoneNumber: string;
  productArr: ProductItem[];
  size: string;
  state: boolean;
  timestamp: any;
  transport: string;
}[];
export type orderProduct = {
  id: string;
  UDK: string;
  count: number;
  note: string;
  phoneNumber: string;
  productArr: ProductItem[];
  size: string;
  state: boolean;
  timestamp: any;
  transport: string;
};

const ProductOrder = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [dataInFirebase, setDataInFirebase] = useState<orderProducts>();
  const [orderInfor, setOrderInfor] = useState<orderProduct>();
  const orderInforRef = useRef(orderInfor);
  const [tableData, setTableData] = useState<TableData>();
  const [sum, setSum] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      const reference = query(
        collection(db, 'Order'),
        where('Data.state', '==', false)
        // where('Data.productArr', 'array-contains', true)
      );
      const querySnapshot = await getDocs(reference);
      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        let dataMod = {
          ...doc.data().Data,
          id: doc.id,
        };
        data.push(dataMod);
      });
      setDataInFirebase(data);
    };
    fetchData();
  }, []);
  return (
    <ul className='grid grid-cols-5 gap-4 text-[14px]'>
      {dataInFirebase?.map((item) => (
        <li key={item?.id} className='col-span-1'>
          <Card
            onClick={() => {
              open();
              orderInforRef.current = item;
              setOrderInfor(item);

              const s = orderInforRef.current?.productArr?.map((item) => {
                return [
                  item.UDK,
                  item.nameitem,
                  item.price,
                  item.quanlityCart,
                  item.material,
                ];
              });
              let sum = 0;
              s.forEach((subArray) => {
                if (typeof subArray[3] === 'number') {
                  sum += subArray[3];
                }
              });
              setSum(() => {
                if (sum == 0) {
                  return (sum = 1);
                }
                return sum;
              });
              setTableData({
                caption: 'Danh sách đơn hàng',
                head: [
                  'UDK',
                  'Tên sản phẩm',
                  'Giá',
                  'Số sản phẩm',
                  'Chất liệu',
                ],
                body: s || [
                  [
                    'Không có dữ liệu',
                    'Không có dữ liệu',
                    'Không có dữ liệu',
                    'Không có dữ liệu',
                    'Không có dữ liệu',
                  ],
                ],
              });
            }}
            shadow='sm'
            radius='md'
            withBorder
          >
            <img src='https://geso.us/upload/images/Tin%20t%E1%BB%A9c/1-quan-ly-don-hang-hieu-qua-giup-doanh-nghiep-kiem-soat-toan-bo-quy-trinh-ban-hang.jpg' />
            <ul className='mt-[10px] list-disc px-[10px]'>
              <li className='ml-[5px]'>
                <span className='ml-[2px]'>
                  Ngày : {item?.timestamp.toDate().getDate()} -{' '}
                  {item?.timestamp.toDate().getMonth() + 1} -{' '}
                  {item?.timestamp.toDate().getFullYear()}
                </span>
                <span className='ml-[5px]'>
                  Giờ: {item?.timestamp.toDate().getHours()}:
                  {item?.timestamp.toDate().getMinutes()}:
                  {item?.timestamp.toDate().getSeconds()}
                </span>
              </li>
              <li className='ml-[5px]'>Địa chỉ: {item.transport}</li>
            </ul>
          </Card>
          <Modal
            overlayProps={{
              backgroundOpacity: 0.1,
              blur: 2,
            }}
            opened={opened}
            size={'80%'}
            onClose={close}
            title='Thông tin đơn hàng'
          >
            <div className='mb-[20px] flex justify-between px-[7px]'>
              <div className='mb-[5px]'>
                Mã đơn hàng :{' '}
                <span className='font-bold'>{orderInfor?.id}</span>
              </div>
              <div className='mb-[5px]'>
                Địa chỉ người đặt hàng:{' '}
                <span className='font-bold'>{orderInfor?.transport}</span>
              </div>
              <div className='mb-[5px]'>
                Số điện thoại người đặt:{' '}
                <span className='font-bold'>{orderInfor?.phoneNumber}</span>
              </div>
              <div className='mb-[5px]'>
                Size: <span className='font-bold'>{orderInfor?.size}</span>
              </div>
            </div>
            <Table data={tableData} />
            <div className='flex justify-between'>
              <div className='my-[10px]'>Tổng số đơn hàng:{sum}</div>
              <PrimaryButton
                onClick={async () => {
                  const id = orderInfor?.id;
                  const ref = doc(db, 'Order', id || '');
                  await updateDoc(ref, {
                    'Data.state': true,
                  });
                }}
                text='Hoàn Thành Đóng Gói Và Gởi Đi'
              />
            </div>
          </Modal>
        </li>
      ))}
    </ul>
  );
};

export default ProductOrder;
