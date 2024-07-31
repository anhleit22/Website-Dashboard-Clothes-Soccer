import React, { useState } from 'react';
import '@blocknote/core/fonts/inter.css';
import { useCreateBlockNote } from '@blocknote/react';

import '@blocknote/react/style.css';
import TextHeader from '@/components/TextHeader';
import { useForm } from 'react-hook-form';

import * as Yup from 'yup';
import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import { yupResolver } from '@hookform/resolvers/yup';
import { PrimaryButton } from '@/components/Button';
import UploadAvatar from '@/components/UploadAvatar';
import { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

import { BlockNoteView } from '@blocknote/mantine';
import { createSlug } from '@/components/func/createSlug';

function EditorBlog() {
  const avatar = useSelector((state: RootState) => state.avatar);
  const [html, setHTML] = useState<string>('');
  const editor = useCreateBlockNote();
  const onChange = async () => {
    const html = await editor.blocksToHTMLLossy(editor.document);
    setHTML(html);
  };

  const LoginSchema = Yup.object().shape({
    nameBlog: Yup.string().required('Nhập tên vào'),
    introBlog: Yup.string().required('Nhập Intro vào'),
  });
  type valueContent = {
    nameBlog: string;
    introBlog: string;
  };
  const defaultValues = {
    nameBlog: '',
    introBlog: '',
  };
  const methods = useForm<valueContent>({
    mode: 'onSubmit',
    resolver: yupResolver<any>(LoginSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = async (data: valueContent) => {
    try {
      const listBlog = contentObject(data, html, avatar.render);
      await addDoc(collection(db, 'listBlog'), { listBlog });
      console.log(listBlog);
    } catch (error) {
      console.log(error);
    }
    reset(defaultValues);
    setHTML('');
  };

  const contentObject = (
    data: valueContent,
    html: string,
    avatarUrl: string
  ) => {
    return {
      ...data,
      slug: createSlug(data.nameBlog),
      html: html,
      avatar: avatarUrl,
      date: new Date(),
    };
  };

  return (
    <div className='h-full'>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className='flex'>
          <div className='mr-3 w-3/4'>
            <TextHeader>Title</TextHeader>
            <RHFTextField
              className='mt-[10px]'
              name='nameBlog'
              placeholder='Tên bài blog'
            />
            <TextHeader>Intro</TextHeader>
            <RHFTextField
              className='mt-[10px]'
              name='introBlog'
              placeholder='Phần giới thiệu bài blog'
            />
          </div>
          <div className='w-1/4'>
            <UploadAvatar />
          </div>
        </div>
        <TextHeader>Body</TextHeader>
        <div className='mt-[10px]'>
          <BlockNoteView editor={editor} onChange={onChange} />
        </div>
        <div className='absolute bottom-3'>
          <PrimaryButton type='submit' text='Đăng Bài' className='mt-3' />
        </div>
      </FormProvider>
    </div>
  );
}
export default EditorBlog;
