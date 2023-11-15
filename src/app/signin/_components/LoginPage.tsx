'use client'

import type { NextPage } from 'next'
import { useRef, useState } from 'react'
import { signIn } from 'next-auth/react'
import React from 'react'

import {Input} from "@nextui-org/react";
import {Button} from "@nextui-org/react";


const Login: NextPage = () => {
  // useRef로 아이디랑, 비밀번호 값 가져오기.
  const idRef = useRef<HTMLInputElement>(null)
  const pwRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState('')

  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  // const router = useRouter();  // 추가된 부분: 페이지 이동을 위한 useRouter
  // axios post 방식으로 전달해 주기 => 주소: http://localhost:3000/api/login , {username: id, password: password}
  const handleLogin = async () => {
    const result = await signIn('credentials', {
      username: idRef.current?.value,
      password: pwRef.current?.value,
      redirect: false,
      callbackUrl: '/',
    })

    if (result?.error == '비밀번호가 일치하지 않습니다.') {
      // 비밀번호 일치하지 않았을 때 보여줄 것.
      setError('비밀번호가 일치하지 않습니다.')
    } else if (result?.error == '아이디가 없습니다.') {
      // 사용자를 찾을 수 없는 경우
      setError('아이디가 없습니다.')
    } else {
      setError('로그인 완료')
    }
  }

  // 로그인이 성공하면 알아서 홈으로 이동됨.

  // id: test1 pw: 1234
  
  return (
    <div className="mt-10 flex h-screen w-screen flex-col items-center">
      <div className=" p-10 text-2xl font-bold">
        <span>Relu molu</span>
      </div>
      <div className="flex w-64 flex-col  p-2 pt-0">
        <span className="p-1 text-sm font-normal">아이디</span>
        <Input
         isRequired
         type="text"
         label="Email"
         defaultValue="junior@nextui.org"
         className="max-w-xs"
         ref={idRef}
         value={id}
         onChange={(e) => setId(e.target.value)}
         />
      </div>
      <div className="flex w-64 flex-col  p-2 pt-0">
        <span className="p-1 text-sm font-normal">비밀번호</span>
        <Input
        isRequired
         type="password"
         label="Password"
         defaultValue="junior@nextui.org"
         className="max-w-xs"
         ref={pwRef}
         value={password}
         onChange={(e) => setPassword(e.target.value)}>
      
         </Input>
      </div>
      <div className="mt-5 flex items-center   justify-center ">
        <button
          onClick={handleLogin}
          className=" h-10 w-64 rounded-xl bg-gray-300 text-sm font-medium text-white" color="success"
        >
          로그인
        </button>
      </div>
      {error && <div className="text-red-500 mt-2 text-center">{error}</div>}

      <div className="mt-6 flex flex-col items-center justify-center">
        <span className="text-sm"></span>
        <span className="text-sm">아이디 찾기  비밀번호 찾기</span>
      </div>
      <div>
        <div className="mt-6">
          <img
            src="/kakao_login_medium_narrow.png" // 이미지 파일의 경로를 지정해야 합니다.
            alt="kakao 로그인 이미지"
            className="max-w-full h-auto mx-auto"
          />
        </div>
        <div className="mb-1">
          <img
            src="/naver.btnG_완성형.png" // 이미지 파일의 경로를 지정해야 합니다.
            alt="naver 로그인 이미지"
            className="w-47 h-12 mx-auto"
          />
        </div>
        <div className="mt-1">
          <img
            src="/android_light_sq_SI@1x.png" // 이미지 파일의 경로를 지정해야 합니다.
            alt="구글 로그인 이미지"
            className="max-w-full h-auto mx-auto"
          />
        </div>
      </div>
    </div>
  )
}

export default Login
