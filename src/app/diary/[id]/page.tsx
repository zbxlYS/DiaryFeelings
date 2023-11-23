'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import UpLoading from '@/app/wrote/_components/UpLoading'
import { notFound } from 'next/navigation'
import { IDiary } from '@/app/types/type'
import DatePicker from 'react-datepicker'
import Image from 'next/image'
import moment from 'moment'
import RadioGroup from '../_components/RadioGroup'
import RadioEmo from '../_components/RadioEmo'
interface Props {
  id: any
}

const DiaryDetail = ({ params }: { params: Props }) => {
  const [view, setView] = useState<IDiary>()
  const [upLoading, setUpLoading] = useState(false)
  const [value, setValue] = useState('')
  const num = parseInt(params.id)
  const emotionList = [
    ['happy', '오늘은 행복한 날이에요!'],
    ['sad', '오늘은 슬픈 날이에요...'],
    ['angry', '오늘은 뿔나는 날이에요!!'],
    ['depress', '오늘은 풀죽은 날이에요...'],
    ['normal', '오늘은 무난한 날이에요.'],
  ]

  // 숫자로 변환했는데 NaN이면 없는 페이지.
  if (isNaN(num)) {
    notFound()
  }

  const getDiary = async () => {
    const result = await axios.get(`/api/diary/${num}`)
    const data = result.data
    setView((prev) => data.result)
    console.log('view', data)

    if (result.data.msg === 'success') {
      console.log('Get Diary Success')
    }
  }
  useEffect(() => {
    getDiary()
  }, [num])

  return (
    <div className="w-full flex justify-center items-center p-[7px]">
      <div className="relative w-[1280px] flex flex-col items-end p-[30px] relative border rounded-md shadow-lg mt-[40px]">
        {upLoading && <UpLoading />}
        <div className="border shadow-lg absolute p-[10px] shadow-xl rounded-md my-[20px] flex flex-col justify-center items-center top-[-20px] right-[-150px]">
          <div className="relative flex flex-col justify-center items-center">
            <span>오늘의 날씨</span>
            <Image
              src={`/${view?.diary_weather}.png`}
              width={100}
              height={100}
              alt="weather"
            />
          </div>
          <div>{moment(view?.diary_userDate).format('YYYY-MM-DD')}</div>
        </div>
        <div
          className={`w-full h-[50px] px-[10px] text-[30px] mt-[30px] border-b-[2px] outline-0 bg-[transparent] `}
        >
          {view?.diary_title}
        </div>
        {/* emotion */}
        <div className="w-full py-[10px] mt-[10px] flex items-center flex flex-col justify-center items-center">
          <div className="flex items-center gap-[30px] w-full ml-10">
            <Image
              src={`/${view?.diary_userEmo}.png`}
              width={130}
              height={130}
              alt={`${view?.diary_userEmo}`}
              className={`w-[130px] h-[130px]`}
            />
            {/* advice */}
            <div className="m-50 min-w-[250px] w-fit h-[70px] bg-gray-400 rounded-xl justify-center content-center items-center">
              <div className="text-white text-center text-[18px]">
                {view?.diary_advice}
              </div>
            </div>
          </div>
          {/* user image */}
          <div className="w-full py-[10px] flex items-center flex flex-col justify-center items-center">
            <div className="mt-[30px] w-full flex">
              <div className="mr-[30px]">
                <div className="w-[300px] h-[300px] rounded-md bg-gray-200 object-contain flex justify-center items-center overflow-hidden">
                  {
                    <Image
                      src={view?.image_src}
                      alt="preview"
                      width={300}
                      height={300}
                    />
                  }
                </div>
                <input type="file" accept="image/*" hidden={true} />
              </div>
              <div className="w-full flex flex-col">
                <div className="relative border p-[5px] mb-[5px] rounded-md flex items-center">
                  <span className={`relatvie `}>
                    선택된 폰트: {view?.diary_font}
                  </span>
                </div>
                <div
                  className={`border resize-none w-full h-full outline-none rounded-md p-[10px] text-lg bg-[transparent]`}
                >
                  {view?.diary_content}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="bg-[#b2a4d4] text-white px-[14px] py-[7px] rounded-md cursor-pointer opacity-[0.8] hover:opacity-[1]">
            <span className="text-lg">수정</span>
          </div>
          <div className="bg-[#b2a4d4] text-white px-[14px] py-[7px] rounded-md cursor-pointer opacity-[0.8] hover:opacity-[1] ml-4">
            <span className="text-lg">삭제</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiaryDetail
