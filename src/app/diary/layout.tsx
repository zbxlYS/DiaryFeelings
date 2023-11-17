"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



const Layout = ({children}: {children: React.ReactNode}) => {
    // 이 주소 내에선
    // 얘가 다 감싸고 있으니까
    // 여기서 토큰 검증... 갸꿀? ㅇㅇㅈ

    // const { data: session } = useSession();
    // const router = useRouter();
    // // if(!session) {
    // //     alert('워닝우어닝');
    // //     router.push('/');
    // // }
    // useEffect(() => {
    //     if(!session) {
    //         alert('워닝우어닝');
    //         router.push('/');
    //     }
    // },[session])
    return (
        <>
            {
                children
            }
        </>
    )
};

export default Layout;