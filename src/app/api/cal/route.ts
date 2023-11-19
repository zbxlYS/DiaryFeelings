//cal/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import queryPromise from '@/app/lib/db';
import { NextResponse } from 'next/server';

interface DiaryRow {
  date: string;
  diary_emotion: string;
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    //  SQL 쿼리
    const userIDs = ['test1', 'test2', 'test3']; // 원하는 여러 개의 user_id 값을 배열화
    const sql = 'SELECT user_id, diary_userDate, diary_emotion FROM tb_diary WHERE user_id IN (?, ?, ?)';
    
    // 쿼리를 실행하고 결과를 가져오기
    const rows = await queryPromise(sql, userIDs);

    // 결과를 JSON으로 응답
    return NextResponse.json({ result: rows });
  } catch (error) {
    console.error('에러 발생:', error);
    return NextResponse.json({ result: 'error' });
  }
}
