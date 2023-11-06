import NextAuth from "next-auth/next";
import CredentialsProvider  from "next-auth/providers/credentials";
import axios from 'axios'

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
                if(result.user) {
                    return result.user;
                } else {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            const users: any = profile;
            if (account) {
                token.accessToken = account.access_token;
                token.id = users?.id
            }
            return token;
        },
        async session({ session, token, user }) {
            session.accessToken = token.accessToken;
            return session;
        }
    },
    pages: {
        signIn: '/signin'
    }
})


export { handler as GET, handler as POST }