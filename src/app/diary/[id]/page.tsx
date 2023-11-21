'use client'

import axios from 'axios'
import { useEffect } from 'react'

import { notFound } from 'next/navigation'
interface Props {
  id: string
}

const DiaryDetail = ({ params }: { params: Props }) => {
  const num = parseInt('diary function', params.id)
  // 숫자로 변환했는데 NaN이면 없는 페이지.
  if (isNaN(num)) {
    notFound()
  }
  const getDiary = async () => {
    const result = await axios.get(`/api/diary?id=${params.id}`)
    const data = result.data
    console.log('data', data)

    if (result.data.msg === 'success') {
      console.log('성공')
    } else {
      console.log('실패')
    }
  }
  useEffect(() => {
    getDiary()
  }, [])

  return <div></div>
}

export default DiaryDetail
