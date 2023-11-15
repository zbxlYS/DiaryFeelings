"use client";

import React, { useEffect, useRef, useState } from "react";

const Essential = () => {
  const pwRef = useRef<HTMLInputElement>(null);
  const pwConfirmRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState("");

  //가상의 이메일
  const email = "js@naver.com";

  //비밀번호 확인 
  const confirmBtn = (e: React.MouseEvent<HTMLElement>) => {
    const password: string = pwRef.current!.value;
    const pwConfirm: string = pwConfirmRef.current!.value;
    if (password === pwConfirm) {
      console.log("비밀번호 일치");
    } else {
      console.log("비밀번호 불일치");
    }
  };

  //이메일 사용 가능 여부 확인
  const inputChange = (e : any)=>{
    setData(e.target.value)
  }



  return (
    <div>
      <p> 이메일 : <input type="text" value={data} onChange={inputChange}/></p>
      {data !== email ? <p> 사용할 수 있는 이메일 입니다.</p> : <p> 사용할 수 없는 이메일 입니다.</p>}
      <p>비밀번호 : <input type="text" ref={pwRef} />
      </p>
      <p>비밀번호 확인 : <input type="text" ref={pwConfirmRef} />
        <button onClick={confirmBtn}>비밀번호 확인</button>
      </p>
    </div>
  );
};

export default Essential;
