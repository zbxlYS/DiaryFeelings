'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import React from 'react'

import { Input } from "@nextui-org/react";
import { useRouter } from 'next/navigation'

const Login = () => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async () => {

    if(id.length === 0) {
      alert('아이디를 입력해주세요.')
      return
    }
    if(password.length === 0) {
      alert('패스워드를 입력해주세요.')
      return
    }
    const result = await signIn('credentials', {
      username: id,
      password: password,
      redirect: false,
      callbackUrl: '/',
    })

    if (result?.error == 'wrong password') {
      // 비밀번호 일치하지 않았을 때 보여줄 것.
      setError('비밀번호가 틀렸어요.')
    } else if (result?.error === 'No user') {
      // 사용자를 찾을 수 없는 경우
      setError('없는 아이디예요.')
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
  return (
    <div className="flex flex-col items-center justify-center border rounded-md p-[60px] shadow-lg">
      <div className="flex w-64 flex-col p-2 pt-0 justify-center">
        <div className="">
          
        </div>
        <span className="p-1 text-lg font-normal">아이디</span>
        <Input
         type="text"
         className="max-w-xs"
         value={id}
         onChange={(e) => setId(e.target.value)}
         />
      </div>
      <div className="flex w-64 flex-col  p-2 pt-0">
        <span className="p-1 text-lg font-normal">비밀번호</span>
    <Input
         type="password"
         className="max-w-xs"
         value={password}
         onChange={(e) => setPassword(e.target.value)}>
    </Input>
      </div>
      <div className="mt-5 flex items-center justify-center ">
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
            src="/sign/kakao.png"
            alt="kakao 로그인 이미지"
            className="w-47 h-12 mx-auto"
          />
          </button>
       
        <button onClick={handleNaver}  className="mx-2">
          <img
            src="/sign/naver.png"
            alt="naver 로그인 이미지"
            className="w-47 h-12 mx-auto"
          />
          </button>
       
       
        <button onClick={handleGoogle} className="mx-2" >
          <img
            src="/sign/google.png"
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
