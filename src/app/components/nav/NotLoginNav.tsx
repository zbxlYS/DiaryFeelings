'use client'

import { useTheme } from 'next-themes'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
const NotLoginNav = ({ isLogin }: any) => {
    const { systemTheme, theme, setTheme } = useTheme() // 다크모드테마 설정
    const currentTheme = theme === 'system' ? systemTheme : theme
    return (
        <div className="flex w-full h-[60px] justify-between items-center z-10 flex-[none] shadow-lg dark:bg-[#474747]">
            <div className="flex justify-center items-center">
                <Link href="/" className="ml-[60px]">
                    <div className="w-[120px] h-[50px] mr-[60px] mt-5 main-light">
                        <img src='/Gamgi.svg' alt='logo' />
                    </div>
                    <div className="w-[120px] h-[50px] mr-[60px] mt-5 main-dark">
                        <img src='/GamgiDark.svg' alt='logo' />
                    </div>
                </Link>
            </div>
            <div className='flex justify-center items-center pr-[30px]'>
                <Link href="/signin">
                    <span className="hover:text-[#b2a4d4]">로그인</span>
                </Link>
                <span className='mx-[20px]'>|</span>
                <Link href="/join">
                    <span className="px-[10px] py-[7px] rounded-md mr-[60px] text-white bg-[#b2a4d4]">
                        감정 기록 시작하기
                    </span>
                </Link>
                <div className='relative flex justify-center items-center'>
                    <button
                        type="button"
                        className={
                            !isLogin
                                ? `w-10 h-10`
                                : `w-10 h-10`
                        }
                        onClick={() => {
                            setTheme(currentTheme === 'dark' ? 'light' : 'dark')
                        }}
                    >
                        {currentTheme === 'dark' ? (
                            <>
                                <Image
                                    src="/sun.svg"
                                    alt="Sun Logo"
                                    className="w-[35px] hover:opacity-60 transition duration-300 hover:bg-purple-500 rounded-full"
                                    width={40}
                                    height={40}
                                    priority
                                />
                            </>
                        ) : (
                            <Image
                                src="/dark.svg"
                                alt="Dark Logo"
                                className="w-[35px] pl-[3px] pt-1 pb-1  opacity-70 hover:opacity-50 transition duration-300 hover:bg-purple/50 rounded-full"
                                width={50}
                                height={50}
                                priority
                            />
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NotLoginNav