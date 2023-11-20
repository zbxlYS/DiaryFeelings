"use client"

import { useSession } from "next-auth/react";
import Denined from "../components/Deniend";
import { useEffect, useState } from "react";
interface Props {
    id: string;
}

const Layout = ({children, params}: {children: React.ReactNode, params: Props}) => {
    const { data: session, status } = useSession();
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