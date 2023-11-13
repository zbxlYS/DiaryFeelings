'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRef, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';
import LoginPage from './_components/LoginPage';

const Login = () => {
  
   

     return (
        <div>
          <LoginPage />
        </div>
      );
  };  
    
  

export default Login;