'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Container, Flex, rem } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiError } from 'react-icons/bi';
import * as Yup from 'yup';

import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import RHFPasswordField from '@/components/hook-form/RHFPasswordField';

import { PrimaryButton } from '@/components/Button';
import { useRouter } from 'next/navigation';
import { signInWithEmail } from '@/components/func/login';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { PATH_AUTH } from '@/routes/path';

export type FormValuesProps = {
  email: string;
  password: string;
  confirmpassword?: string;
  afterSubmit?: string;
};
// page Login
const Login = () => {
  const router = useRouter();
  const [errorLogin, setErrorLogin] = useState<string | null>(null);
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email là bắt buộc')
      .email('Email không hợp lệ'),
    password: Yup.string().required('Mật khẩu là bắt buộc'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm<FormValuesProps>({
    mode: 'all',
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const auth = getAuth();
  const onSubmit = async (data: FormValuesProps) => {
    const { email, password } = data;
    await signInWithEmail(email, password);
    reset(defaultValues);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push(PATH_AUTH.dashboard);
      } else {
        console.log('không cho đăng nhập');
      }
    });
    // const result: any = await signIn('credentials', {
    //   email,
    //   password,
    //   redirect: false,
    //   callbackUrl: PATH_DASHBOARD.home,
    // });
    // if (result?.error) {
    //   setErrorLogin(result.error);
    //   reset(defaultValues);
    // } else {
    //
    // }
  };

  // const { data: session } = useSession();
  // if (session) {
  //   router.push(PATH_DASHBOARD.home);
  // }
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className='container mx-auto my-5 bg-slate-50'>
        <Box className='p-8 shadow-md'>
          <div className='flex h-full flex-col justify-between'>
            <div className='w-full'>
              <Flex justify='center' mb={45}>
                <Link href='/'>
                  <Image src='/Logo.svg' alt='logo' width={100} height={100} />
                </Link>
              </Flex>
              <Flex direction='column' gap={16} mb={rem(80)}>
                <RHFTextField
                  name='email'
                  placeholder='Email'
                  sx={{
                    '& input': {
                      height: rem(55),
                      borderRadius: rem(8),
                    },
                  }}
                />
                <RHFPasswordField
                  name='password'
                  placeholder='Mật khẩu'
                  styles={{
                    wrapper: {
                      '& input:focus': {
                        border: '0 !important',
                      },
                    },
                    input: {
                      height: rem(55),
                      borderRadius: rem(8),
                    },
                    innerInput: {
                      height: 'auto',
                    },
                  }}
                />
                <Link
                  href='/forgot-password'
                  className='flex w-full justify-end'
                ></Link>

                <PrimaryButton
                  type='submit'
                  className='mt-2 h-[55px]'
                  text='Đăng nhập'
                />
                {errorLogin && (
                  <Container>
                    <BiError size={20} />
                    <span>{errorLogin}</span>
                  </Container>
                )}
              </Flex>
            </div>
          </div>
        </Box>
      </div>
      {/* </AuthWrapper> */}
    </FormProvider>
  );
};

export default Login;
