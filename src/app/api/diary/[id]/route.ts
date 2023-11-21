import { NextResponse } from "next/server";
import axios from 'axios';
import moment from "moment";
import queryPromise from "@/app/lib/db";

interface Props {
    id: string;
}


// GET 가져오기
export const GET = async(req: Request, {params}: {params: Props}) => {
    const id = parseInt(params.id);

    try {
        let sql = 'SELECT * FROM tb_diary WHERE diary_number = ?'
        const result = await queryPromise(sql, [id]);
        return NextResponse.json({result: result[0], msg:'success'});
    } catch(err) {
        console.log(err);
        return NextResponse.json({result: 'eror!'})
    }
}

// PATCH 수정하기

// DELETE 삭제하기