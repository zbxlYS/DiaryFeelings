'use client'

import type { NextPage } from 'next'
import { useRef, useState } from 'react'
import { signIn } from 'next-auth/react'
import React from 'react'

import {Input} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import { useRouter } from 'next/navigation'




const Login: NextPage = () => {
  // useRef로 아이디랑, 비밀번호 값 가져오기.
  const idRef = useRef<HTMLInputElement>(null)
  const pwRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState('')

  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  // const router = useRouter();  // 추가된 부분: 페이지 이동을 위한 useRouter
  // axios post 방식으로 전달해 주기 => 주소: http://localhost:3000/api/login , {username: id, password: password}
  
  
  
  
  const handleLogin = async () => {

    if(idRef.current?.value.length === 0) {
      alert('아이디를 입력해주세요.')
      return
    }
    if(pwRef.current?.value.length === 0) {
      alert('패스워드를 입력해주세요.')
      return
    }
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
      router.push('/')
    }
  }

  const handleFindId = () => {
    // 아이디 찾기 로직 추가
    alert('아이디 찾기 기능이 추가되었습니다.');
  };

  const handleFindPassword = () => {
    // 비밀번호 찾기 로직 추가
    alert('비밀번호 찾기 기능이 추가되었습니다.');
  };

const handleKakao = async () => {
  try {
    const result = await signIn('kakao', {
      redirect: true,
      callbackUrl: '/',
    });

    // 성공적으로 소셜 로그인을 수행하면 result에 로그인 정보가 담깁니다.
    console.log('Kakao Login Result:', result);
  } catch (error) {
    // 소셜 로그인 실패 시 에러를 처리합니다.
    console.error('Kakao Login Error:', error);
  }
};

const handleGoogle = async () => {
  try {
    const result = await signIn('google', {
      redirect: true,
      callbackUrl: '/',
    });
    console.log('Google Login Result:', result);
  } catch (error) {
    console.error('Google Login Error:', error);
  }
};
const handleNaver = () => {
  // 네이버 로그인 처리 로직 추가
};

  // 로그인이 성공하면 알아서 홈으로 이동됨.

  // id: test1 pw: 1234
  
  return (
    <div className="container mx-auto h-screen flex flex-col items-center justify-center">
      <div className="flex w-64 flex-col  p-2 pt-0">
        <div className="relu-font">
          Relu molu
        </div>
        <span className="p-1 text-lg font-normal">아이디</span>
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
        <span className="p-1 text-lg font-normal">비밀번호</span>
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
          className="h-10 w-64 rounded-xl bg-gray-300 text-lg font-medium text-white transition-colors duration-300 ease-in-out hover:bg-gray-400" 
        >
          로그인
        </button>
      </div>
      {error && <div className="text-red-500 mt-2 text-center">{error}</div>}

<div className="mt-6 flex flex-col items-center justify-center">
  <span className="text-lg"></span>
  <span className="text-lg">
    <button onClick={handleFindId} className="text-blue-500">
      아이디 찾기
    </button>
    &nbsp;&nbsp;
    <button onClick={handleFindPassword} className="text-blue-500">
      비밀번호 찾기
    </button>
  </span>
</div>
<div className="mt-6 flex flex-col items-center justify-between">
      <div>
          <button onClick={handleKakao} className="mx-2">
          <img
            src="\KakaoTalk_20231115_161719853_03.png" // 이미지 파일의 경로를 지정해야 합니다.
            alt="kakao 로그인 이미지"
            className="w-47 h-12 mx-auto"
          />
          </button>
       
        <button onClick={handleNaver}  className="mx-2">
          <img
            src="\naver.btn_아이콘원형.png" // 이미지 파일의 경로를 지정해야 합니다.
            alt="naver 로그인 이미지"
            className="w-47 h-12 mx-auto"
          />
          </button>
       
       
        <button onClick={handleGoogle} className="mx-2" >
          <img
            src="\google.btn.png" // 이미지 파일의 경로를 지정해야 합니다.
            alt="구글 로그인 이미지"
            className="w-47 h-12 mx-auto"
          />
        </button>  
        </div>
      </div>
    </div>  
  )
}

export default Login
