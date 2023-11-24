'use client'

import { useTheme } from 'next-themes'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import MypageModal from './MypageModal'
import ModalCalendar from './Calendar'
import { useRouter, usePathname } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { userInfo, calState } from '../lib/atoms/atom'
import axios from 'axios'
import Snow from '../emotion/_components/Snow'

interface SearchComponentProps {
  className?: string
  src?: string
}

const Nav: React.FC<SearchComponentProps> = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [isLogin, SetIsLogin] = useState<boolean>(false) // 로그인시 네비 상단바 변경
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false) // 마이페이지 모달창
  const { systemTheme, theme, setTheme } = useTheme() // 다크모드테마 설정
  const currentTheme = theme === 'system' ? systemTheme : theme
  const [inputValue, setInputValue] = useState<string>('') // 일기검색
  const [user, setUser] = useRecoilState(userInfo)
  const [isCalendarOpen, setIsCalendarOpen] = useRecoilState(calState) //달력모달
  const [userImg, setUserImg] = useState<any>('') // 유저 이미지
  const [snowTheme, setSnowTheme] = useState<boolean>(false)

  const themeOnClick = () => {
    setSnowTheme(!snowTheme)
  }

  // 로그인후 사용자 아이콘 클릭시 모달생성
  const handleButtonClick = () => {
    setIsModalOpen(!isModalOpen)
    // console.log('isModalOpen', isModalOpen)
  }
  // console.log(userImg)
  /* Get Search Data from input tag */
  const getSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.toLowerCase())
  }

  /* Search Function */
  const onClickSearch = async (e: any) => {
    e.preventDefault()
    console.log('user', user.id, 'inputvalue', inputValue)
    router.push(`/search?keyword=${inputValue}&page=1`)
    setInputValue('')
  }
  // 현진 : 사용자 이미지 150번줄
  // image 로직있고 userImg = useState 쓰는중
  useEffect(() => {
    fetchData()
  }, [user.id])
  async function fetchData() {
    if (!user.id) return
    const response = await axios.get(`/api/emotion?userId=${user.id}`)
    const data = response.data
    console.log(data)
    if (response.status === 200) {
      // console.log(data.userImg)
      const img = data.userimg[0]?.user_image
        ? data.userimg[0].user_image
        : undefined
      setUserImg(img)
    }
  }

  //Calendar 모달
  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen)
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
  if (status === 'unauthenticated') {
    // 인증 안 됨(로그인 안 돼있을 때 보여줄 Nav)
    return (
      <div className="flex w-full h-[60px] border justify-between items-center z-10 flex-[none]">
        <div className="flex justify-center items-center">
          <Link href="/" className="ml-[60px]">
            <span className="px-[14px] py-[7px] rounded-md border mr-[60px]">
              감기
            </span>
          </Link>
          <div className="relative flex justify-center items-center bg-none">
            <Image
              src="/search.svg"
              alt="Search Logo"
              className="left-0 absolute stroke-slate-600 cursor-pointer searh-icon"
              width={23}
              height={23}
              priority
              onClick={onClickSearch}
            />
          </div>
        </div>
        <div>
          <Link href="/signin">
            <span className="hover:text-[#b2a4d4]">로그인</span>
          </Link>
            <span className='mx-[20px]'>|</span>
          <Link href="/join">
            <span className="px-[10px] py-[7px] rounded-md mr-[60px] text-white bg-[#b2a4d4]">
              감정을 기록하기
            </span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {snowTheme ? <Snow className="-z-50"></Snow> : ''}

      <div className="w-full h-[67px] ">
        <div className="fixed w-full z-50">
          <nav
            className={` relative h-[65px]
        `}
          >
            <div className="w-[100%] h-[70px] left-0 top-0 absolute bg-[#ffffffee] dark:bg-black dark:bg-opacity-80 border-b border-slate-200 dark:border-b-0" />
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
                  className="w-14 h-14 flex justify-center items-center absolute right-[3.7rem] top-2.5  border-purple/80 rounded-full hover:bg-purple/20 dark:border-slate-400 dark:hover:bg-slate-600"
                  onClick={handleButtonClick}
                >
                  <Image
                    src={
                      userImg === 'no image' ||
                      userImg === undefined ||
                      userImg === ''
                        ? '/3_love.png' // Fallback image path
                        : userImg
                    }
                    alt="Mypage Logo"
                    className=" opacity-90 hover:opacity-90 transition duration-300 rounded-full border"
                    width={48}
                    height={48}
                    quality={75}
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
                          userImg={userImg}
                          themeOnClick={themeOnClick}
                          snowTheme={snowTheme}
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
                {/* 일기쓰기 링크 */}
                <div className="absolute right-[15rem] top-[22px] ">
                  <Link href="/write">
                    <div
                      className={`active:border-b hover:border-b  hover:text-purple active:text-purple ${
                        pathname === '/write' ? 'text-purple border-b' : ''
                      }`}
                    >
                      <span className=" text-lg">일기 작성</span>
                    </div>
                  </Link>
                </div>

                {/* 달력 버튼 */}

                <div className="absolute right-[29.5rem] top-[22px]">
                  <button
                    onClick={toggleCalendar}
                    className={`active:border-b hover:border-b  hover:text-purple active:text-purple ${
                      isCalendarOpen ? 'border-b text-purple' : ''
                    }`}
                  >
                    <span className="text-lg " onClick={toggleCalendar}>
                      달력
                    </span>
                  </button>
                </div>

                {/* 모달 렌더링 */}
                {isCalendarOpen && (
                  <ModalCalendar
                    isOpen={isCalendarOpen}
                    closeModal={toggleCalendar}
                    setIsCalendarOpen={setIsCalendarOpen}
                  />
                )}
                <Link
                  href="/diary?page=1"
                  className="absolute right-[22.3rem] top-[22px] "
                >
                  <div
                    className={` active:border-b hover:border-b mb-4 hover:text-purple active:text-purple ${
                      pathname === '/diary' ? 'text-purple border-b' : ''
                    }`}
                  >
                    <span className="text-lg">일기 기록</span>
                  </div>
                </Link>

                <div className="absolute right-[12.5rem] top-6 h-7 border-black border-r dark:border-slate-300"></div>
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
                  : `w-10 h-10 right-[8.3rem] top-[18px] absolute `
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

            {/* 검색창 */}
            <div className="flex justify-center items-center self-center w-[20%] max-w-2xl h-[37px] left-[11rem] bottom-[0.7rem] absolute shadow hover:shadow-md focus-within:shadow-md  rounded-md bg-white dark:bg-[#171717] dark:shadow-slate-600 border hover:border-1 focus-within:border-1">
              <Image
                src="/search.svg"
                alt="Search Logo"
                className="left-[0.5rem] absolute stroke-slate-600 cursor-pointer"
                width={23}
                height={23}
                priority
                onClick={onClickSearch}
              />
              <input
                type="text"
                placeholder="일기 검색 . . ."
                value={inputValue}
                onChange={getSearchData}
                className="absolute w-[90%] max-w-[60%] h-full left-[3rem] border-none outline-none dark:bg-[#171717]"
              ></input>
            </div>
            <div className="left-[6rem] top-[19px] absolute text-black dark:text-white">
              <h1 className="text-xl">감기</h1>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Nav
