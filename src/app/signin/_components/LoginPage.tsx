"use client";

import type { NextPage } from "next";
import { useRef } from "react";
const Login: NextPage = () => {
  // useRef로 아이디랑, 비밀번호 값 가져오기.
  // axios post 방식으로 전달해 주기 => 주소: http://localhost:3000/api/login , {username: id, password: password}
  // no user나 wrong password => 로그인 실패

  // 로그인이 성공하면 알아서 홈으로 이동됨.

  // id: test1 pw: 1234
  return (
    <div className="mt-10 flex h-screen w-screen flex-col items-center">
      <div className=" p-10 text-2xl font-bold">
        <span>Relu molu</span>
      </div>
      <div className="flex w-64 flex-col  p-2 pt-0">
        <span className="p-1 text-sm font-normal">아이디</span>
        <input className="border-2" type="text"></input>
      </div>
      <div className="flex w-64 flex-col  p-2 pt-0">
        <span className="p-1 text-sm font-normal">비밀번호</span>
        <input className="border-2" type="text"></input>
      </div>
      <div className="mt-5 flex items-center   justify-center ">
        <button className=" h-10 w-64 rounded-xl bg-gray-300 text-sm font-medium text-white">
          로그인
        </button>
      </div>
      <div className="mt-6 flex flex-col items-center justify-center">
        <span className="text-sm"></span>
        <span className="text-sm">Relumolu@googlo.com</span>
      </div>
    </div>
  );
};

export default Login;
