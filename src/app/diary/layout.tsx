"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



const Layout = ({children}: {children: React.ReactNode}) => {
    const { data: session, status } = useSession();

    if(status === 'loading') {
        return <p>Loading...</p>
    }
    if(status === 'unauthenticated') {
        return <p>Access Denined</p>
    }
    // layout에서 하위 애들을 감싸고 있으니
    // 여기에서 로그인/로딩 같은 거 만들기.
    return (
        <>
            {
                children
            }
        </>
    )
};

export default Layout;