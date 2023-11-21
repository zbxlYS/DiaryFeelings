import axios from 'axios'
import { verifyJwt } from '@/app/lib/jwt'
import queryPromise from '@/app/lib/db'
import { NextRequest, NextResponse, userAgent } from 'next/server'

type reqBody = {
  text: string
}
type resBody = {
  result: string
}

export async function POST(req: Request) {
  const body: reqBody = await req.json()
  const accessToken = req.headers
    .get('Authorization')
    ?.split('mlru ')[1] as string

  // 헤더에 토큰이 없거나, 토큰 복호화 실패하면 리턴.
  if (!accessToken || !verifyJwt(accessToken)) {
    return new Response(JSON.stringify({ result: 'No Authorization' }))
  }
  try {
    const res = await axios.post(`${process.env.MODEL_URL}/emotion/`, {
      text: body.text,
    })
    const result: resBody = res.data
    return NextResponse.json(result.result)
  } catch (err) {
    console.log(err)
    return NextResponse.json(err)
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const userId = req.nextUrl.searchParams.get('userId') as string
    console.log(userId)
    // 여기에 필요한 SQL 쿼리를 작성
    const sql =
      'SELECT diary_number,diary_emotion,created_at,updated_at FROM tb_diary WHERE user_id = ? ORDER BY created_at DESC  '

    const imgsql = `
    SELECT d.*, i.*
    FROM tb_diary d
    JOIN tb_image i ON d.diary_number = i.diary_number
    ORDER BY d.created_at DESC, d.diary_number DESC
    LIMIT ?;
 `
    // 쿼리를 실행하고 결과를 가져오기
    const rows = await queryPromise(sql, [userId]) // Specify the type for rows
    const imgrows = await queryPromise(imgsql, ['5'])
    return NextResponse.json({ result: rows, imgrows: imgrows })
  } catch (error) {
    console.error('에러 발생:', error)
    return NextResponse.json({ result: 'error' })
  }
}
