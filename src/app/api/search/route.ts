import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import moment from 'moment'
import queryPromise from '@/app/lib/db'
export const api = {
  bodyParse: false,
}

// GET search keyword from DB
export const GET = async (req: NextRequest, res: NextResponse) => {
    try{
        const userId = req.nextUrl.searchParams.get('userId') as string
        const keyword = req.nextUrl.searchParams.get('keyword') as string
    
    let sql = `SELECT * FROM tb_diary WHERE user_id = ? AND diary_content LIKE ?`
    let values = [userId, '%'+keyword+'%']
    
    let result = await queryPromise(sql, values)
    return NextResponse.json({result: result, msg: 'success'})
    } catch(error){
        console.error('DB error', error)
        return NextResponse.json({msg: 'error'})
    }
}
