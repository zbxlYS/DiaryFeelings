import queryPromise from '@/app/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
const crypto = require('crypto')

interface reqBody {
  user_id?: string
  password?: string
  user_name?: string
}

// PATCH 아이디에 따른 정보 제공
export const PATCH = async (req: Request) => {
  const body: reqBody = await req.json()

  try {
    let sql =
      'SELECT user_id,user_name, user_image from tb_user WHERE user_id = ?'
    const chk = await queryPromise(sql, [body.user_id])

    if (chk.length >= 1) {
      // 아이디 존재가 존재하면 아이디,닉네임,사진정보 가져오기
      return NextResponse.json({ result: chk })
    }
  } catch (err: any) {
    console.log(err)
    return NextResponse.json({ result: '에러' })
  }
}

//  PUT 정보 수정

export const PUT = async (req: Request) => {
  const data = await req.formData()
  const img = data.get('img') as File
  const name = data.get('user_name') as string
  const id = data.get('user_id') as string
  const pw = data.get('password') as string

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
  console.log('이미지 주소는', imgSrc)

  try {
    let sql =
      'update tb_user set user_image = ? , user_name = ? , user_password = ? ,user_salt =?  where user_id = ?'

    // salt 생성.
    const salt = crypto.randomBytes(64).toString('base64')
    // 암호화.
    const hashPassword = crypto
      .createHash('sha512')
      .update(pw + salt)
      .digest('hex')
    await queryPromise(sql, [imgSrc, name, hashPassword, salt, id])
    return new Response(JSON.stringify({ result: '완료' }))
  } catch (err: any) {
    return new Response(JSON.stringify('error'))
  }
}

// 현진 감정페이지 목표,다짐 텍스트
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.formData()
    const userDesc = data.get('userDesc') as string
    const userId = data.get('userId') as string
    const sql = `UPDATE tb_user
    SET user_desc = ?
    WHERE user_id = ?;`

    const value = [userDesc, userId]
    const result = await queryPromise(sql, value)
    return NextResponse.json({ result: result }) // NextResponse 객체를 반환하는 방법
  } catch (error) {
    return NextResponse.json({ result: 'error' })
  }
}
