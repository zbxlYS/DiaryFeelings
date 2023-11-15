'use client'

import { useState, forwardRef, useEffect } from 'react'
import './diaryCSS.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ko } from 'date-fns/esm/locale'
import DiaryLayout from './_components/DiaryLayout'
import { useRecoilState } from 'recoil'
import { textState } from '@/app/lib/atoms/atom'
import { useSearchParams } from 'next/navigation'
import Pagination from './_components/Pagination'

const Diary = () => {
  const params = useSearchParams();
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [test, setText] = useRecoilState(textState)
  const [page, setPage] = useState(1);
  const [view, setView] = useState<any[]>([]);
  const offset = (page - 1) * 6;
  const curPage = params.get('page')

  
  useEffect(() => {
    setPage(prev => Number(curPage))
  },[curPage])
  const arr = new Array(100).fill(0);

  useEffect(() => {
    setView(arr.slice(offset, offset + 6));
  },[page])

  // const [postPerPage, setPostPerPage] = useState(6);
  // const [currentPage, setCurrentPage] = useState(1);

  // const offset = (currentPage - 1) * postPerPage;

  // const totalPosts = arr.slice(offset, offset + postPerPage).map((post, index) => <DiaryLayout key={index} />);

  // const setPage = (page: number) => {
    
  //   setCurrentPage(page);
  // }

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
        {
          view.map((data, index) => (
            <DiaryLayout key={index} />
          ))
        }
      </div>
        <Pagination
          total={arr.length}
          limit={6}
          page={page}
          setPage={setPage}
        />
    </div>
  )
}

export default Diary
