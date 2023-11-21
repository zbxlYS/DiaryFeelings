'use client'

import { useSession } from "next-auth/react"

const Layout = ({children}: {children : React.ReactNode}) => {
    const { status } = useSession();
    if(status === 'authenticated') {
        return <div>접근ㄴ</div>
    }
    return (
        <>
            {children}
        </>
    )
}

export default Layout