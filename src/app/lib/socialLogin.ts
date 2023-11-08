import { signJwtAccessToken, signJwtRefreshToken } from './jwt'
import queryPromise from '@/app/lib/db'
import bcrypt from 'bcrypt'

export const socialLogin = async(user: any, provider: string) => {
    try {
        let sql = '';
        sql = 'SELECT user_id FROM USER WHERE user_id = ?'
        let result = await queryPromise(sql, [user.id]);
        if(result.length < 1) {
            // 회원이 아니니까 db에 등록.
            sql = 'INSERT INTO USER VALUES(?,?,?,?,?,?,?)'
            const pw = await bcrypt.hash(user.id, 10);
            result = await queryPromise(sql, [null, user.id, pw, user.name, provider, new Date(), new Date()]);
        }
        const tokenUser = {
            user_id: user.id,
        };
        const accessToken = signJwtAccessToken(tokenUser);
        const refreshToken = await signJwtRefreshToken(user.id);
        const rst = {
            ...user,
            accessToken,
            refreshToken
        };
        return rst;
    } catch(e) {
        console.log(e)
        return false;
    }
}