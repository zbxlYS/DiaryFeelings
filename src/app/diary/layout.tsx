"use client"

import { useSession } from "next-auth/react";
import Denined from "../components/Deniend";

interface Props {
    id: string;
}

const Layout = ({children, params}: {children: React.ReactNode, params: Props}) => {
    const { data: session, status } = useSession();
    if(status === 'loading') {
        return <></>
    }
    if(status === 'unauthenticated') {
        return <Denined />
    }
    return (
        <>
            {
                children
            }
        </>
    )
};

export default Layout;