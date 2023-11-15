'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRef, useState } from 'react'
import axios from 'axios'
import LoginPage from './_components/LoginPage'

const Login = () => {
  // useRef로 아이디랑, 비밀번호 값 가져오기.
  const idRef = useRef<HTMLInputElement>(null)
  const pwRef = useRef<HTMLInputElement>(null)
  // axios post 방식으로 전달해 주기 => 주소: http://localhost:3000/api/login , {username: id, password: password}
  const handleLogin = async () => {
    console.log('aaaa')
    const result = await signIn('credentials', {
      username: idRef.current?.value,
      password: pwRef.current?.value,
      redirect: false,
      callbackUrl: '/',
    })

    console.log(result?.error)
  }

  // 로그인이 성공하면 알아서 홈으로 이동됨.

  // id: test1 pw: 1234

  return (
    <LoginPage />
    // <div className="mt-10 flex h-screen w-screen flex-col items-center">
    //   <div className=" p-10 text-2xl font-bold">
    //     <span>Relu molu</span>
    //   </div>
    //   <div className="flex w-64 flex-col  p-2 pt-0">
    //     <span className="p-1 text-sm font-normal">아이디</span>
    //     <input className="border-2" type="text" ref={idRef}></input>
    //   </div>
    //   <div className="flex w-64 flex-col  p-2 pt-0">
    //     <span className="p-1 text-sm font-normal">비밀번호</span>
    //     <input className="border-2" type="text" ref={pwRef}></input>
    //   </div>
    //   <div className="mt-5 flex items-center   justify-center ">
    //     <button onClick={handleLogin} className=" h-10 w-64 rounded-xl bg-gray-300 text-sm font-medium text-white">
    //       로그인
    //     </button>
    //   </div>
    //   <div className="mt-6 flex flex-col items-center justify-center">
    //     <span className="text-sm">
    //     </span>
    //     <span className="text-sm">Relumolu@google.com</span>
    //   </div>
    //   <div>
    //   <div className="mt-6">
    //     <img
    //       src="/kakao_login_medium_narrow.png"  // 이미지 파일의 경로를 지정해야 합니다.
    //       alt="kakao 로그인 이미지"
    //       className="max-w-full h-auto mx-auto"
    //     />
    //   </div>
    //   <div className="mb-1">
    //     <img
    //       src="/naver.btnG_완성형.png"  // 이미지 파일의 경로를 지정해야 합니다.
    //       alt="naver 로그인 이미지"
    //       className="w-47 h-12 mx-auto"
    //     />
    //   </div>
    //   <div className="mt-1">
    //     <img
    //       src="/android_light_sq_SI@1x.png"  // 이미지 파일의 경로를 지정해야 합니다.
    //       alt="구글 로그인 이미지"
    //       className="max-w-full h-auto mx-auto"
    //     />
    //   </div>

    //   </div>
    // </div>
  )
}

export default Login
