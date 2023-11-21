'use client'

import { useState } from "react"

const NotLoginMain = () => {
    const [hover, setHover] = useState('first');
    return (
        <div className="w-full flex flex-col justify-center items-center pt-[150px] pb-[150px]">
            <div className="flex flex-col justify-center items-center">
                <span className="text-[60px] font-bold">
                    하루를 기록하는 일기
                </span>
                <span className="text-lg">
                    당신의 감정을 기록하고, 되돌아 보세요.
                </span>
                <span className="mt-[50px] text-[30px] px-[24px] py-[12px] border rounded-md text-white bg-[#b2a4d4] cursor-pointer">
                    내 감정을 기록하기
                </span>
            </div>
            <div className="flex flex-col w-full justify-center items-center mt-[100px]">
                <div className="border w-[1000px] h-[300px]">
                    그림
                </div>
                <div className="flex justify-center items-center w-full">
                    <div className="flex items-center p-[60px]">
                        <div className={`flex flex-col justify-center items-start p-[20px] rounded-md border cursor-pointer duration-200 ${hover === 'first' ? 'bg-white shadow-2xl' : 'bg-gray-100 shadow-lg'}`}
                            onMouseOver={() => setHover('first')}
                        >
                            <div className="flex justify-center items-center mb-[15px]">
                                <div className="w-[25px] h-[25px] border rounded-md bg-[#b2a4d4]">

                                </div>
                                <span className="text-[20px] ml-[10px] font-bold">일기 작성하기</span>
                            </div>
                            <span>오늘 하루 있었던 일을 기록해 보세요.</span>
                        </div>
                    </div>
                    <div className="flex justify-center items-center p-[60px]">
                        <div className={`flex flex-col justify-center items-start p-[20px] rounded-md border cursor-pointer duration-200 ${hover === 'second' ? 'bg-white shadow-2xl' : 'bg-gray-100 shadow-lg'}`}
                            onMouseOver={() => setHover('second')}
                        >
                            <div className="flex justify-center items-center mb-[15px]">
                                <div className="w-[25px] h-[25px] border rounded-md bg-[#b2a4d4]">

                                </div>
                                <span className="text-[20px] ml-[10px] font-bold">나에게 한 마디</span>
                            </div>
                            <span>AI가 해주는 한 마디, 위로가 될지도요.</span>
                        </div>
                    </div>
                    <div className="flex justify-center items-center p-[60px]">
                        <div className={`flex flex-col justify-center items-start p-[20px] rounded-md border cursor-pointer duration-200 ${hover === 'third' ? 'bg-white shadow-2xl' : 'bg-gray-100 shadow-lg'}`}
                            onMouseOver={() => setHover('third')}
                        >
                            <div className="flex justify-center items-center mb-[15px]">
                                <div className="w-[25px] h-[25px] border rounded-md bg-[#b2a4d4]">

                                </div>
                                <span className="text-[20px] ml-[10px] font-bold">달력 보기</span>
                            </div>
                            <span>그동안 써왔던 일기를 달력으로 한눈에 볼 수 있어요.</span>
                        </div>
                    </div>
                    <div className="flex justify-center items-center p-[60px]">
                        <div className={`flex flex-col justify-center items-start p-[20px] rounded-md border cursor-pointer duration-200 ${hover === 'fourth' ? 'bg-white shadow-2xl' : 'bg-gray-100 shadow-lg'}`}
                            onMouseOver={() => setHover('fourth')}
                        >
                            <div className="flex justify-center items-center mb-[15px]">
                                <div className="w-[25px] h-[25px] border rounded-md bg-[#b2a4d4]">

                                </div>
                                <span className="text-[20px] ml-[10px] font-bold">감정 그래프</span>
                            </div>
                            <span>내 감정 변화를 확인해 볼 수도 있죠.</span>
                        </div>
                    </div>
                </div>
                <div className="w-[1400px] h-[300px] border border-[tomato] mt-[50px]">
                    페이지 이용하는 걸 이미지로 보여주면 될 듯.
                </div>
                <div className="w-full flex justify-center items-center mt-[200px]">
                    <span className="mt-[50px] text-[30px] px-[24px] py-[12px] border rounded-md text-white bg-[#b2a4d4] cursor-pointer">
                        감정을 기록하러 가볼까요?
                    </span>
                </div>
            </div>
        </div>
    )
}

export default NotLoginMain