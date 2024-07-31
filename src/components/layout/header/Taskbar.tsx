import React, { useState, useEffect, useRef } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { CiLogout } from 'react-icons/ci';
import { CiFacebook, CiInstagram } from 'react-icons/ci';
import { PrimaryButton } from '@/components/Button';
import { Menu, Text, Card } from '@mantine/core';
import { CiSearch } from 'react-icons/ci';
import { FaShoppingCart } from 'react-icons/fa';
import { ProductionItem } from '@/components/product/Product';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

import Link from 'next/link';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { useDebouncedCallback } from 'use-debounce';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { PATH_PUBLIC } from '@/routes/path';

type Taskbarname = {
  title: string;
  list: {
    title: string;
    src: string;
  }[];
}[];

const TaskbarMenuSelect = (props: { data: Taskbarname }) => {
  const searchTermRef = useRef('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter();

  return (
    <ul className='!relative flex h-[5vh] justify-between px-5 font-medium uppercase tracking-widest'>
      {props?.data.map((item) => (
        <Menu
          key={item.title}
          trigger='hover'
          openDelay={100}
          closeDelay={200}
          offset={0}
        >
          <Menu.Target>
            <li className='flex items-center text-[white]'>
              <p>{item.title}</p>
              <FaAngleRight className='ml-[2px] text-[20px]' />
            </li>
          </Menu.Target>
          <Menu.Dropdown className=' w-[50%] rounded-none bg-gray-100'>
            <div className=' w-[full] bg-gray-100  text-[14px]'>
              <Menu.Item>
                {item.list.map((item) => (
                  <Menu
                    key={item.title}
                    trigger='hover'
                    openDelay={100}
                    closeDelay={150}
                    position='right-start'
                    offset={15}
                  >
                    <ul className='px-4'>
                      <Menu.Target>
                        <div
                          className=' hover:text-primary uppercase'
                          onClick={() => {
                            searchTermRef.current = item.title;
                            setSearchTerm(item.title);
                            router.push(`/product?q=${searchTerm}`);
                          }}
                        >
                          <li className='my-auto flex h-[40px] items-center font-medium'>
                            <FaAngleRight className='ml-[2px] mr-[5px] text-[20px] ' />
                            {item.title}
                          </li>
                        </div>
                      </Menu.Target>
                    </ul>
                  </Menu>
                ))}
              </Menu.Item>
            </div>
          </Menu.Dropdown>
        </Menu>
      ))}
    </ul>
  );
};

const TaskbarContact = () => {
  const [user, setUser] = useState(false);
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Cho đăng nhập');
        setUser(true);
      } else {
        console.log('không cho đăng nhập');
      }
    });
  }, []);
  return (
    <div className='flex h-[3vh] items-center justify-between text-[13px] font-semibold text-[white]'>
      <div className='container flex items-center'>
        <a className='mr-[2px] px-[4px]' href='/'>
          Hotline: 0927 993 249
        </a>
        <span className='border-l-[1px] p-[4px]'>
          <a className='p-[4px] pr-[0px]' href='/'>
            Tìm của hàng
          </a>
        </span>
        <span className='flex items-center border-l-[1px] px-[4px]'>
          <p className='mr-[2px] p-[4px] pr-[0px]'>Liên Hệ hợp tác</p>
          <a href='/facebook' className='mr-[2px] p-[4px] pr-[0px] '>
            <CiFacebook />
          </a>
          <a href='/instagram' className='mr-[2px] p-[4px] pr-[0px] '>
            <CiInstagram />
          </a>
        </span>
      </div>
      {user && (
        <div
          onClick={() => {
            signOut(auth)
              .then(() => {
                console.log('Sign-out successful.');
              })
              .catch((error) => {
                console.log('An error happened.', error);
              });
          }}
          className='mx-auto flex w-[10vh] items-center hover:cursor-pointer'
        >
          <CiLogout className='ml-1' />
          <span className='ml-1 hover:underline'>Log Out</span>
        </div>
      )}
    </div>
  );
};

