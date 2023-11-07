"use client";

import { signIn, signOut, useSession } from 'next-auth/react'
import { useRef } from 'react'
const Page = () => {
    const idRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null);
    const { data: session } = useSession();
    console.log(session);

    const handleSubmit = async() => {
        if(!idRef.current && !pwRef.current) return null;
        const user_id = idRef.current?.value;
        const password = pwRef.current?.value;
        
        const result = await signIn("credentials", {
            username: user_id,
            password: password,
            redirect: false,
            callbackUrl: '/'
        });
        console.log(result)
    }
    return (
        <div>
            <input type='text' ref={idRef}/>
            <input type='text' ref={pwRef}/>
            <button onClick={() => handleSubmit()}>go</button>
            <button onClick={() => signOut()}>out</button>
        </div>
    )
};

export default Page;