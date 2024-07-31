'use client';
import React, { useEffect, useState } from 'react';
import { ProductItem, ProductionDetail } from '@/components/product/Product';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { usePathname } from 'next/navigation';
import BreadCrums from '@/components/BreadCrums';
import FormBuyProduct from '@/components/product/FormBuyProduct';

const production = () => {
  const [dataInFirebase, setDataInFirebase] = useState<ProductItem>({
    nameitem: '',
    UDK: '',
    id: '',
    price: 0,
    quanlity: 0,
    material: '',
    avatar: '',
    album: [''],
    quanlityCart: 0,
    slug: '',
  });
  const pathname = usePathname();
  const slugProduct = pathname?.replace('/product/', '');
  useEffect(() => {
    const fetchData = async () => {
      const reference = query(
        collection(db, 'Product'),
        where('value.slug', '==', slugProduct)
      );
      const querySnapshot = await getDocs(reference);
      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setDataInFirebase(data[0].value);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className='relative flex justify-center'>
        <div className='container mt-2'>
          <BreadCrums slug={slugProduct} />
        </div>
      </div>
      <div className='mt-[10px] flex flex-col items-center'>
        <FormBuyProduct data={dataInFirebase} />
        {/* chi tiết sản phẩm */}
        <div className='mx container mt-[30px] bg-[white] p-3'>
          <ProductionDetail />
        </div>
      </div>
    </div>
  );
};
export default production;
