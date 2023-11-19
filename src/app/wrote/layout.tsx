"use client"

import { useSession } from "next-auth/react"


const Layout = ({children} : {children: React.ReactNode}) => {
    const { data: session, status } = useSession();

    if(status === 'loading') {
        return <p>Loading...</p>
    }
    if(status === 'unauthenticated') {
        return <p>Access Denined</p>
    }
    return (
        <div className="w-full flex justify-center items-center p-[7px]">
            {children}
        </div>
    )
}

export default Layout