import NextAuth, { DefaultSession, User } from 'next-auth';

declare module "next-auth" {
    interface Session extends DefaultSession {
        user?: {
            id: number;
            name: string;
            email: string;
        } & DefaultSession['user'];
        accessToken: string | unknown;
    }
}