import { NextRequest, NextResponse } from 'next/server'
import queryPromise from '@/app/lib/db'
export const api = {
  bodyParse: false,
}

// GET search keyword from DB
export const GET = async (req: NextRequest, res: NextResponse) => {
 try{
  const userId = req.nextUrl.searchParams.get('userId') as string
  const keyword = req.nextUrl.searchParams.get('keyword') as String

/* get diary that corresponding to the keyword */
let sql = `SELECT * FROM tb_diary as A LEFT JOIN tb_image as B ON A.diary_number = B.diary_number
 WHERE A.user_id = ? AND A.diary_content LIKE ?`
  let values = [userId, `%${keyword}%`]
  let result = await queryPromise(sql, values)
  return NextResponse.json({result: result, msg: 'success'})
    } catch(error){
        console.error('DB error', error)
        return NextResponse.json({msg: 'error'})
    }
}
