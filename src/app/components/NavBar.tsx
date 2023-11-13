"use client";
import { useTheme } from "next-themes";
import React, { useEffect } from "react";
import Image from "next/image";
import Login from "./Login";
import Join from "./Join";
const NavBar: React.FC = () => {
  // systemTheme: 시스템 테마, theme: 현재 테마, setTheme: 테마 상태 변경
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  useEffect(() => {
    // 초기 렌더링 시 테마를 라이트 모드로 설정
    if (currentTheme !== "light") {
      setTheme("light");
    }
  }, []); // 빈 배열을 사용하여 초기 렌더링 시 한 번만 실행
  
  return (
    <>
      <nav className="w-[100%] h-[63px] relative ">
        <div className="w-[100%] h-[63px] left-0 top-0 absolute bg-white dark:bg-[#24272F] border-b border-slate-300 dark:border-b-0" />
        {/* 회원가입 페이지 버튼  */}
        <Join></Join>
        <button
          type="button"
          className="w-10 h-10 right-[13rem] top-[12px] absolute hover:bg-violet-100 rounded-full"
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
              className="opacity-100 hover:opacity-60 transition duration-300"
              width={100}
              height={50}
              priority
            />
          )}
        </button>
        {/* 로그인 버튼  */}
        <Login></Login>
        <div className="w-[188px] h-[55px] left-[21px] top-[17px] absolute text-black dark:text-white text-xl font-normal relu-font">
          Relu Molu
        </div>
      </nav>
    </>
  );
};

export default NavBar;
