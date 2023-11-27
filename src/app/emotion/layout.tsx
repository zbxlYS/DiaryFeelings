'use client'

import { useSession } from "next-auth/react"
import Denined from "../components/Deniend"
import LottieCat from '@/app/components/LottieCat'

const Layout = ({children}: {children: React.ReactNode}) => {
    const { status } = useSession()

    // if(status === 'loading') {
    //     return <LottieCat text='읽어오고 있어요'/>
    // }
    if(status === 'unauthenticated') {
        return <Denined />
    }
    return (
        <>{children}</>
    )
}

export default Layout