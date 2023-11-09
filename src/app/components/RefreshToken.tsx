"use client";

import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
const RefreshToken = () => {
    const { data: session } = useSession();
    const refreshAccess = async() => {
        console.log('check token...')
        const token = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/token`);
        const result = token.data;
        if(result.status === 'error') {
            console.log(result.result);
        }
        if(session) {
            session.accessToken = result.result.token;
        }
    }
    useEffect(()=>{
        refreshAccess();
    },[session])
    return (
        <></>
    )
};

export default RefreshToken;