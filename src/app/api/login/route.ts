import { signJwtAccessToken } from '@/app/lib/jwt'
import queryPromise from '@/app/lib/db'
import * as bcrypt from 'bcrypt';

interface reqBody {
    user_id: string;
    password: string;
}

export const POST = async(req: Request) => {
    const body: reqBody = await req.json();
    let sql = 'SELECT user_id, user_pw, user_name FROM USER WHERE user_id = ?';
    let values = [body.user_id];

    let result = await queryPromise(sql, values);
    if(result.length < 1) return new Response(JSON.stringify({"result":"no user"}));
    const chk = await bcrypt.compare(body.password, result[0].user_pw);
    if(chk) {
        const user = {
            user_id: result[0].user_id,
            user_name: result[0].user_name
        };
        const accessToken = signJwtAccessToken(user);
        const rst = {
            ...user,
            accessToken
        };
        return new Response(JSON.stringify(rst))
    } else return new Response(JSON.stringify({"result":"wrong password."}));
}