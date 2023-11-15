'use client'

import React, { useRef, useState } from 'react'

const Essential = () => {
  const pwRef = useRef<HTMLInputElement>(null)
  const pwConfirmRef = useRef<HTMLInputElement>(null)
  const [data, setData] = useState('')

  //가상의 이메일
  const email = 'js@naver.com'

  //비밀번호 확인
  const confirmBtn = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const password: string = pwRef.current!.value
    const pwConfirm: string = pwConfirmRef.current!.value
    if (password === pwConfirm) {
      console.log('비밀번호 일치')
    } else {
      console.log('비밀번호 불일치')
    }
  }

  //이메일 사용 가능 여부 확인
  const inputChange = (e: any) => {
    setData(e.target.value)
  }

  return (
    <div className="flex flex-col items-center ">
      <div className="flex w-64 flex-col  p-2 pt-0">
        <span className="p-1 text-sm font-normal"> 이메일 </span>
        <input
          type="text"
          value={data}
          onChange={inputChange}
          className="border-2"
        />
      </div>

      {data !== email ? (
        <p className="p-1 text-sm font-normal">
          {' '}
          사용할 수 있는 이메일 입니다.
        </p>
      ) : (
        <p className="p-1 text-sm font-normal">
          {' '}
          사용할 수 없는 이메일 입니다.
        </p>
      )}

      <div className="flex w-64 flex-col  p-2 pt-0">
        <span className="p-1 text-sm font-normal"> 비밀번호 </span>
        <input type="text" ref={pwRef} className="border-2" />
      </div>

      <div className="flex w-64 flex-col  p-2 pt-0">
        <span className="p-1 text-sm font-normal">비밀번호 확인 </span>
        <input type="text" ref={pwConfirmRef} className="border-2" />
        <button onClick={confirmBtn} className="p-1 text-sm font-normal">
          비밀번호 확인
        </button>
      </div>
    </div>
  )
}

export default Essential
