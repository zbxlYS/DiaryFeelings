'use client'

import React, { useState, useRef } from 'react'
import BarChart from './_components/BarChart'

import Snow from './_components/Snow'
import { Avatar, Image } from '@nextui-org/react'

interface typetest {
  classname?: string
}
const page: React.FC<typetest> = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  }

  return (
    // <>
    //   <div className="flex justify-center  mt-10 mb-[4rem] m-10">
    //     {/* 최근 작성한 일기  */}
    //     <div className="flex items-center flex-col w-full ">
    //       <h1 className="mb-10">최근 작성한 일기</h1>
    //       <div
    //         className="flex flex-row  overflow-x-auto overscroll-auto"
    //         // style={{ maxWidth: '1000px' }}
    //       >
    //         {/* 여기에서 Carousel 컴포넌트를 사용합니다. */}

    //         <div className="w-[400px] h-[10rem] bg-white mb-10 rounded-md ml-5"></div>

    //         <div className="w-[400px] h-[10rem] bg-white mb-10 rounded-md ml-5"></div>

    //         <div className="w-[400px] h-[10rem] bg-white mb-10 rounded-md ml-5"></div>

    //         <div className="w-[400px] h-[10rem] bg-white mb-10 rounded-md ml-5"></div>

    //         <div className="w-[400px] h-[10rem] bg-white mb-10 rounded-md ml-5"></div>

    //         <div className="w-[17rem] h-[10rem] bg-white mb-10 rounded-md ml-5"></div>
    //       </div>
    //     </div>
    //     <div className=" flex justify-center flex-col items-center w-full  xl:flex-col ">
    //       <h1 className=" xl:text-2xl text-[1.6rem]">0000님 감정기록</h1>
    //       <div className=" flex justify-center  w-full ">
    //         {/* 사용자 정보  */}
    //         <div className="w-[20rem] h-[37rem] mt-20 ml-20  rounded-xl shadow-xl  bg-white opacity-90">
    //           <div className="flex flex-col gap-4 items-center m-5">
    //             <Avatar
    //               src="/yuumi.jpg"
    //               className="w-[10rem] h-[10rem] text-large"
    //             />
    //           </div>
    //         </div>
    //         {/* 막대그래프 차트 */}
    //         <div className=" w-full max-w-[72rem] xl:h-[32rem] h-[37rem] m-20 sm:m-8 bg-white opacity-90 rounded-xl shadow-xl">
    //           <BarChart></BarChart>
    //         </div>
    //       </div>
    //       {/* <div className="w-[44rem] xl:w-[48rem] xl:h-[32rem] h-[37rem] m-20 sm:m-8 bg-white opacity-90 rounded-xl shadow-xl"></div> */}
    //     </div>
    //   </div>
    // </>
    <div className="h-auto">
      {/* 일기목록 */}
      <div className="flex flex-col items-center ">
        <h1 className="w-auto flex justify-center ">최근작성한 일기</h1>
        <div className="w-5/6 flex flex-row justify-center overflow-x-scroll ">
          {/* 좌우로 슬라이드될 내용 */}
          <div className="w-[400px] h-[10rem] bg-white mb-10 rounded-md "></div>
        </div>
      </div>
      {/* 사용자 컨테이너*/}
      <div className="flex justify-center ">
        <div className="flex flex-row justify-center w-5/6">
          {/* 사용자 정보  */}
          <div className="w-2/12 min-w-[15rem] flex justify-center mr-10 bg-white opacity-90 rounded-xl shadow-xl">
            <Avatar
              src="/yuumi.jpg"
              className="w-[10rem] h-[10rem] text-large m-10"
            />
          </div>
          {/* 막대그래프 차트 */}
          <div className="w-8/12 h-[40rem] flex items-center justify-center   bg-white opacity-90 rounded-xl shadow-xl relative">
            <div className="absolute top-0 w-full h-[40rem]">
              <BarChart></BarChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
