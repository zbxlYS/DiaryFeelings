'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { useSession } from 'next-auth/react'
const page = () => {
    const { data: session } = useSession();
    // 제목
    const titleRef = useRef<HTMLInputElement>(null);

    // 내용
    const contentRef = useRef<HTMLTextAreaElement>(null);

    // 날씨
    const weatherRef = useRef<HTMLInputElement>(null);

    // 이미지 제목
    const imgTitRef = useRef<HTMLInputElement>(null);

    // 이미지
    const imgRef = useRef<HTMLInputElement>(null);

    // 이미지 주소 (미리보기 보여주기 위함)
    const [imgUrl, setImgUrl] = useState("");

    const handleImageView = (e: React.ChangeEvent<{files: FileList | null}>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            URL.revokeObjectURL(imgUrl);
            // 이전 미리보기를 지움.

            setImgUrl(prev => URL.createObjectURL(file));
        }
    }
    const imgReset = () => {
        // 미리보기 안 보이게.
        if (imgRef.current) {
            imgRef.current.value = '';
            URL.revokeObjectURL(imgUrl);
            setImgUrl(prev => '');
        }
    }
    const send = async() => {
        if(!session) return;
        // 작성.
        if(!titleRef.current) {
            alert("제목 입력.");
            return;
        }
        if(!contentRef.current) {
            alert("내용 입력.");
            return;
        }
        if(!weatherRef.current) {
            alert('날씨 입력.');
            return;
        }
        const formData = new FormData();
        formData.append("title", titleRef.current.value);
        formData.append("content", contentRef.current.value);
        formData.append('id', session?.user?.id as string);
        formData.append('name', session.user?.name as string);
        formData.append('weather', weatherRef.current.value);
        if(imgRef.current && imgRef.current.files && imgRef.current.files.length > 0 && imgTitRef.current) {
            formData.append('img', imgRef.current.files[0])
            formData.append('imgTit', imgTitRef.current.value)
        };
        const result = await axios.post(
            "/api/diary",
            formData,
            {
                headers: {
                    "Content-Type":"multipart/form-data",
                    "Authorization":`mlru ${session?.accessToken}`
                }
            }
        );
        console.log(result.data);
        imgReset();
    };
  return (
    <div>
        일기 작성 테스트<br />

        <input type='text' className='border' ref={titleRef} /><br />
        <br />
        <textarea ref={contentRef} name="diary" id="diary" className='border'></textarea>
        <br />
        <input ref={weatherRef} type='text' className='border' />
        <br />
        <input ref={imgTitRef} type='text' className='border' />
        <br />
        <input ref={imgRef} type='file' className='border' onChange={(e) => handleImageView(e)}/>
        <br />
        {
            imgUrl && (
                <>
                <Image
                    src={imgUrl}
                    alt='preview'
                    width={200}
                    height={300}
                />
                <button onClick={imgReset} className='border'>지우기</button>
                <br />
                </>
            )
        }
        <br />
        <button className='border' onClick={send}>gogogogogo</button>
    </div>
  )
}

export default page
