"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRef, useState } from "react";
import axios from "axios";
import AfterNav from "../components/Nav";

const Page = () => {
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const { data: session } = useSession();
  console.log(session);

  const handleSubmit = async () => {
    if (!idRef.current && !pwRef.current) return null;
    const user_id = idRef.current?.value;
    const password = pwRef.current?.value;

    const result = await signIn("credentials", {
      username: user_id,
      password: password,
      redirect: false,
      callbackUrl: "/",
    });
  };
  const handleSingOut = async () => {
    if (session?.user?.provider === "kakao") {
      const result = await axios.post(
        `${process.env.BASE_URL}/api/logout/kakao`,
        {
          snsAccess: session?.snsAccess,
        },
        {
          headers: {
            Authorization: `mlru ${session.accessToken}`,
          },
        }
      );
      const rst = result.data;
      if (rst.result === "ok") {
        // 연결 끊기 성공.
        await signOut();
        alert("카카오 로그아웃(연결 끊기) 성공.");
      } else {
        // 에러.
        console.log(rst.result);
      }
    } else if (session?.user?.provider === "google") {
      const result = await axios.post(
        `${process.env.BASE_URL}/api/logout/google`,
        {
          snsAccess: session?.snsAccess,
        },
        {
          headers: {
            Authorization: `mlru ${session.accessToken}`,
          },
        }
      );
      const rst = result.data;
      if (rst.result === "ok") {
        // 연결 끊기 성공.
        await signOut();
        alert("구글 로그아웃(연동 해제) 성공.");
      } else {
        // 에러.
        console.log(rst.result);
      }
    }
  };
  return (
    <div>
      <input type="text" ref={idRef} />
      <input type="text" ref={pwRef} />
      <textarea ref={textRef} />
      <button onClick={() => handleSubmit()}>go</button>
      <button onClick={() => console.log(textRef.current?.value.split("\n"))}>
        ddd
      </button>
      <button onClick={() => handleSingOut()}>out</button>
      <button onClick={async () => signOut()}>out2</button>
    </div>
  );
};

export default Page;
