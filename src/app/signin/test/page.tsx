"use client"

import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useRef, useState } from 'react'

const page = () => {
    const idRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const imgRef = useRef<HTMLInputElement>(null);
    const [imgUrl, setImgUrl] = useState("");
    const { data: session } = useSession();
    console.log(session);
    const handleImg = (e: React.ChangeEvent<{ files: FileList | null }>) => {
        if(e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            URL.revokeObjectURL(imgUrl);

            setImgUrl(prev => URL.createObjectURL(file));
        }
    }
    const imgReset = () => {
        if(imgRef.current) {
            imgRef.current.value = '';
            URL.revokeObjectURL(imgUrl);
            setImgUrl(prev => '');
        }
    }

    const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if(idRef.current && pwRef.current && nameRef.current) {
            const formData = new FormData();
            formData.append('user_id', idRef.current.value);
            formData.append('password', pwRef.current.value);
            formData.append('user_name', nameRef.current.value);
            if(imgRef.current && imgRef.current.files && imgRef.current.files.length > 0) {
                formData.append('img', imgRef.current.files[0]);
            }
            const result = await axios.put(
                "/api/user",
                formData,
                {
                    headers: {
                        "Content-Type":"multipart/form-data"
                    }
                }
            );
            if(result.statusText === 'OK') {
                console.log('가입에 성공했어요.');
                imgReset();
            } else {
                console.log(result.data.result)
            }
        }
    }
  return (
    <div>
      <form>
        <input type="text" ref={idRef} className='border'/><br />
        <input type="text" ref={pwRef} className='border'/><br />
        <input type="text" ref={nameRef} className='border'/><br />
        <input
            type='file'
            name='imgFile'
            ref={imgRef}
            id='imgFile'
            onChange={(e: React.ChangeEvent<{ files: FileList | null}>) => handleImg(e)}
        />
        <button onClick={handleSubmit} className='border'>gogogo</button>
        <button type='button' className='border' onClick={imgReset}>지우기</button>
      </form>
      {
        imgUrl && (
            <Image
                className='w-[60px] h-[60px] rounded-[50%]'
                src={imgUrl}
                alt="profile"
                width={60}
                height={60}
            />
        )
      }
    </div>
  )
}

export default page
