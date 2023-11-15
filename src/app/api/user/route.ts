import queryPromise from '@/app/lib/db'
import { NextResponse } from 'next/server'
import axios from 'axios'
const crypto = require('crypto')

interface reqBody {
  user_id?: string
  password?: string
  user_name?: string
}
export const api = {
  bodyParse: false,
}

// POST는 아이디 있는지 검증 ㅎㅅㅎ
export const POST = async (req: Request) => {
  const body: reqBody = await req.json()

  try {
    let sql = 'SELECT user_id from tb_user WHERE user_id = ?'
    const chk = await queryPromise(sql, [body.user_id])
    if (chk.length >= 1) {
      // 아이디 존재.
      return NextResponse.json({ result: '이미 있는 아이디예요.' })
    }
    return NextResponse.json({ result: '가입할 수 있는 아이디예요.' })
  } catch (err: any) {
    console.log(err)
    return NextResponse.json({ result: '에러에러에러.' })
  }
}

// PUT을 회원 가입 메소드로 ㅎㅇ
// 프로필 이미지 저장 추가해야 됨.
export const PUT = async (req: Request) => {
  // 이미지 추가가 있으므로
  // formData 써야함.
  const data = await req.formData()
  const id = data.get('user_id') as string
  const password = data.get('password') as string
  const name = data.get('user_name') as string
  const img = data.get('img') as File
  let imgSrc = ''
  if (img) {
    const fb = new FormData()
    fb.append('image', img)
    const result = await axios.post('https://api.imgur.com/3/upload', fb, {
      headers: {
        Authorization: `Client-ID ${process.env.IMGUR_KEY}`,
        Accept: 'application/json',
      },
    })
    imgSrc = result.data.data.link
  }
  try {
    let sql = 'INSERT INTO tb_user VALUES(?,?,?,?,?,?,?,?,?)'
    const salt = crypto.randomBytes(64).toString('base64')
    // salt 생성.

    const hashPassword = crypto
      .createHash('sha512')
      .update(password + salt)
      .digest('hex')
    // 암호화.

    const values = [
      null,
      id,
      hashPassword,
      salt,
      name,
      'credentials',
      new Date(),
      new Date(),
      imgSrc,
    ]
    const rst = await queryPromise(sql, values)
    return new Response(JSON.stringify({ result: 'done' }))
  } catch (err: any) {
    console.log(err)
    return new Response(JSON.stringify('error'))
  }
}

// PATCH는 정보 수정. ㅇㅅㅇ;;
export const PATCH = async (req: Request) => {
  // 이미지를 수정할 수도 있으니
  // multipart/data
  // formData로 받아와야 될 듯.
  return NextResponse.json({ result: 'modify' })
}

// DELETE는 회원 탈퇴. ㅂㅂ
export const DELETE = async (req: Request) => {
  const body: reqBody = await req.json()

  // 아이디는 이미 로그인 한 상태니까
  // 비밀번호만 검증 후
  // 맞으면 탈퇴, 아니면 리턴.
  try {
    let sql = 'SELECT user_password, user_salt from tb_user WHERE user_id = ?'
    const chk = await queryPromise(sql, [body.user_id])
    if (chk.length < 1) {
      // 아이디에 맞는 비밀번호를 못 찾음.
      return NextResponse.json({ result: '뭔가가 이상함.' })
    }
    const salt = chk[0].user_salt
    const db_pw = chk[0].user_password
    const hashPassword = crypto
      .createHash('sha512')
      .update(body.password + salt)
      .digest('hex')
    const result = db_pw === hashPassword
    if (result) {
      // 비밀번호 일치.
      sql = 'DELETE FROM tb_user WHERE user_id = ?'
      await queryPromise(sql, [body.user_id])
      return NextResponse.json({ result: '다음에 또 볼 수 있겠죠.' })
    } else {
      return NextResponse.json({ result: '비밀번호가 맞지 않아요.' })
    }
  } catch (err: any) {
    console.log(err)
    return NextResponse.json({ result: '에러에러에러.' })
  }
}

export const OPTIONS = async (req: Request) => {
  const data = await req.formData()
  console.log(data.get('user_id'))
  return NextResponse.json({ result: '테스트 용도' })
}
