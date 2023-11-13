import React from "react";
import Essential from "./_components/Essential";
import Optional from "./_components/Optional";
import Link from "next/link";

const page = () => {
  return (
    <body style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{ border: "1px dotted black", width: "50%", height: "540px" }}
        >
          <form action="#">
            <h1 style={{ textAlign: "center" }}>회원가입</h1>
            <Essential />
            <Optional />
            <button type="submit">가입하기</button>
            <Link href="/signin">
              <button>소셜로그인</button>
            </Link>
          </form>
        </div>
      </div>
    </body>
  );
};

export default page;
