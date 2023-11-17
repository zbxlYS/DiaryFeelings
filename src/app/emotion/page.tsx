'use client'

import React, { useState, useRef } from 'react'
import BarChart from './_components/BarChart'

import Snow from './_components/Snow'

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

  const categories = [
    <div className="w-[400px] h-[10rem] bg-white mb-10 rounded-md ml-5"></div>,
    <div className="w-[400px] h-[10rem] bg-white mb-10 rounded-md ml-5"></div>,
    <div className="w-[400px] h-[10rem] bg-white mb-10 rounded-md ml-5"></div>,
    <div className="w-[400px] h-[10rem] bg-white mb-10 rounded-md ml-5"></div>,
    <div className="w-[400px] h-[10rem] bg-white mb-10 rounded-md ml-5"></div>,
    <div className="w-[17rem] h-[10rem] bg-white mb-10 rounded-md ml-5"></div>,
  ]
  return (
    <>
      <Snow />
      <div className="flex justify-center mt-10 mb-[4rem] m-10">
        {/* 최근 작성한 일기  */}
        <div className="flex items-center flex-col ">
          <h1 className="mb-10">최근 작성한 일기</h1>
          <div
            className="flex flex-row overflow-x-auto overscroll-auto"
            style={{ maxWidth: '1000px' }}
          >
            {/* 여기에서 Carousel 컴포넌트를 사용합니다. */}

            {categories.map((item, index) => (
              <React.Fragment key={index}>{item}</React.Fragment>
            ))}
          </div>

          <div className="flex justify-center flex-col items-center relative xl:flex-col">
            <h1 className="mr-[46rem] xl:text-2xl text-[1.6rem]">
              0000님 감정기록
            </h1>
            <div className="w-[60rem] xl:w-[60rem] xl:h-[32rem] h-[37rem] m-20 sm:m-8 bg-white opacity-90 rounded-xl shadow-xl">
              <BarChart></BarChart>
            </div>

            <div className="w-[44rem] xl:w-[48rem] xl:h-[32rem] h-[37rem] m-20 sm:m-8 bg-white opacity-90 rounded-xl shadow-xl"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page
