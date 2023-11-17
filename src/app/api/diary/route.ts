import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';
import queryPromise from "@/app/lib/db";
export const api = {
    bodyParse: false
};

// POST 작성
// PATCH 수정
// DELETE 삭제
export async function DELETE (req: NextRequest, res: NextResponse) {
    console.log('11111111')
    const data = await req.json()
    const userID = data.id
    // const deletePost = data.get('diary_number') as string
    // const userID= req.body
    
    try {
        let sql = 'SELECT diary_content FROM tb_diary WHERE user_id = ?'
    let values:any = userID
    const result = await queryPromise(sql, [values]);
        console.log("delete function", userID)
        return NextResponse.json({ msg: 'success' });
    }
    catch(err){
        console.log(err);
        return NextResponse.json({result:'error'})
    }
    
};

export async function POST( req: NextRequest, res: NextResponse ) {
    const data = await req.formData();
    const accessToken = req.headers.get('Authorization')?.split('mlru ')[1] as string;
    const title = data.get('title') as string;
    const content = data.get('content') as string;
    const weather = data.get('weather') as string;
    const id = data.get('id') as string;
    const name = data.get('name') as string;
    const imgTit = data.get('imgTit') as string;


    const predictEmo = await axios.post(
        `${process.env.BASE_URL}/api/emotion`,
        {text: content},
        {
            headers: {
                'Authorization': `mlru ${accessToken}`
            }
        }
    );
    console.log(predictEmo.data);  // 감정 숫자.

    const maxEmotion = Object.entries(predictEmo.data).reduce((max: any, [key, value]: any) => {
        return value > max[1] ? [key, value] : max;
      }, ['', -Infinity]);

    const predictSumm = await axios.post(
        `${process.env.BASE_URL}/api/summary`,
        {text: content},
        {
            headers: {
                'Authorization': `mlru ${accessToken}`
            }
        }
    );

    console.log(predictSumm.data); // 내용 요약.

    const predictAdvice = await axios.post(
        `${process.env.BASE_URL}/api/advice`,
        {text:predictSumm.data},
        {
            headers: {
                'Authorization': `mlru ${accessToken}`
            }
        }
    );
    console.log(predictAdvice.data); // 조언
    
    const weatherQuery: { [key: string]: string } = {
        "맑음": "sunny",
        "흐림":"cloudy",
        "비":"rainy",
        "바람":"windy",
        "눈":"snowy"
    };
    const emotionQuery: { [key: string]: string } = {
        "중립": "normal",
        "슬픔": "sadness",
        "분노": "angry",
        "놀람": "amazing",
        "행복": "happiness",
        "불안": "unhappiness"
    };
    const query = 'weather is ' + weatherQuery[weather] + `, feel ${emotionQuery[maxEmotion[0]]} in the picture`;
    let imgSrc = [];
    const predictImg = await axios.post(
        `${process.env.BASE_URL}/api/img`,
        {text: query},
        {
            headers: {
                'Authorization': `mlru ${accessToken}`
            }
        }
    );
    imgSrc.push(predictImg.data.result);
    const img = data.get('img') as File;
    if(img) {
        const fb = new FormData();
        fb.append('image', img);
        const result = await axios.post(
            'https://api.imgur.com/3/upload',
            fb,
            {
                headers: {
                    'Authorization': `Client-ID ${process.env.IMGUR_KEY}`,
                    'Accept': 'application/json'
                }
            }
        );
        imgSrc.push(result.data.data.link);
    }

    try {
        let sql = 'INSERT INTO tb_diary VALUES(?,?,?,?,?,?,?,?,?,?,?,?)';
        let values = [
            null,
            id,
            name,
            title,
            content,
            predictEmo.data,
            weather,
            'pretendard',
            null,
            predictAdvice.data,
            new Date(),
            new Date()
        ];
        const result = await queryPromise(sql, values);
        if(img) {
            sql = 'INSERT INTO tb_image VALUES(?,?,?,?,?,?)';
            values = [null, result.insertId, imgTit, imgSrc, 'user', new Date()];
            const done = await queryPromise(sql, values);
        }
        return NextResponse.json({result:'done'});
    } catch (err) {
        console.log(err);
        return NextResponse.json({result:'error'})
    }
};

export const PUT = async(req: Request) => {
    const data = await req.formData();
    const images: any[] = [];
    data.forEach((v, k) => {
        images.push(v);
    })
    const imgs: any[] = [];

const uploadImages = async () => {
  for (const v of images) {
    const fb = new FormData();
    fb.append('image', v);

    try {
      const result = await axios.post(
        'https://api.imgur.com/3/upload',
        fb,
        {
          headers: {
            'Authorization': `Client-ID ${process.env.IMGUR_KEY}`,
            'Accept': 'application/json'
          }
        }
      );
      imgs.push(result.data.data.link);
    } catch (error) {
      console.log(error);
      return 0;
    }
  }
  return imgs;
};

const result = await uploadImages();
if(result === 0) {
    return NextResponse.json({result:'error'});
}
console.log(result);

    return NextResponse.json({result:imgs})
}