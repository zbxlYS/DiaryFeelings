import { NextResponse } from 'next/server';
import queryPromise from '@/app/lib/db'

interface ICUser {
    id: number;
    user_id: string;
    user_name: string;
    provider: string;
    craeted_at: Date;
    updated_at: Date;
}

export async function GET() {
    try {
        let sql = 'SELECT * FROM USER'
        const rst: ICUser[] = await queryPromise(sql, []);
        console.log('test')
        // 값이 없다면 no data
        if(rst.length < 1) return NextResponse.json({"result": "no data"})

        return NextResponse.json({"result": rst});
    } catch(err: any) {
        console.log(err);
        return NextResponse.json(err);
    }
}