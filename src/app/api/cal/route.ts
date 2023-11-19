//cal/route.ts
import { NextApiRequest, NextApiResponse } from 'next'
import queryPromise from '@/app/lib/db'
import { NextResponse } from 'next/server'

interface DiaryRow {
  date: string
  diary_emotion: string
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 여기에 필요한 SQL 쿼리를 작성
    const sql =
      'SELECT diary_userDate, diary_emotion FROM tb_diary WHERE user_id = ?'

    // 쿼리를 실행하고 결과를 가져오기
    const rows = await queryPromise(sql, ['test1']) // Specify the type for rows

    // 중간에 로그 추가
    // JSON 형태의 문자열을 파싱하고 첫 번째 값을 숫자로 가져오기

    // 중간에 로그 추가
    // 결과를 JSON으로 응답
    return NextResponse.json({ result: rows })
  } catch (error) {
    console.error('에러 발생:', error)
    return NextResponse.json({ result: 'error' })
  }
}
