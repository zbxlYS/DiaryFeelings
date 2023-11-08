import NextAuth, { DefaultSession, User } from 'next-auth';

declare module "next-auth" {
    interface Session extends DefaultSession {
        user?: {
            id: number;
            name: string;
            email: string;
            provider: string;
        } & DefaultSession['user'];
        accessToken: string | unknown;
        refreshToken: string | unknown;
        snsAccess?: string;
        snsRefresh?: string;
    }
}