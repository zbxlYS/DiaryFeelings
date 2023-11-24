'use client'

import { useSession } from "next-auth/react"
import LottiCat from '@/app/components/LottieCat'

const Layout = ({children}: {children: React.ReactNode}) => {
    const { status } = useSession()

    if(status === 'loading') {
        return <LottiCat text={'읽어오고 있어요'}/>
    }

    return (
        <>
            {children}
        </>
    )
}

export default Layout