const SearchAndCart = () => {
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const product = useSelector((state: RootState) => state.product.arr);
  const productNumber = useSelector((state: RootState) => state.product.number);
  const formattedNumber = productNumber?.totalProduct.toLocaleString('vi-VN');
  const router = useRouter();
  if (typeof window !== 'undefined') {
    localStorage.setItem('listItem', JSON.stringify(product));
  }
  useEffect(() => {
    let fetchData = async () => {
      if (searchTerm.trim() === '') {
        setSearchResults([]);
        return;
      }
      const q = query(
        collection(db, 'Product'),
        where('value.nameitem', '>=', searchTerm)
      );
      const querySnapshot = await getDocs(q);
      let searchResult: any[] = [];
      querySnapshot.forEach((doc) => {
        searchResult.push({ id: doc.id, ...doc.data() });
      });
      setSearchResults(searchResult);
    };
    fetchData();
  }, [searchTerm]);
  const handleSearch = useDebouncedCallback((searchTerm) => {
    setSearchTerm(searchTerm);
  }, 300);

  return (
    <div className='mx container flex h-[7vh] items-center justify-between py-[20px]'>
      <Link
        href={PATH_PUBLIC.home}
        className='tex-[35px] pr-[40px] uppercase text-[white]'
      >
        Gạo Sport
      </Link>
      <div className='flex h-[40px] w-[840px] justify-between rounded-sm bg-[white] p-[5px]	'>
        <div className='flex w-full justify-around'>
          <input
            onBlur={() => {
              setOpenSearch(false);
            }}
            onChange={(e) => {
              handleSearch(e.target.value);
              setOpenSearch(true);
            }}
            className='group relative mr-[5px] w-[750px] border-0 px-[10px] focus:border-transparent focus:outline-none'
            placeholder='Tìm sản phẩm, thương hiệu'
          ></input>

          <PrimaryButton
            onClick={() => {
              router.push(`/product?q=${searchTerm}`);
            }}
            isOrginalPadding={false}
            type='button'
            className='  p-[12px]'
            startIcon={
              <CiSearch
                className='text-center
                 text-[14px] text-[white]'
              />
            }
          />
        </div>
        {openSearch && (
          <Card className='absolute top-20 z-50 h-[685px] w-[840px] overflow-hidden overflow-y-scroll'>
            {searchResults.map((item) => (
              <ProductionItem key={item.id} type='product' data={item.value} />
            ))}
          </Card>
        )}
      </div>
      <Menu
        position='bottom-end'
        trigger='hover'
        openDelay={100}
        closeDelay={400}
        arrowSize={10}
        withArrow
        width={400}
      >
        <Menu.Target>
          <Link className='relative' href={PATH_PUBLIC.cart}>
            <FaShoppingCart className='text-[26px] text-[white]' />
            <div className='border-primary absolute right-[-10px] top-[8px] h-[20px] w-[20px] rounded-full border bg-[white]'>
              <p className=' text-primary text-center text-[13px] font-bold'>
                {productNumber.numberProduct}
              </p>
            </div>
          </Link>
        </Menu.Target>
        <Menu.Dropdown className='!w-[50%]'>
          <Menu.Label>Giỏ Hàng</Menu.Label>
          <Menu.Label>
            <div className=' flex items-center justify-between bg-[white]'>
              <span className='text-primary text-[14px]'>
                <Text className='font-bold'>Tổng tiền: </Text>
                <span className='mr-7 font-bold'>{formattedNumber}đ</span>
              </span>
              <div
                onClick={() => {
                  router.push(PATH_PUBLIC.cart);
                }}
              >
                <PrimaryButton text='THANH TOÁN' />
              </div>
            </div>
          </Menu.Label>
          <div className=' h-[50vh] overflow-auto'>
            {product?.map((item) => (
              <div key={item.UDK}>
                <ProductionItem data={item} type='cart' />
              </div>
            ))}
          </div>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export { TaskbarMenuSelect, TaskbarContact, SearchAndCart };
