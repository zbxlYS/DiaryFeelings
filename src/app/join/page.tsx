import React from "react";
import Essential from "./_components/Essential";
import Optional from "./_components/Optional";
import Link from "next/link";

const page = () => {
  return (
    <div className="mt-10 flex h-screen w-screen flex-col items-center ">
      <div className="w-1/2  border-black border-2 bolder-solid grid place-items-center">
        <div className=" ">
          <div className=""  >
            <form action="#">
              <h1>회원가입</h1>
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
    </div>
  );
};

export default page;
