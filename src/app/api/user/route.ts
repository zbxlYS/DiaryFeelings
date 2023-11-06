import queryPromise from '@/app/lib/db'
import bcrypt from 'bcrypt'


interface reqBody {
    user_id: string;
    password: string;
    user_name: string;
}

export const POST = async(req: Request) => {
    const body: reqBody = await req.json();
    // 쿼리 가져옴.

    try {
        let sql = 'SELECT id from USER WHERE user_id = ?'
        const chk = await queryPromise(sql, [body.user_id]);
        if(chk.length >= 1) {
            return new Response(JSON.stringify({"result":"exists"}))
        }
        sql = 'INSERT INTO USER VALUES(?, ?,?,?,?,?,?)'
        let pw = await bcrypt.hash(body.password, 10)
        const values = [null, body.user_id, pw, body.user_name, 'credentials', new Date(), new Date()]
        const rst = await queryPromise(sql, values);
        return new Response(JSON.stringify({"result":"done"}));

    } catch(err: any) {
        console.log(err)
        return new Response(JSON.stringify('error'))
    }
}