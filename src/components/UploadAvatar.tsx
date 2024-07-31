import TextHeader from '@/components/TextHeader';
import { uploadAndReturnDownloadUrl } from '@/components/product/AddProduct';
import { addAvatar } from '@/lib/features/Avatar/Avatar';
import { getStorage } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const UploadAvatar = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState<string>();
  const dispath = useDispatch();
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  const onSelectFile = async (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
    const storage = getStorage();
    try {
      const avatarUrl = await uploadAndReturnDownloadUrl(
        storage,
        'blogAvatar',
        e.target.files[0]
      );
      dispath(addAvatar(avatarUrl));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='h-full rounded-xl border p-2'>
      <div className='flex justify-between'>
        <TextHeader>Avatar</TextHeader>
        <input className='ml-2 w-1/2' type='file' onChange={onSelectFile} />
      </div>
      <div className='mt-2'>
        {selectedFile && (
          <img className=' h-[20vh] w-full object-contain' src={preview} />
        )}
      </div>
    </div>
  );
};

export default UploadAvatar;
