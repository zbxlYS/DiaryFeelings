import axios from 'axios';
import { NextResponse } from 'next/server';


type reqBody = {
    text: string;
}
type resBody = {
    result: string;
}

export async function POST (req: Request) {
    const body: reqBody = await req.json();
    try {
        const res = await axios.post(`http://127.0.0.1:8000/predict/trans/`,{
            text: body.text
        });
        const result: resBody = res.data
        return NextResponse.json(result.result)
    } catch (err) {
        console.log(err)
        return NextResponse.json(err)
    }
}