'use client'

import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import MypageModal from './MypageModal'

interface SearchComponentProps {
  className?: string
}

const Nav: React.FC<SearchComponentProps> = () => {
  // 로그인시 네비 상단바 변경
  const { data: session } = useSession()
  const [isLogin, SetIsLogin] = useState<boolean>(false)
  // 마이페이지 모달창
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme

  const handleButtonClick = () => {
    setIsModalOpen(!isModalOpen)
    console.log('isModalOpen', isModalOpen)
  }

  useEffect(() => {
    // 초기 렌더링 시 테마를 라이트 모드로 설정
    if (currentTheme !== 'light') {
      setTheme('light')
    }
  }, []) // 빈 배열을 사용하여 초기 렌더링 시 한 번만 실행

  useEffect(() => {
    if (session?.accessToken) {
      SetIsLogin(true)
    } else {
      SetIsLogin(false)
    }
  }, [session])

  return (
    <div className=" flex justify-center items-center w-full">
      <nav
        className={`w-[100%] h-[65px] relative 
        `}
      >
        <div className="w-[100%] h-[66px] left-0 top-0 absolute bg-[#fff9] dark:bg-[#24272F] border-b border-slate-200 dark:border-b-0" />
        {/* =====================
            로그인 회원가입 버튼
            =====================
        */}
        {!isLogin ? (
          <>
            {' '}
            <Link href="/join">
              <button>
                <div className="w-[110px] h-[25px] right-[1rem] top-[23px] absolute text-center text-black dark:text-[#F6F7F9] text-base font-normal font-['Pretendard']">
                  <span className="text-slate-500 hover:text-slate-900">
                    회원가입
                  </span>
                </div>
              </button>
            </Link>
            <Link href="/api/auth/signin">
              <button>
                <div className="right-[7.5rem] top-[23px] absolute text-center text-black dark:text-white text-base font-normal ">
                  <span className="text-slate-500 hover:text-slate-900">
                    로그인
                  </span>
                </div>
              </button>
            </Link>
          </>
        ) : (
          // 로그인 성공시 마이페이지 아이콘 생성
          <>
            <button
              className="w-10 h-10 right-[1.5rem] top-[14.5px] absolute border rounded-full hover:bg-slate-100 "
              onClick={handleButtonClick}
            >
              <Image
                src="/mypage.svg"
                alt="Mypage Logo"
                className="ml-[4px] opacity-80 hover:opacity-80 transition duration-300 "
                width={30}
                height={30}
                priority
              />
            </button>

            {isModalOpen && (
              // 모달 컴포넌트 렌더링 컴포넌트로 뺼껀지??
              <>
                {/* Overlay */}
                <div
                  className="fixed inset-0 bg-black opacity-10 z-40"
                  onClick={handleButtonClick} // Close the modal on overlay click
                ></div>
                {/* Modal */}
                <div
                  className={`fixed w-[20rem] h-auto top-0 right-0 p-5 mt-2 bg-white border shadow-md z-50 rounded-l-xl animate-slidein 
                  `}
                >
                  {/* Modal content */}
                  <div>
                    <MypageModal closeModal={handleButtonClick}></MypageModal>
                  </div>
                </div>
              </>
            )}
          </>
        )}
        {/* 로그인시 일기쓰기 버튼생성  */}

        {isLogin ? (
          <>
            <Link href="/write" className="absolute right-[11rem] top-[22px] ">
              <span className="text-slate-500 hover:text-slate-900">
                일기쓰기
              </span>
            </Link>
            <Link href="/diary" className="absolute right-[16.5rem] top-[22px]">
              <span className="text-slate-500 hover:text-slate-900">기록</span>
            </Link>

            <div className="absolute right-[9rem] top-5 h-7 border-inherit border-r"></div>
          </>
        ) : (
          ''
        )}

        {/* 다크모드 변경모드  */}
        <button
          type="button"
          className={
            !isLogin
              ? `w-10 h-10 right-[11.5rem] top-[15px] absolute hover:bg-violet-100 rounded-full`
              : `w-10 h-10 right-[5rem] top-[15px] absolute hover:bg-slate-100 rounded-full`
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
                className="opacity-100 hover:opacity-60 transition duration-300 "
                width={100}
                height={50}
                priority
              />
            </>
          ) : (
            <Image
              src="/dark.svg"
              alt="Dark Logo"
              className="w-[35px] pl-[5px] opacity-70 hover:opacity-60 transition duration-300"
              width={50}
              height={40}
              priority
            />
          )}
        </button>

        {/* 검색창  */}
        <div className="flex justify-center items-center self-center w-[30%] max-w-2xl h-[37px] left-[9rem] bottom-[0.7rem] absolute shadow hover:shadow-md focus-within:shadow-md border-inherit rounded-full dark:border-[#9BA3AF] ">
          <Image
            src="/search.svg"
            alt="Search Logo"
            className="left-[0.5rem] absolute stroke-slate-600"
            width={23}
            height={23}
            priority
          />
          <input
            type="text"
            placeholder="일기검색 . . ."
            className="absolute w-[90%] max-w-[60%] h-full left-[3rem] mt-[0px] border-none outline-none dark:bg-[#24272F]"
          />
        </div>
        <div className="left-[21px] top-[17px] absolute text-black dark:text-white text-xl font-normal relu-font">
          Relu Molu
        </div>
      </nav>
    </div>
  )
}

export default Nav
