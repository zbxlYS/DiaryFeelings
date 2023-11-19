import axios from 'axios'
import { verifyJwt } from '@/app/lib/jwt'
import { NextApiRequest, NextApiResponse } from 'next'
import queryPromise from '@/app/lib/db'
import { NextResponse } from 'next/server'
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

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 여기에 필요한 SQL 쿼리를 작성
    const sql = 'SELECT * FROM tb_diary ORDER BY created_at DESC LIMIT ?'

    const imgsql = `
    SELECT d.*, i.*
    FROM tb_diary d
    JOIN tb_image i ON d.diary_number = i.diary_number
    ORDER BY d.created_at ASC
    LIMIT ?;
  `

    // 쿼리를 실행하고 결과를 가져오기
    const rows = await queryPromise(sql, ['5']) // Specify the type for rows
    const imgrows = await queryPromise(imgsql, ['5'])
    return NextResponse.json({ result: rows, imgrows: imgrows })
  } catch (error) {
    console.error('에러 발생:', error)
    return NextResponse.json({ result: 'error' })
  }
}
