"use client"

import { useSession } from "next-auth/react"
import Denined from "../components/Deniend";
import Loading from "../components/Loading";
import LottieCat from '../components/LottieCat';
import './styles/test.css'

const Layout = ({children} : {children: React.ReactNode}) => {
    const { data: session, status } = useSession();

    if(status === 'loading') {
        return <LottieCat text={'읽어오고 있어요'}/>
    }
    if(status === 'unauthenticated') {
        return <Denined />
    }
    return (
        <div className="w-full flex justify-center items-center p-[7px]">
            {children}
        </div>
    )
}

export default Layout