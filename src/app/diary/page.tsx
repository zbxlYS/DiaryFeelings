'use client'

import { useState, forwardRef } from 'react'
import './diaryCSS.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ko } from 'date-fns/esm/locale'
import DiaryLayout from './_components/DiaryLayout'
import { useRecoilState } from 'recoil'
import { textState } from '@/app/lib/atoms/atom'

const Diary = () => {
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [test, setText] = useRecoilState(textState)
  console.log(test)

  const CalendarInput = forwardRef(({ value, onClick }: any, ref: any) => (
    // any 안 쓰고 싶은데 몰루겠다...
    <div className="flex">
      <span>{value}</span>
      <img
        src="./calendar-regular.svg"
        className="w-[20px] h-[20px] ml-[20px] cursor-pointer"
        onClick={onClick}
        ref={ref}
      />
    </div>
  ))
  return (
    <div className="w-full h-full mt-[20px] flex flex-col justify-center items-center">
      <div className="border h-[50px] rounded-md flex justify-around items-center self-start ml-[335px] mb-[50px]">
        <div className="flex items-center px-[60px]">
          <DatePicker
            selected={startDate}
            locale={ko}
            dateFormat="yyyy. MM. dd"
            closeOnScroll={true}
            onChange={(date: Date) => setStartDate(date)}
            customInput={<CalendarInput />}
          />
        </div>
        <div>
          <span> ~ </span>
        </div>
        <div className="flex items-center px-[60px]">
          <DatePicker
            selected={endDate}
            locale={ko}
            dateFormat="yyyy. MM. dd"
            closeOnScroll={true}
            onChange={(date: Date) => setEndDate(date)}
            customInput={<CalendarInput />}
          />
        </div>
      </div>
      <div className="flex flex-wrap w-[1280px] justify-start mt-[30px]">
        <DiaryLayout />
        <DiaryLayout />
        <DiaryLayout />
        <DiaryLayout />
        <DiaryLayout />
      </div>
      <div className="flex px-[100px] h-[50px] border rounded-md mb-[100px] items-center justify-center">
        <div className="flex items-center h-full">
          <span className="mr-[15px] cursor-pointer hover:text-[#b2a4d4]">
            {'처음'}
          </span>
          <span className="mr-[30px] cursor-pointer hover:text-[#b2a4d4]">
            {'이전'}
          </span>
        </div>
        <div className="flex items-center h-full gap-[15px]">
          <span
            className={`py-[2px] px-[10px] rounded-[50%] text-white bg-[#b2a4d4]`}
          >
            1
          </span>
          <span
            className={`py-[2px] px-[10px] cursor-pointer hover:text-[#b2a4d4] rounded-md`}
          >
            2
          </span>
          <span
            className={`py-[2px] px-[10px] cursor-pointer hover:text-[#b2a4d4] rounded-md`}
          >
            3
          </span>
          <span
            className={`py-[2px] px-[10px] cursor-pointer hover:text-[#b2a4d4] rounded-md`}
          >
            4
          </span>
          <span
            className={`py-[2px] px-[10px] cursor-pointer hover:text-[#b2a4d4] rounded-md`}
          >
            5
          </span>
        </div>
        <div className="flex items-center h-full">
          <span className="ml-[30px] cursor-pointer hover:text-[#b2a4d4]">
            {'다음'}
          </span>
          <span className="ml-[15px] cursor-pointer hover:text-[#b2a4d4]">
            {'마지막'}
          </span>
        </div>
      </div>
    </div>
  )
}
