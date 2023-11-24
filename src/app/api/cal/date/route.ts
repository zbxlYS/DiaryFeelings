import { NextRequest, NextResponse } from 'next/server'
import queryPromise from '@/app/lib/db'

export const GET = async(req: NextRequest, res: NextResponse) => {
    console.log('ㅎㅇ')
    const date = req.nextUrl.searchParams.get('date') as string
    const user = req.nextUrl.searchParams.get('userId') as string

    let sql = 'SELECT count(*) FROM tb_diary WHERE user_id = ? '
    sql += 'and DATE(created_at) = ?'
    let result = await queryPromise(sql, [user, date])
    const total = result[0]['count(*)']
    sql = `SELECT A.*, B.image_src FROM tb_diary as A LEFT JOIN tb_image as B ON A.diary_number = B.diary_number WHERE A.user_id = ? and DATE(A.created_at) = ?`
    result = await queryPromise(sql, [user, date])
    console.log(result)
    return NextResponse.json({result: result, total: total})
}