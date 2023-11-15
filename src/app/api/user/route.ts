import queryPromise from '@/app/lib/db'
import bcrypt from 'bcrypt'
import { randomStrings } from '@/app/hooks/hooks'
const crypto = require('crypto')

interface reqBody {
  user_id: string
  password: string
  user_name: string
}

export const POST = async (req: Request) => {
  const body: reqBody = await req.json()
  // 쿼리 가져옴.

  try {
    let sql = 'SELECT user_id from tb_user WHERE user_id = ?'
    const chk = await queryPromise(sql, [body.user_id])
    if (chk.length >= 1) {
      // 아이디가 이미 있다.
      return new Response(JSON.stringify({ result: 'exists' }))
    }
    sql = 'INSERT INTO tb_user VALUES(?,?,?,?,?,?,?,?,?)'
    const salt = crypto.randomBytes(64).toString('base64')
    // salt 생성.

    const hashPassword = crypto
      .createHash('sha512')
      .update(body.password + salt)
      .digest('hex')
    // 비밀번호 뒤에 salt를 붙여서 암호화.

    const values = [
      null,
      body.user_id,
      hashPassword,
      salt,
      body.user_name,
      'credentials',
      new Date(),
      new Date(),
      'no image',
    ]
    const rst = await queryPromise(sql, values)
    return new Response(JSON.stringify({ result: 'done' }))
  } catch (err: any) {
    console.log(err)
    return new Response(JSON.stringify('error'))
  }
}
