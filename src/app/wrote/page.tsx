'use client'

import { useEffect, useRef, useState } from "react"
import RadioGroup from "./_components/RadioGroup"
import Radio from './_components/Radio'
// 감정 선택
// 사진 넣을 곳 추가
// 날씨 선택
// 글 수정, 삭제, 작성 기능
const Write = () => {
    const [value, setValue] = useState('happy');
    useEffect(() => {
        console.log(value)
    },[value])
    return (
        <div className="border w-[1280px] h-[600px] flex flex-col items-start p-[10px]">
            <input type='text' className="w-full h-[50px] p-[10px] text-[20px] mt-[100px] border-b-[2px] outline-0" placeholder="제목 입력할 곳"/>
            <div className="w-full border py-[10px] mt-[30px] flex items-center">
                <RadioGroup label="emotion" value={value} onChange={setValue}>
                    <Radio value="happy">행복</Radio>
                    <Radio value="sad">슬픔</Radio>
                    <Radio value="angry">분노</Radio>
                    <Radio value="surp">놀람</Radio>
                    <Radio value="disp">당황</Radio>
                </RadioGroup>
            </div>
        </div>
    )
}

export default Write