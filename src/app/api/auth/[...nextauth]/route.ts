import NextAuth from "next-auth/next";
import CredentialsProvider  from "next-auth/providers/credentials";
import KakaoProvider from 'next-auth/providers/kakao'
import axios from 'axios'
import { socialLogin } from "@/app/lib/socialLogin";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: '아이디',
                    type: 'text',
                    placeholder: '아이디 입력'
                },
                password: {
                    label: '비밀번호',
                    type: 'password'
                }
            },
            async authorize(credentials, req) {
                const res = await axios.post(`${process.env.BASE_URL}/api/login`, {
                    username: credentials?.username,
                    password: credentials?.password
                })
                const result = res.data;
                if(result.user_id) {
                    return result;
                }
                throw new Error(result);
            }
        }),
        // KakaoProvider({
        //     clientId: process.env.KAKAO_CLIENT_ID!,
        //     clientSecret: process.env.KAKAO_CLIENT_SECRET!
        // })
    ],
    callbacks: {
        // async signIn({user, account}) {
        //     // account.provider
        //     // user는 그대로 다 넘기면 될 듯.
        //     if(account?.provider !== 'credentials') {
        //         const result = socialLogin(user, account?.provider as string);
        //         return result;
        //     } else {
        //         return user;
        //     }
        // },
        async jwt({ token, account, profile }) {
            const users: any = profile;
            console.log(token)
            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.id = users?.id
                token.name = users?.name
            }
            return token;
        },
        async session({ session, token, user }) {
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            return session;
        }
    },
    // pages: {
    //     signIn: '/signin'
    // }
})


export { handler as GET, handler as POST }