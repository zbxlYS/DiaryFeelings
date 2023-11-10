"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface SearchComponentProps {
  className?: string;
}

const Nav: React.FC<SearchComponentProps> = () => {
  // 로그인시 네비 상단바 변경
  const { data: session } = useSession();
  const [isLogin, SetIsLogin] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    // 초기 렌더링 시 테마를 라이트 모드로 설정
    if (currentTheme !== "light") {
      setTheme("light");
    }
  }, []); // 빈 배열을 사용하여 초기 렌더링 시 한 번만 실행

  useEffect(() => {
    if (session?.accessToken) {
      SetIsLogin(true);
    } else {
      SetIsLogin(false);
    }
  }, [session]);

  return (
    <div className="">
      <nav className="w-[100%] h-[65px] relative ">
        <div className="w-[100%] h-[66px] left-0 top-0 absolute bg-white dark:bg-[#24272F] border-b border-slate-200 dark:border-b-0" />
        {/* 회원가입 페이지 버튼  */}

        {!isLogin ? (
          <>
            {" "}
            <Link href="/join">
              <button>
                <div className="w-[110px] h-[25px] right-[1rem] top-[23px] absolute text-center text-black dark:text-[#F6F7F9] text-base font-normal font-['Pretendard']">
                  회원가입
                </div>
              </button>
            </Link>
            <Link href="/api/auth/signin">
              <button>
                <div className="right-[7.5rem] top-[23px] absolute text-center text-black dark:text-white text-base font-normal">
                  로그인{" "}
                </div>
              </button>
            </Link>
          </>
        ) : (
          <button className="w-10 h-10 right-[1.5rem] top-[14.5px] absolute border rounded-full">
            <Image
              src="/mypage.svg"
              alt="Mypage Logo"
              className="ml-[4px] opacity-80 hover:opacity-80 transition duration-300 "
              width={30}
              height={50}
              priority
            />
          </button>
        )}
        {/* 버튼 클릭시 회원가입 페이지로 전환  */}

        <button
          type="button"
          className={
            !isLogin
              ? `w-10 h-10 right-[11.5rem] top-[15px] absolute hover:bg-violet-100 rounded-full`
              : `w-10 h-10 right-[5rem] top-[15px] absolute hover:bg-violet-100 rounded-full`
          }
          onClick={() => {
            setTheme(currentTheme === "dark" ? "light" : "dark");
          }}
        >
          {currentTheme === "dark" ? (
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
              className="w-[35px] opacity-70 hover:opacity-60 transition duration-300"
              width={50}
              height={40}
              priority
            />
          )}
        </button>

        {/* 로그인 버튼  */}
        {/* 버튼 클릭시 로그인페이지로 전환  */}

        <div className="flex justify-center items-center self-center w-[40%] max-w-2xl h-[37px] left-[9rem] bottom-[0.7rem] absolute border-y-2 rounded-full hover:border-gray-300 focus-within:border-gray-300  dark:border-[#9BA3AF]">
          <Image
            src="/search.svg"
            alt="Search Logo"
            className="left-[0.5rem]  absolute"
            width={23}
            height={40}
            priority
          />
          <input
            type="text"
            placeholder="일기검색 . . ."
            className="absolute w-[70%] left-[3rem] mt-[2px] border-none outline-none dark:bg-[#24272F]"
          />
        </div>
        <div className="left-[21px] top-[17px] absolute text-black dark:text-white text-xl font-normal relu-font">
          Relu Molu
        </div>
      </nav>
    </div>
  );
};

export default Nav;
