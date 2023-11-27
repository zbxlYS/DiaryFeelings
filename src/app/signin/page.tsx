'use client'

import { useRef, useState } from 'react'
import { signIn } from 'next-auth/react'
import React from 'react'

import { Input } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import styles from './_components/styles.module.css'

const Login = () => {
  // useRef로 아이디랑, 비밀번호 값 가져오기.
  const [error, setError] = useState('')
  const idRef = useRef<HTMLInputElement>(null)
  const pwRef = useRef<HTMLInputElement>(null)
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    if (!id) {
      alert('아이디를 입력해주세요.')
      return
    }
    if (!password) {
      alert('패스워드를 입력해주세요.')
      return
    }

    const result = await signIn('credentials', {
      username: id,
      password: password,
      redirect: false,
    })
    console.log(result)
    if (result?.error == 'wrong password') {
      // 비밀번호 일치하지 않았을 때 보여줄 것.
      setError('pw')
      pwRef.current?.focus()
    } else if (result?.error == 'No user') {
      // 사용자를 찾을 수 없는 경우
      setError('user')
      idRef.current?.focus()
    } else {
      router.push('/diary?page=1')
    }
  }
  const handleJoin = () => {
    router.push('/join')
  }

  const handleFindId = () => {
    // 아이디 찾기 로직 추가
    alert('아이디 찾기 기능이 추가되었습니다.')
  }

  const handleFindPassword = () => {
    // 비밀번호 찾기 로직 추가
    alert('비밀번호 찾기 기능이 추가되었습니다.')
  }

  const handleKakao = async () => {
    try {
      const result = await signIn('kakao', {
        redirect: true,
        callbackUrl: '/diary?page=1',
      })

      // 성공적으로 소셜 로그인을 수행하면 result에 로그인 정보가 담깁니다.
      console.log('Kakao Login Result:', result)
    } catch (error) {
      // 소셜 로그인 실패 시 에러를 처리합니다.
      console.error('Kakao Login Error:', error)
    }
  }

  const handleGoogle = async () => {
    try {
      const result = await signIn('google', {
        redirect: true,
        callbackUrl: '/diary?page=1',
      })
      console.log('Google Login Result:', result)
    } catch (error) {
      console.error('Google Login Error:', error)
    }
  }
  const handleNaver = () => {
    // 네이버 로그인 처리 로직 추가
  }

  // 엔터 누르면 로그인 실행.
  const sumChk = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await handleLogin()
    }
  }
  return (
    <>
      <div className="flex justify-center items-center h-full mt-[15px]">
        <div className="relative h-full flex justify-center items-center p-[60px] px-[130px] border border-purple/40 rounded-2xl shadow-lg dark:bg-[#474747] dark:border-[#666]">
          <div className=" mx-auto flex flex-col items-center justify-center ">
            <div className="mb-2 text-[3.2rem] dark:text-[white] main-light">
              <img src='/Gamgi.svg' alt='logo' />
            </div>
            <div className="mb-2 text-[3.2rem] dark:text-[white] main-dark">
              <img src='/GamgiDark.svg' alt='logo' />
            </div>
            <span className="opacity-70 mb-10 dark:text-[#eee]">
              로그인해서 감정을 기록해 봐요✏️
            </span>
            <div className="relative flex w-[270px] py-[7px] flex-col items-center p-2 pt-0">
              <Input
                type="text"
                label="아이디"
                className={`w-full rounded-md my-[20px] ${error === 'user' ? 'border border-[#ff7961]' : ''}`}
                value={id}
                ref={idRef}
                onChange={(e) => {
                  setId(e.target.value)
                }}
                onKeyDown={(e) => sumChk(e)}
              />
              <div
                className={`${
                  error ? 'block' : 'hidden'
                } absolute top-[-30px] border border-[#ff7961] px-[30px] py-[7px] rounded-md z-[11] bg-[#ff7961] bg-opacity-[0.6] text-[16px] text-[#b21807] dark:text-[white]`}
              >
                {error && error === 'user'
                  ? '없는 아이디예요... 😣'
                  : '비밀번호가 틀렸어요... 🥹'}
              </div>
            </div>
            <div className="flex w-[270px] py-[7px] flex-col  p-2 pt-0">
              <Input
                type="password"
                label="패스워드"
                className={`w-full rounded-md mb-[20px] ${
                  error === 'pw' ? 'border border-[#ff7961]' : ''
                }`}
                value={password}
                ref={pwRef}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                onKeyDown={(e) => sumChk(e)}
              />
            </div>
            <div className=" mt-3 mb-3  flex items-center   justify-center ">
              <button
                onClick={handleLogin}
                className="h-10 w-64 rounded-md bg-black bg-opacity-[.8] text-lg font-medium text-white transition-colors duration-300 ease-in-out hover:bg-opacity-[1]"
              >
                로그인
              </button>
            </div>
            <div className="flex justify-center">
              <hr className="w-[7rem] text-[#888] mt-3 mr-2" />
              <span className="text-[#888]">or</span>
              <hr className="w-[7rem] text-[#888] mt-3 ml-2" />
            </div>
            <div className="mt-3">
              <button
                onClick={handleJoin}
                className="h-10 w-64 rounded-md bg-[#b2a4d4] bg-opacity-[.8] text-lg font-medium text-white transition-colors duration-300 ease-in-out hover:bg-opacity-[1]"
              >
                회원가입
              </button>
            </div>
            <div className="mt-5 flex flex-col items-center justify-center">
              <span className="text-[16px] flex gap-[15px]">
                <button
                  onClick={handleFindId}
                  className="text-gray-400 hover:text-[#b2a4d4]"
                >
                  아이디 찾기
                </button>
                <button
                  onClick={handleFindPassword}
                  className="text-gray-400 hover:text-[#b2a4d4]"
                >
                  비밀번호 찾기
                </button>
              </span>
            </div>

            <div className="mt-[50px] flex flex-row items-center justify-between">
              <button
                onClick={handleKakao}
                className={` ${styles['login-button']}`}
              >
                <img
                  src="/sign/kakao.png"
                  alt="카카오 로그인 이미지"
                  className="opacity-80 hover:opacity-100"
                />
              </button>
              <div className="w-4"></div>

              <div className="w-4"></div>
              <button
                onClick={handleGoogle}
                className={`${styles['login-button']}`}
              >
                <img
                  src="/sign/google.png"
                  alt="구글 로그인 이미지"
                  className="opacity-80 hover:opacity-100"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
