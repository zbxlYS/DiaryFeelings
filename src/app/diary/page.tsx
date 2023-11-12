"use client"

import { useRef, useState, forwardRef, RefObject } from 'react';
import './diaryCSS.css';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale'
import IMG from './calendar-regular.svg';

const Diary = () => {
    const year = [
        2023, 2022, 2021, 2020
    ]
    const month = [
        1,2,3,4,5,6,7,8,9,10,11,12
    ]
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

    const CalendarInput = forwardRef(({ value, onClick }: any, ref: any) => (
        // any 안 쓰고 싶은데 몰루겠다...
        <div className='flex'>
            <span>{value}</span>
            <img src='./calendar-regular.svg' className='w-[20px] h-[20px] ml-[20px] cursor-pointer' onClick={onClick} ref={ref}/>
        </div>
    ));
    return (
        <div className='w-full h-full mt-[20px] flex flex-col justify-center items-center'>
            <div className='border h-[50px] rounded-md flex justify-around items-center'>
                <div className='flex items-center px-[60px]'>
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
                <div className='flex items-center px-[60px]'>
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
            <div className='flex flex-wrap w-[1280px] justify-between mt-[30px]'>
                <div className='border relative w-[500px] h-[550px] rounded-[20px] flex flex-col justify-between overflow-hidden pb-[10px] shadow-lg'>
                    <div className='relative w-full h-[250px] bg-gray-200 object-cover'>
                        <div className='w-full h-full object-cover overflow-hidden flex justify-center items-center'>
                            <img src="./rain.png" alt="" className='w-full'/>
                        </div>
                        <div className='absolute p-[7px] w-[60px] h-[60px] rounded-[50%] bg-white shadow-lg bottom-[-30px] right-[30px] object-cover overflow-hidden z-10'>
                            <img src="./kkomul.png" alt="" className='w-full h-full'/>
                        </div>
                    </div>
                    <div className='flex flex-col w-full p-[20px] justify-around'>
                        <div className='flex flex-col w-full pt-[30px]'>
                            <span className='text-[20px] font-pretendard'>오늘은 비가 왔다.</span>
                            <pre className='text-base mt-[20px] text-gray-400 whitespace-pre-wrap font-pretendard'>비가 내리면 마asdfasdfasdfdsafsad음에 휴식이 찾아와서 나는 비 오는...</pre>
                        </div>
                    </div>
                    <div className='flex items-center mb-[20px] ml-[20px]'>
                            <div className='w-[50px] h-[50px] rounded-[50%] bg-white shadow-lg overflow-hidden object-contain'>
                                <img src="./yuumi.jpg" alt="" className='w-full h-full'/>
                            </div>
                            <div className='flex flex-col ml-[15px] justify-center text-base'>
                                <span className='text-gray-600'>유미</span>
                                <span className='text-gray-400'>2023. 11. 11</span>
                            </div>
                    </div>
                </div>

                <div className="m-[20px] border relative flex flex-col w-[550px] p-[5px] rounded-md shadow-lg">
                        <div className="w-full h-[100px] rounded-tr-[15px] rounded-tl-[15px] flex justify-between items-center p-[7px]">
                            <div className="flex justify-between item-center">
                                <div className="w-[65px] h-[65px] rouned-[7px] flex justify-center items-center">
                                    <img src="/kkomul.png" />
                                </div>
                                <div className="flex justify-center items-center">
                                    <p className='flex justify-center items-center relative rounded-md bg-white ml-[20px] py-2 px-4 shadow-lg text-sm after:content-[""] after:absolute after:w-0 after:h-0 after:top-[50%] after:left-[-10px] after:translate-y-[-50%] after:border-[12px] after:border-t-[transparent] after:border-b-[transparent] after:border-l-0 after:border-r-white'>
                                        저도 빗소리를 들으면 마음이 안정돼요.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col p-[3px] self-start">
                                <div className='self-end mb-[5px]'>
                                    <span className='py-[5px] px-[7px] text-[10pt] bg-amber-300 text-white rounded-md mx-[5px] cursor-pointer opacity-80 hover:opacity-100'>수정</span>
                                    <span className='py-[5px] px-[7px] text-[10pt] bg-red-700 text-white rounded-md mx-[5px] cursor-pointer opacity-80 hover:opacity-100'>삭제</span>
                                </div>
                                <span className='text-[11pt]'>
                                    2023. 11. 04 07:59
                                </span>
                            </div>
                        </div>
                        <div className="relative w-full p-[10px] flex flex-col items-center">
                            <div className="shadow-lg relative flex flex-col justify-between items-center w-[300px] h-[300px] bg-[lightgray] mb-[20px] p-[10px]">
                                <div className='absolute w-[40px] h-[40px] rounded-md top-[-10px] left-[-10px]'>
                                    <img src='./heart.png' className='h-full'/>
                                </div>
                                <div className="w-full h-[240px] bg-white overflow-hidden object-cover">
                                    <img src="./rain.png" alt="" className='w-full h-full'/>
                                </div>
                                <div className="flex justify-center items-center">
                                    <span>
                                        비가 내리면 시.
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center p-[20px]">
                                <p className="text-[16pt] font-bold mb-[20px] self-start">
                                    오늘은 비가 왔다.
                                </p>
                                <p>
                                    비가 내리면 마asdfasdfasdfdsafsad음에 휴식이 찾아와서 나는 비 오는...
                                </p>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
};

export default Diary;