'use client'
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useRecoilValue } from 'recoil'
import { userInfo } from '../lib/atoms/atom'
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
  const { data: session } = useSession()
  const pathname = usePathname()
  const userData = useRecoilValue(userInfo)
  const router = useRouter()

  const handleSingOut = async () => {
    // 단순 로그아웃 호출
    await signOut({ redirect: false });
    router.push('/');  // 홈으로 리다이렉트
  }

  return (
    <div className="flex flex-col">
      <div className="absolute right-[2rem] top-7 hover:bg-slate-100 rounded-lg dark:hover:bg-[#666] flex justify-center items-white">
        <button onClick={closeModal}>
          <Image
            src="/close.png"
            alt="Close Logo"
            className="main-light"
            width={30}
            height={30}
            priority
          />
          <Image
            src="/close.png"
            alt="Close Logo"
            className="main-dark closeWhite"
            width={30}
            height={30}
            priority
          />
        </button>
      </div>{' '}
      <div className="flex ">
        <div className="felx justify-center items-center  border rounded-full mb-3 ">
          <Image
            src={
              userImg === 'no image' || userImg === undefined || userImg === ''
                ? '/3_love.png' // Fallback image path
                : userImg
            }
            alt="Mypage Logo"
            className="rounded-full"
            width={45}
            height={45}
            quality={75}
            priority
          />
        </div>

        <h1 className="mt-4 ml-3 text-lg dark:text-[white]">{user.id} 님</h1>
      </div>
      <div className="ml-3 mb-5">
        {/* 조언텍스트가 들어갈 곳? */}
        <p className="text-slate-500 dark:text-[#ccc]">{userData.desc}</p>
      </div>
      <div className='border-t-[1px] border-[#aaa] dark:border-[#666]'></div>
      <div className="hover:bg-purple/20 rounded-md mt-5 mb-5 p-1 dark:hover:bg-[#666]">
        <Link href="/edit" className="ml-4" onClick={closeModal}>
          {' '}
          <span className="text-slate-800 hover:text-slate-900 dark:text-[#eee] dark:hover:text-[#b2a4d4]">
            내 정보 변경
          </span>
        </Link>
      </div>
      <div
        className={`hover:bg-purple/20 rounded-md p-1 dark:hover:bg-[#666] ${
          pathname.startsWith(`/diary`) ? 'bg-purple' : ''
        }`}
      >
        <Link
          href={`/diary`}
          className="ml-4"
          onClick={closeModal}
        >
          <span className="text-slate-800 hover:text-slate-900 dark:text-[#eee] dark:hover:text-[#b2a4d4]">
            내 일기 보기
          </span>
        </Link>
      </div>
      <div
        className={`hover:bg-purple/20 rounded-md p-1 dark:hover:bg-[#666] ${
          pathname.startsWith('/books') ? 'bg-purple' : ''
        }`}
      >
        <Link
          href={`/books`}
          className="ml-4"
          onClick={closeModal}
        >
          <span className="text-slate-800 hover:text-slate-900 dark:text-[#eee] dark:hover:text-[#b2a4d4]">
            내 책 보기
          </span>
        </Link>
      </div>


      <div
        className={`hover:bg-purple/20 rounded-md p-1 dark:hover:bg-[#666] ${
          pathname.startsWith(`/community`) ? 'bg-purple' : ''
        }`}
      >
        <Link
          href={`/community`}
          className="ml-4"
          onClick={closeModal}
        >
          <span className="text-slate-800 hover:text-slate-900 dark:text-[#eee] dark:hover:text-[#b2a4d4]">
            커뮤니티
          </span>
        </Link>
      </div>


      <div
        className={`hover:bg-purple/20 rounded-md p-1 dark:hover:bg-[#666] ${
          pathname.startsWith(`/follow`) ? 'bg-purple' : ''
        }`}
      >
        <Link
          href={`/follow`}
          className="ml-4"
          onClick={closeModal}
        >
          <span className="text-slate-800 hover:text-slate-900 dark:text-[#eee] dark:hover:text-[#b2a4d4]">
            팔로우 목록
          </span>
        </Link>
      </div>


      <div className="hover:bg-purple/20 rounded-md p-1 dark:hover:bg-[#666]">
        <Link href="/" className="ml-4" onClick={closeModal}>
          <button onClick={async () => handleSingOut()}>
            <span className="text-slate-800 hover:text-slate-900 dark:text-[#eee] dark:hover:text-[#b2a4d4]">
              로그아웃
            </span>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default MypageModal
