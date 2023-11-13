import { NextResponse } from 'next/server';
import queryPromise from '@/app/lib/db';

interface reqBody {
  data: {
    user_id: number;
    emotion_img: string;
    user_pw: string;
    user_name: string;
    provider: string;
  };
}

export async function POST(req: Request) {
  try {
    const body: reqBody = await req.json();

    const { user_id, emotion_img, user_pw, user_name, provider } = body.data;

    // 실제 데이터베이스에 데이터를 삽입하는 SQL 쿼리
    const sql = `
      INSERT INTO USER (user_id, emotion_img, user_pw, user_name, provider, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, NOW(), NOW())
    `;

    // 쿼리 실행
    await queryPromise(sql, [user_id, emotion_img, user_pw, user_name, provider]);

    // 성공적인 응답 반환
    const result = { emotion_img };

    // NextResponse 생성자를 사용하여 응답 반환
    return new NextResponse(JSON.stringify(result), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 200,
    });
  } catch (error) {
    console.error('Error processing request:', error);

    // 에러 발생 시 에러 응답 반환
    const result = { result: 'error', error: 'Internal Server Error' };

    // NextResponse 생성자를 사용하여 응답 반환
    return new NextResponse(JSON.stringify(result), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 500,
    });
  }
}
