import { signJwtAccessToken, signJwtRefreshToken } from '@/app/lib/jwt'
import queryPromise from '@/app/lib/db'
import * as bcrypt from 'bcrypt';

interface reqBody {
    username: string;
    password: string;
}

export const POST = async(req: Request) => {
    const body: reqBody = await req.json();
    let sql = 'SELECT user_id, user_pw, user_name FROM USER WHERE user_id = ?';
    let values = [body.username];
    let result = await queryPromise(sql, values);
    if(result.length < 1) return new Response(JSON.stringify({"result":"no user"}));
    const chk = await bcrypt.compare(body.password, result[0].user_pw);
    if(chk) {
        const user = {
            user_id: result[0].user_id,
            user_name: result[0].user_name
        };
        const accessToken = signJwtAccessToken({user_id: user.user_id});
        const refreshToken = await signJwtRefreshToken(body.username);
        const rst = {
            ...user,
            accessToken,
            refreshToken
        };
        return new Response(JSON.stringify(rst))
    }
    
}