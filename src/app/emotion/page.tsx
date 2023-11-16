'use client'

import React, { useState, useRef } from 'react'
import BarChart from './_components/BarChart'
import Snow from './_components/Snow'

interface typetest {
  classname?: string
}
const page: React.FC<typetest> = () => {
  return (
    <>
      <div className="flex justify-center mt-20 mb-[4rem] xl:text-4xl text-[3rem]">
        <Snow></Snow>
        <h1>0000님 감정그래프</h1>
      </div>
      <div className="flex justify-center items-center relative xl:flex-col">
        <div className="w-[44rem] xl:w-[48rem] xl:h-[32rem] h-[37rem] m-7 sm:m-8 bg-white opacity-90 rounded-xl shadow-xl">
          <BarChart></BarChart>
        </div>
        <div className="w-[44rem] xl:w-[48rem] xl:h-[32rem] h-[37rem] m-7 sm:m-8 bg-white opacity-90 rounded-xl shadow-xl"></div>
      </div>
    </>
  )
}

export default page
