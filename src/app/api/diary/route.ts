import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import moment from 'moment'
import queryPromise from '@/app/lib/db'
export const api = {
  bodyParse: false,
}

// GET 가져오기
// POST 작성
// PATCH 수정
// DELETE 삭제
export async function DELETE(req: NextRequest, res: NextResponse) {
  const data = await req.json()
  const userID = data.id
  const diaryNum = data.diary_number

  try {
    // delete in tb_image
    let sql = 'delete from tb_image where diary_number = ?'
    let values: any = diaryNum
    let result = await queryPromise(sql, [values])

    // delete in tb_diary
    sql = 'DELETE FROM tb_diary WHERE user_id = ? AND diary_number = ?'
    values = [userID, diaryNum]
    result = await queryPromise(sql, values)
    return NextResponse.json({ msg: 'success' })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ result: 'error' })
  }
}

export const GET = async (req: NextRequest, res: NextResponse) => {
  // offset, limit
  const curPage = req.nextUrl.searchParams.get('page') as string
  const userId = req.nextUrl.searchParams.get('userId') as string
  const startDate = req.nextUrl.searchParams.get('s') as string
  const endDate = req.nextUrl.searchParams.get('e') as string
  const start = moment(new Date(startDate)).format('YYYY-MM-DD')
  const end = moment(new Date(endDate)).format('YYYY-MM-DD')

  const offset = isNaN((parseInt(curPage) - 1) * 6)
    ? 0
    : (parseInt(curPage) - 1) * 6
  const getNum = 6

  let sql = 'SELECT count(*) FROM tb_diary WHERE user_id = ? '
  sql += `and DATE(diary_userDate) BETWEEN '${start}' and '${end}' ORDER BY diary_userDate DESC`
  let result = await queryPromise(sql, [userId])
  const total = result[0]['count(*)']
  console.log(total)
  sql = `SELECT A.*, B.image_src FROM tb_diary as A LEFT JOIN tb_image as B ON A.diary_number = B.diary_number WHERE A.user_id = ? and DATE(A.diary_userDate) BETWEEN '${start}' and '${end}' ORDER BY A.created_at DESC LIMIT ${getNum} OFFSET ${offset} `
  let values = [userId]
  result = await queryPromise(sql, values)
  return NextResponse.json({ result: result, total: total })
}

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.formData()
  const accessToken = req.headers
    .get('Authorization')
    ?.split('mlru ')[1] as string
  const title = data.get('title') as string
  const content = data.get('content') as string
  const weather = data.get('weather') as string
  const emotion = data.get('emotion') as string
  const fonts = data.get('fonts') as string
  let date: string | Date = data.get('datetime') as string
  date = new Date(date) as Date
  const id = data.get('id') as string
  const name = data.get('name') as string
  const predictEmo = await axios.post(
    `${process.env.BASE_URL}/api/emotion`,
    { text: content },
    {
      headers: {
        Authorization: `mlru ${accessToken}`,
      },
    },
  )
  console.log(predictEmo.data) // 감정 숫자.

  const maxEmotion = Object.entries(predictEmo.data).reduce(
    (max: any, [key, value]: any) => {
      return value > max[1] ? [key, value] : max
    },
    ['', -Infinity],
  )

  const predictSumm = await axios.post(
    `${process.env.BASE_URL}/api/summary`,
    { text: content },
    {
      headers: {
        Authorization: `mlru ${accessToken}`,
      },
    },
  )

  console.log(predictSumm.data) // 내용 요약.

  const predictAdvice = await axios.post(
    `${process.env.BASE_URL}/api/advice`,
    { text: predictSumm.data },
    {
      headers: {
        Authorization: `mlru ${accessToken}`,
      },
    },
  )
  console.log(predictAdvice.data) // 조언

  const weatherQuery: { [key: string]: string } = {
    맑음: 'sunny',
    흐림: 'cloudy',
    비: 'rainy',
    바람: 'windy',
    눈: 'snowy',
  }
  const emotionQuery: { [key: string]: string } = {
    중립: 'normal',
    슬픔: 'sadness',
    분노: 'angry',
    놀람: 'amazing',
    행복: 'happiness',
    불안: 'unhappiness',
  }
  const query = `${weather} day, feel ${
    emotionQuery[maxEmotion[0]]
  } in the picture`
  console.log(query)
  let imgSrc = ''
  const predictImg = await axios.post(
    `${process.env.BASE_URL}/api/img`,
    { text: query },
    {
      headers: {
        Authorization: `mlru ${accessToken}`,
      },
    },
  )
  console.log(predictImg.data)
  imgSrc += `${predictImg.data.result},`
  console.log(imgSrc)
  const img = data.get('img') as File
  if (img) {
    const fb = new FormData()
    fb.append('image', img)
    const result = await axios.post('https://api.imgur.com/3/upload', fb, {
      headers: {
        Authorization: `Client-ID ${process.env.IMGUR_KEY}`,
        Accept: 'application/json',
      },
    })
    imgSrc += `${result.data.data.link}`
  }

  try {
    let sql = 'INSERT INTO tb_diary VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
    let values = [
      null,
      id,
      name,
      title,
      content,
      predictEmo.data,
      weather,
      fonts,
      null,
      predictAdvice.data,
      new Date(),
      new Date(),
      emotion,
      date
    ]
    const result = await queryPromise(sql, values)
    sql = 'INSERT INTO tb_image VALUES(?,?,?,?,?)'
    values = [null, result.insertId, imgSrc, 'user', new Date()]
    const done = await queryPromise(sql, values)
    return NextResponse.json({ result: result })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ result: 'error' })
  }
}

export const PUT = async (req: Request) => {
  const data = await req.formData()
  const images: any[] = []
  data.forEach((v, k) => {
    images.push(v)
  })
  const imgs: any[] = []

  const uploadImages = async () => {
    for (const v of images) {
      const fb = new FormData()
      fb.append('image', v)

      try {
        const result = await axios.post('https://api.imgur.com/3/upload', fb, {
          headers: {
            Authorization: `Client-ID ${process.env.IMGUR_KEY}`,
            Accept: 'application/json',
          },
        })
        imgs.push(result.data.data.link)
      } catch (error) {
        console.log(error)
        return 0
      }
    }
    return imgs
  }

  const result = await uploadImages()
  if (result === 0) {
    return NextResponse.json({ result: 'error' })
  }
  console.log(result)

  return NextResponse.json({ result: imgs })
}
