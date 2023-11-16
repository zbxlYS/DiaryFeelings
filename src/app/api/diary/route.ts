import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import queryPromise from '@/app/lib/db'

export const api = {
  bodyParse: false,
}

// PATCH 수정

// POST 작성
export async function POST(req: NextRequest, res: NextResponse) {
  // 클라이언트로부터 전송된 데이터 파싱
  const data = await req.formData()

  // Authorization 헤더에서 액세스 토큰 추출
  const accessToken = req.headers
    .get('Authorization')
    ?.split('mlru ')[1] as string

  // 데이터에서 필요한 정보 추출
  const title = data.get('title') as string
  const content = data.get('content') as string
  const weather = data.get('weather') as string
  const id = data.get('id') as string
  const name = data.get('name') as string
  const imgTit = data.get('imgTit') as string

  // 감정 예측 API 호출
  const predictEmo = await axios.post(
    `${process.env.BASE_URL}/api/emotion`,
    { text: content },
    { headers: { Authorization: `mlru ${accessToken}` } },
  )
  console.log(predictEmo.data) // 감정 숫자.

  // 예측된 감정 중 가장 높은 감정 선택
  const maxEmotion = Object.entries(predictEmo.data).reduce(
    (max: any, [key, value]: any) => {
      return value > max[1] ? [key, value] : max
    },
    ['', -Infinity],
  )

  // 내용 요약 API 호출
  const predictSumm = await axios.post(
    `${process.env.BASE_URL}/api/summary`,
    { text: content },
    { headers: { Authorization: `mlru ${accessToken}` } },
  )
  console.log(predictSumm.data) // 내용 요약.

  // 조언 예측 API 호출
  const predictAdvice = await axios.post(
    `${process.env.BASE_URL}/api/advice`,
    { text: predictSumm.data },
    { headers: { Authorization: `mlru ${accessToken}` } },
  )
  console.log(predictAdvice.data) // 조언

  // 날씨 및 감정을 이용한 이미지 검색 쿼리 작성
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
  const query =
    'weather is ' +
    weatherQuery[weather] +
    `, feel ${emotionQuery[maxEmotion[0]]} in the picture`

  // 이미지 검색 API 호출
  let imgSrc = []
  const predictImg = await axios.post(
    `${process.env.BASE_URL}/api/img`,
    { text: query },
    { headers: { Authorization: `mlru ${accessToken}` } },
  )
  imgSrc.push(predictImg.data.result)

  // 업로드된 이미지가 있는 경우 Imgur API를 통해 이미지 업로드
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
    imgSrc.push(result.data.data.link)
  }

  try {
    // 일기 데이터를 데이터베이스에 삽입
    let sql = 'INSERT INTO tb_diary VALUES(?,?,?,?,?,?,?,?,?,?,?,?)'
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
      new Date(),
    ]
    const result = await queryPromise(sql, values)

    // 이미지가 있는 경우 이미지 데이터를 데이터베이스에 삽입
    if (img) {
      sql = 'INSERT INTO tb_image VALUES(?,?,?,?,?,?)'
      values = [null, result.insertId, imgTit, imgSrc, 'user', new Date()]
      const done = await queryPromise(sql, values)
    }

    return NextResponse.json({ result: 'done' })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ result: 'error' })
  }
}

// PUT 수정
export const PUT = async (req: Request) => {
  // 클라이언트로부터 전송된 데이터 파싱
  const data = await req.formData()
  const images: any[] = []

  // 데이터에서 이미지 추출
  data.forEach((v, k) => {
    images.push(v)
  })

  const imgs: any[] = []

  // 이미지 업로드 함수
  const uploadImages = async () => {
    for (const v of images) {
      const fb = new FormData()
      fb.append('image', v)

      try {
        // Imgur API를 통해 이미지 업로드
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

  // 이미지 업로드 실행
  const result = await uploadImages()

  if (result === 0) {
    return NextResponse.json({ result: 'error' })
  }

  console.log(result)

  return NextResponse.json({ result: imgs })
}
