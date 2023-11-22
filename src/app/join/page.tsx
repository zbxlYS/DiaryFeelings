'use client'
import React, { useRef, useState } from 'react'
import { Button, Avatar, Input } from '@nextui-org/react'
import { EyeFilledIcon } from './_components/EyeFilledIcon'
import { EyeSlashFilledIcon } from './_components/EyeSlashFilledIcon'
import axios from 'axios'

const page = () => {
  let submit: Boolean = true
  const [msg, setMsg] = useState('')
  const [pwdata, setpwData] = useState('')
  const [pwdata2, setpwData2] = useState('')
  const nicknameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const msgRef = useRef<HTMLInputElement>(null)
  const pwRef = useRef<HTMLInputElement>(null)
  const pwRef2 = useRef<HTMLInputElement>(null)
  const imgRef = useRef<HTMLInputElement>(null)
  const [isVisible, setIsVisible] = React.useState(false)
  const [isVisible2, setIsVisible2] = React.useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)
  const toggleVisibility2 = () => setIsVisible2(!isVisible2)

  // 기본 프로필 이미지 설정 및 사용자 첨부 이미지 저장 세팅
  const [img, setImg] = useState<string>(
    'data:image/jpeg;base64,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',
  )
  const handleImg = (e: React.ChangeEvent<{ files: FileList | null }>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      URL.revokeObjectURL(img)

      setImg((prev) => URL.createObjectURL(file))
    }
  }

  //이메일 사용 가능 여부 확인

  const confirmBtn = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const result = await axios.post(`/api/user`, {
      user_id: emailRef.current!.value,
    })
    if (result.data.result === '이미 있는 아이디예요.') {
      submit = false
      setMsg('사용 할 수 없는 이메일 입니다.')
      msgRef.current!.style.color = 'red'
    } else if (result.data.result === '가입할 수 있는 아이디예요.') {
      submit = true
      setMsg('사용 가능한 이메일 입니다.')
      msgRef.current!.style.color = 'green'
    } else {
      submit = false
    }
    if (emailRef.current!.value === '') {
      setMsg('')
    }
  }

  //비밀번호 확인

  const pwChange = (e: any) => {
    setpwData(e.target.value)
  }
  const pwChange2 = (e: any) => {
    setpwData2(e.target.value)
  }

  if (pwdata !== '' && pwdata === pwdata2) {
    submit = true
  } else {
    submit = false
  }

  // 서버로 정보 보내서 회원가입하기
  const joinsubmit = async (e: any) => {
    e.preventDefault()

    if (img && nicknameRef.current && emailRef.current && pwRef.current) {
      const formData = new FormData()
      if (imgRef.current && imgRef.current.files) {
        formData.append('img', imgRef.current.files[0])
      }

      formData.append('user_name', nicknameRef.current!.value)
      formData.append('user_id', emailRef.current!.value)
      formData.append('password', pwRef.current!.value)

      if (submit === true) {
        const result = await axios.put('/api/user', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        console.log('데이터 넘어감?', result)
      } else {
        console.log('안돼 돌아가')
      }
    }
  }

  return (
    <div className="mt-10 flex h-full flex-col items-center ">
      <div className="w-1/2">
        <div>
          <form>
            <p className="text-xl font-bold text-center mb-4 ">회원가입</p>
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                <div className="flex gap-4 items-center ">
                  <Avatar
                    isBordered
                    radius="full"
                    size="lg"
                    src={img}
                    name="img"
                  />
                </div>
                <label htmlFor="file">
                  <div className="mt-3 mb-3 p-2 pr-4 pl-4 bg-slate-200 shadow-md rounded-lg dark:border-[#d3d1d1] dark:bg-[#353434] dark:text-[#fff]">
                    프로필 사진 등록하기
                  </div>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  ref={imgRef}
                  onChange={handleImg}
                  id="file"
                  className="hidden"
                />
              </div>

              <div className="flex w-[20rem] flex-col  p-2   pt-0">
                <Input
                  isRequired
                  size="md"
                  variant="underlined"
                  type="text"
                  label="닉네임"
                  ref={nicknameRef}
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex  flex-col  p-2 pt-0 w-[20rem]">
                <Input
                  isRequired
                  variant="underlined"
                  name="email"
                  type="email"
                  label="이메일"
                  ref={emailRef}
                  className="max-w-xs"
                />
              </div>

              <div className="flex flex-col items-center">
                <div className="flex flex-col items-center p-1 pt-5 w-[20rem]">
                  <Button
                    size="md"
                    radius="md"
                    className="w-full bg-neutral-100 hover:bg-neutral-150 hover:shadow-lg shadow-md dark:text-[#171717]"
                    onClick={confirmBtn}
                  >
                    {' '}
                    이메일 중복 확인{' '}
                  </Button>
                </div>
              </div>

              <p ref={msgRef} className="p-1 text-sm font-normal">
                {msg}
              </p>

              <div className="flex flex-col  p-2 pt-0 w-[20rem]">
                <Input
                  isRequired
                  variant="underlined"
                  name="pw"
                  label="비밀번호"
                  onChange={pwChange}
                  ref={pwRef}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? 'text' : 'password'}
                  className="max-w-xs"
                />
              </div>

              <div className="flex flex-col  p-2 pt-0 w-[20rem]">
                <Input
                  isRequired
                  variant="underlined"
                  name="pwconfirm"
                  label="비밀번호 확인"
                  onChange={pwChange2}
                  ref={pwRef2}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility2}
                    >
                      {isVisible2 ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible2 ? 'text' : 'password'}
                  className="max-w-xs"
                />

                {pwdata && pwdata2 !== pwdata ? (
                  <p className="p-1 text-sm font-normal text-center mt-1 mb-1 text-red-600">
                    비밀번호를 확인해주세요
                  </p>
                ) : (
                  <p></p>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center p-1 pt-5 w-[20rem]">
                <Button
                  size="md"
                  radius="md"
                  className="w-full bg-neutral-100 hover:bg-neutral-150 hover:shadow-lg shadow-md dark:text-[#171717]"
                  onClick={joinsubmit}
                >
                  {' '}
                  가입하기{' '}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default page
