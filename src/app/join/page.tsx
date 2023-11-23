'use client'
import React, { useRef, useState } from 'react'
import { Button, Avatar, Input } from '@nextui-org/react'
import {EyeFilledIcon} from "./_components/EyeFilledIcon";
import {EyeSlashFilledIcon} from "./_components/EyeSlashFilledIcon";
import axios from 'axios';
import { useRouter } from 'next/navigation';

const page = () => {
  let submit: Boolean = true
  const [msg, setMsg] = useState('')
  const [idChk, setIdChk] = useState(false);
  const [pwdata,setpwData] = useState('')
  const [pwdata2,setpwData2] = useState('')
  const nicknameRef = useRef<HTMLInputElement>(null)
  const emailRef =  useRef<HTMLInputElement>(null)
  const pwRef = useRef<HTMLInputElement>(null)
  const pwRef2 = useRef<HTMLInputElement>(null)
  const imgRef = useRef<HTMLInputElement>(null)
  const [isVisible, setIsVisible] = React.useState(false);
  const [isVisible2, setIsVisible2] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);
  const router = useRouter();
  
  // 기본 프로필 이미지 설정 및 사용자 첨부 이미지 저장 세팅
  const [img, setImg] = useState<string>(
    '',
  )
  const handleImg = (e: React.ChangeEvent<{ files: FileList | null }>) => {
    if(e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        URL.revokeObjectURL(img);

        setImg(prev => URL.createObjectURL(file));
    }
}
const imgReset = () => {
  URL.revokeObjectURL(img);
  setImg(prev => '');
}

  //이메일 사용 가능 여부 확인

  const confirmBtn = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    if(!emailRef.current) return;
    if(emailRef.current.value.length === 0) {
      // 아무것도 입력 안 함.
      alert('아이디를 입력해 주세요.')
      emailRef.current.focus()
      return
    }
    const result = await axios.post(`/api/user`,{
    user_id : emailRef.current!.value})
    if(result.data.result === '이미 있는 아이디예요.'){
      submit = false
      setMsg('이미 있는 아이디예요... 🥹')
      setIdChk(false);
    }
    else if(result.data.result === '가입할 수 있는 아이디예요.'){
      submit = true
      setMsg('가입할 수 있는 아이디예요! 🥳')
      setIdChk(true)
    }else{
      submit = false
    }
    if(emailRef.current!.value ===''){
      setMsg('')
    }
   
  }
 

  //비밀번호 확인

  const pwChange = (e:any)=>{
    setpwData(e.target.value)
  }
  const pwChange2 = (e:any)=>{
    setpwData2(e.target.value)
  }

  if(pwdata !== '' && pwdata === pwdata2){
    submit = true
  }else{
    submit= false
  }
  
  // 서버로 정보 보내서 회원가입하기 
  const joinsubmit = async(e:any) => {
    e.preventDefault()
    if(!idChk) {
      return;
    }
    if(nicknameRef.current && emailRef.current && pwRef.current && pwRef2.current) {
      if(!nicknameRef.current.value) {
        alert('닉네임을 입력해 주세요🥹')
        nicknameRef.current.focus()
        return
      }
      if(!emailRef.current.value) {
        alert('아이디를 입력해 주세요🥹')
        emailRef.current.focus()
        return
      }
      if(!pwRef.current.value) {
        alert('비밀번호를 입력해 주세요🥹')
        pwRef.current.focus()
        return
      }
      if(!pwRef2.current.value) {
        alert('비밀번호 확인을 입력해 주세요🥹')
        pwRef2.current.focus()
        return
      }
      const formData = new FormData();
      if(imgRef.current && imgRef.current.files && imgRef.current.files.length > 0){
        formData.append('img', imgRef.current.files[0])
      }
      
      formData.append('user_name', nicknameRef.current!.value)
      formData.append('user_id' , emailRef.current!.value)
      formData.append('password',pwRef.current!.value)

      if(!idChk) {
        alert('아이디 중복 확인을 해주세요... 🥹')
        return
      }
        
        const result = await axios.put(
          '/api/user',
          formData,
          {
            headers:{
              "Content-Type":"multipart/form-data"
            }
          }
        );
        // 가입 성공.
        // 로그인 페이지로 넘김.
        router.push('/signin')
    }
  }


  return (
    <div className="flex w-screen h-full flex-col justify-center items-center">
      <div className="p-[20px] px-[100px] border shadow-lg rounded-md">
        <div>
          <form>
            <p className="text-xl font-bold text-center mb-4 ">회원가입</p>
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                <div className="flex gap-4 items-center">
                  <Avatar isBordered radius="md" size="lg" src={img} name='프로필' className='w-[250px] h-[250px] mb-[20px]'/>
                </div>
                  {
                     img ? (
                      <div className="text-lg flex justify-center items-center w-[250px] cursor-pointer mt-3 mb-3 p-2 pr-4 pl-4 shadow-md rounded-lg bg-[tomato] text-white dark:border-[#d3d1d1] dark:bg-[#353434] dark:text-[#fff]"
                        onClick={imgReset}
                      >
                          프로필 사진 지우기
                      </div>
                     ) : (
                        <div className="text-lg flex justify-center items-center w-[250px] cursor-pointer mt-3 mb-3 p-2 pr-4 pl-4 bg-slate-200 shadow-md rounded-lg dark:border-[#d3d1d1] dark:bg-[#353434] dark:text-[#fff]"
                          onClick={() => {if(imgRef.current) imgRef.current.click()}}
                        >
                          프로필 사진 등록하기
                        </div>
                     )
                  }
                <input type="file" accept="image/*" ref={imgRef} onChange={handleImg} id="file" className="hidden"/>
              </div>

              <div className="flex w-[20rem] flex-col  p-2   pt-0">
                <Input isRequired size="md" variant="underlined" type="text" label="닉네임" ref={nicknameRef}/>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex  flex-col  p-2 pt-0 w-[20rem]">
                <Input isRequired variant="underlined" name='email' type="email" label="아이디"  ref={emailRef} className="max-w-xs"/>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex flex-col items-center p-1 pt-5 w-[20rem]">
                <Button size="md" radius="md" className="w-full bg-neutral-100 hover:bg-neutral-150 hover:shadow-lg shadow-md dark:text-[#171717]"  
                onClick={confirmBtn}> 아이디 중복 확인 </Button>
                </div>
              </div>

              {
                msg && (
                  idChk ? (<span className='border border-[#4caf50] px-[18px] py-[7px] rounded-md mt-[10px] bg-[#4caf50] bg-opacity-20 text-black'>{msg}</span>)
                        : (<span className='border border-[#ef5350] px-[18px] py-[7px] rounded-md mt-[10px] bg-[#ef5350] bg-opacity-20 text-black'>{msg}</span>)

                )
              }

              <div className="flex flex-col  p-2 pt-0 w-[20rem]">
                <Input isRequired variant="underlined" name='pw' label="비밀번호" onChange={pwChange} ref={pwRef}
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? 'text' : 'password'} className="max-w-xs"/>
              </div>

              <div className="flex flex-col  p-2 pt-0 w-[20rem]">
                <Input isRequired variant="underlined" name='pwconfirm'label="비밀번호 확인" onChange={pwChange2} ref={pwRef2}
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility2}>
                      {isVisible2 ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible2? 'text' : 'password'}  className="max-w-xs"/>

                {pwdata && pwdata2 !== pwdata && 
                  <span className='flex justify-center items-center border border-gray px-[18px] py-[7px] rounded-md mt-[10px] bg-[#ef5350] bg-opacity-50 text-white'>
                    비밀번호를 확인해 주세요
                  </span>
                }
                
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center p-1 pt-5 w-[20rem]">
                <Button size="md" radius="md" 
                className={`w-full ${idChk && pwRef.current?.value && pwRef2.current?.value ? 'bg-black text-white' : 'bg-neutral-200 hover:shadow-lg'} shadow-md dark:text-[#171717]`} 
                onClick={joinsubmit}> 가입하기 </Button>
              </div>
            </div>
          </form>    
        </div>
      </div>
    </div>
  )
}

export default page
