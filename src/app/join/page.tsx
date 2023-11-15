import React from 'react'
import Essential from './_components/Essential'
import Optional from './_components/Optional'
import Link from 'next/link'

const page = () => {
  return (
    <div className="mt-10 flex h-screen w-screen flex-col items-center ">
      <div className="w-1/4  border-black border-2 bolder-solid">
        <div>
          <form action="#">
            <p className="text-2xl font-bold text-center">회원가입</p>
            <Essential />
            <Optional />
            <button type="submit">가입하기</button>
            <Link href="/signin">
              <button>소셜로그인</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default page
