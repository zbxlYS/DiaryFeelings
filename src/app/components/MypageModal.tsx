'use client'
import React, { useRef, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Snow from '../emotion/_components/Snow'
interface MypageModalProps {
  closeModal: () => void
  user: any
  userImg?: string
  themeOnClick: () => void
  snowTheme?: boolean
}

const MypageModal: React.FC<MypageModalProps> = ({
  closeModal,
  user,
  userImg,
  themeOnClick,
  snowTheme,
}) => {
  const idRef = useRef<HTMLInputElement>(null)
  const pwRef = useRef<HTMLInputElement>(null)
  const { data: session } = useSession()
  const pathname = usePathname()

  const handleSubmit = async () => {
    if (!idRef.current && !pwRef.current) return null
    const user_id = idRef.current?.value
    const password = pwRef.current?.value

    const result = await signIn('credentials', {
      username: user_id,
      password: password,
      redirect: false,
      callbackUrl: '/',
    })
  }
  const handleSingOut = async () => {
    if (session?.user?.provider === 'kakao') {
      const result = await axios.post(
        `${process.env.BASE_URL}/api/logout/kakao`,
        {
          snsAccess: session?.snsAccess,
        },
        {
          headers: {
            Authorization: `mlru ${session.accessToken}`,
          },
        },
      )
      const rst = result.data
      if (rst.result === 'ok') {
        // 연결 끊기 성공.
        await signOut()
        alert('카카오 로그아웃(연결 끊기) 성공.')
      } else {
        // 에러.
        console.log(rst.result)
      }
    } else if (session?.user?.provider === 'google') {
      const result = await axios.post(
        `${process.env.BASE_URL}/api/logout/google`,
        {
          snsAccess: session?.snsAccess,
        },
        {
          headers: {
            Authorization: `mlru ${session.accessToken}`,
          },
        },
      )
      const rst = result.data
      if (rst.result === 'ok') {
        // 연결 끊기 성공.
        await signOut()
        alert('구글 로그아웃(연동 해제) 성공.')
      } else {
        // 에러.
        console.log(rst.result)
      }
    }
  }

  return (
    <div className="flex flex-col">
      <div className="absolute right-[2rem] top-7 hover:bg-slate-100 rounded-lg">
        <button onClick={closeModal}>
          <Image
            src="/close.png"
            alt="Close Logo"
            className=""
            width={30}
            height={30}
            priority
          />
        </button>
      </div>{' '}
      <div className="flex ">
        <div className="felx justify-center items-center  border rounded-full mb-3 p-1">
          <Image
            src={
              userImg === 'no image' || userImg === undefined || userImg === ''
                ? '/3_love.png' // Fallback image path
                : userImg
            }
            alt="Mypage Logo"
            className=""
            width={45}
            height={45}
            quality={75}
            priority
          />
        </div>

        <h1 className="mt-4 ml-3 text-lg dark:text-black">{user.id} 님</h1>
      </div>
      <div className="ml-3 mb-5">
        {/* 조언텍스트가 들어갈 곳? */}
        <p className="text-slate-500">조언 텍스트 오늘 하루도 많이 먹었어:)</p>
      </div>
      <hr />
      <div className="hover:bg-purple/20 rounded-full mt-5 mb-5 p-1">
        <Link href="/" className="ml-4" onClick={closeModal}>
          {' '}
          <span className="text-slate-800 hover:text-slate-900">
            내 정보변경
          </span>
        </Link>
      </div>
      <div
        className={`hover:bg-purple/20 rounded-full p-1 ${
          pathname === `/emotion?userId=${user.id}` ? 'bg-purple' : ''
        }`}
      >
        <Link
          href={`/emotion?userId=${user.id}`}
          className="ml-4"
          onClick={closeModal}
        >
          <span className="text-slate-800 hover:text-slate-900">
            내 감정보기
          </span>
        </Link>
      </div>
      <div
        className="hover:bg-purple/20 rounded-full mt-5 mb-5 p-1 cursor-grab"
        onClick={themeOnClick}
      >
        <div className="ml-4">
          <span className="text-slate-800 hover:text-slate-900">
            {snowTheme ? '테마 끄기' : '테마 켜기'}
          </span>
          <span
            className={`ml-4 text-sm border rounded-md pl-2 pr-2 pt-1 pb-1 bg-purple text-white`}
          >
            {snowTheme ? 'on' : 'off'}
          </span>
        </div>
      </div>
      <div className="hover:bg-purple/20 rounded-full p-1">
        <Link href="/" className="ml-4" onClick={closeModal}>
          <button onClick={async () => signOut()}>
            <span className="text-slate-800 hover:text-slate-900">
              로그아웃
            </span>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default MypageModal
