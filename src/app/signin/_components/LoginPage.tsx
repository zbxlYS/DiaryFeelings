'use client'

import type { NextPage } from 'next'
import { useRef, useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import React from 'react'

import {Input} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import { useRouter } from 'next/navigation'
import styles from './styles.module.css'



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
  
  
  useEffect(() => {
    // 컴포넌트가 마운트되었을 때 스크롤을 숨깁니다.
    document.body.style.overflow = 'hidden';
    // 컴포넌트가 언마운트되었을 때 스크롤을 다시 보여줍니다.
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 합니다.
  
  
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
  const handleJoin = () => {
     router.push('/join')

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

    <div className="container mx-auto h-[700px] flex flex-col items-center justify-center">
      <div className="flex w-[270px] flex-col  p-2 pt-0"  >
        <div className="mb-4 text-[3rem]">
          Relu molu
        </div>
       
        <Input
         isRequired
         type="text"
         label="아이디"
         defaultValue="junior@nextui.org"
         className="w-full max-w-md py-2"
         ref={idRef}
         value={id}
         onChange={(e) => setId(e.target.value)}
         />
      </div>
      <div className="flex w-[270px] flex-col  p-2 pt-0">
       
    <Input
        isRequired
         type="password"
         label="패스워드"
         defaultValue="junior@nextui.org"
         className="w-full max-w-md py-2"
         ref={pwRef}
         value={password}
         onChange={(e) => setPassword(e.target.value)}>
    </Input>
      </div>
      <div className=" mt-3  flex items-center   justify-center ">
        <button
          onClick={handleLogin}
          className="h-10 w-64 rounded-xl bg-gray-300 text-lg font-medium text-white transition-colors duration-300 ease-in-out hover:bg-gray-400" 
        >
          로그인
        </button>
      </div>
      {error && <div className="text-red-500 mt-2 text-center">{error}</div>}

      <div className="flex justify-center">
            <hr className="w-[7rem] text-[#888] mt-3 mr-2" />
            <span className="text-[#888]">or</span>
            <hr className="w-[7rem] text-[#888] mt-3 ml-2" />
      </div>
      <div>
      <button
      onClick={handleJoin}
      className="h-10 w-64 rounded-xl bg-gray-300 text-lg font-medium text-white transition-colors duration-300 ease-in-out hover:bg-gray-400">
       회원가입
      </button>
     </div>
     <div className="mt-3 flex flex-col items-center justify-center">
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

<div className="mt-6 flex flex-row items-center justify-between">
 
    <button onClick={handleKakao} className={` ${styles['login-button']}`}>
      <img
        src="/KakaoTalk_20231115_161719853_03.png"
        alt="카카오 로그인 이미지"
      />
    </button>
    <div className="w-4"></div>
    <button onClick={handleNaver} className={`${styles['login-button']}`}>
      <img
        src="/naver.btn_아이콘원형.png"
        alt="네이버 로그인 이미지"
      />
    </button>
     
    <div className="w-4"></div>
    <button onClick={handleGoogle} className={`${styles['login-button']}`}>
      <img
        src="/google.btn.png"
        alt="구글 로그인 이미지"
      />
    </button>

  </div>
</div>  
  )
}

export default Login