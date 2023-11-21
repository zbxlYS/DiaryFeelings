'use client'

import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import MypageModal from './MypageModal'
import { useRecoilState } from 'recoil'
import { userInfo } from '@/app/lib/atoms/atom'

interface SearchComponentProps {
  className?: string
}

const Nav: React.FC<SearchComponentProps> = () => {
  const { data: session } = useSession()
  const [isLogin, SetIsLogin] = useState<boolean>(false) // 로그인시 네비 상단바 변경
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false) // 마이페이지 모달창
  const { systemTheme, theme, setTheme } = useTheme() // 다크모드테마 설정
  const currentTheme = theme === 'system' ? systemTheme : theme
  const [inputValue, setInputValue] = useState('') // 일기검색
  const [user, setUser] = useRecoilState(userInfo)

  // 로그인후 사용자 아이콘 클릭시 모달생성
  const handleButtonClick = () => {
    setIsModalOpen(!isModalOpen)
    // console.log('isModalOpen', isModalOpen)
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
      setUser({
        id: session.user?.id as string,
        name: session.user?.name as string,
        provider: session.user?.provider as string,
      })
    } else {
      SetIsLogin(false)
    }
  }, [session])

  return (
    <div className="w-full h-[67px] ">
      <div className="fixed w-full z-50">
        <nav
          className={` relative h-[65px]
        `}
        >
          <div className="w-[100%] h-[70px] left-0 top-0 absolute bg-[#fff9] dark:bg-black dark:bg-opacity-80 border-b border-slate-200 dark:border-b-0" />
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
                    <span className="text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100">
                      회원가입
                    </span>
                  </div>
                </button>
              </Link>
              <Link href="/api/auth/signin">
                <button>
                  <div className="right-[7.5rem] top-[23px] absolute text-center text-black dark:text-white text-base font-normal ">
                    <span className="text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100">
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
                className="w-10 h-10 right-[1.5rem] top-[14.5px] absolute border rounded-full hover:bg-slate-100 dark:border-slate-400 dark:hover:bg-slate-600"
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
                    className="fixed inset-0 bg-black opacity-50 z-40"
                    onClick={handleButtonClick} // Close the modal on overlay click
                  ></div>
                  {/* Modal */}
                  <div
                    className={`fixed w-[20rem] h-auto top-0 right-0 p-5 mt-2 bg-white border shadow-md z-50 rounded-l-xl animate-slidein 
                  `}
                  >
                    {/* Modal content */}
                    <div>
                      <MypageModal
                        closeModal={handleButtonClick}
                        user={user}
                      ></MypageModal>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
          {/* 로그인시 일기쓰기 버튼생성  */}

          {isLogin ? (
            <>
              <Link
                href="/write"
                className="absolute right-[11rem] top-[22px] "
              >
                <span className="text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100">
                  일기쓰기
                </span>
              </Link>
              <Link
                href="/diary?page=1"
                className="absolute right-[16.5rem] top-[22px] "
              >
                <span className="text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100">
                  기록
                </span>
              </Link>

              <div className="absolute right-[9rem] top-5 h-7 border-inherit border-r dark:border-slate-300"></div>
            </>
          ) : (
            ''
          )}

          {/* 다크모드 변경모드  */}
          <button
            type="button"
            className={
              !isLogin
                ? `w-10 h-10 right-[11.5rem] top-[15px] absolute `
                : `w-10 h-10 right-[5rem] top-[15px] absolute `
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
                  className="w-[35px]  hover:opacity-60 transition duration-300 hover:bg-slate-500 rounded-full"
                  width={40}
                  height={40}
                  priority
                />
              </>
            ) : (
              <Image
                src="/dark.svg"
                alt="Dark Logo"
                className="w-[35px] pl-[5px] opacity-70 hover:opacity-50 transition duration-300 hover:bg-slate-100 rounded-full"
                width={50}
                height={50}
                priority
              />
            )}
          </button>

          {/* 검색창  */}
          <div className="flex justify-center items-center self-center w-[30%] max-w-2xl h-[37px] left-[9rem] bottom-[0.7rem] absolute shadow hover:shadow-md focus-within:shadow-md  rounded-full bg-white dark:bg-[#171717] dark:shadow-slate-600">
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
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="absolute w-[90%] max-w-[60%] h-full left-[3rem] border-none outline-none dark:bg-[#171717] "
            ></input>
          </div>
          <div className="left-[21px] top-[17px] absolute text-black dark:text-white text-xl font-normal ">
            ReluMolu
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Nav
