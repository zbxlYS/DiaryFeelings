'use client'
import { notFound } from 'next/navigation'
import axios from 'axios'
import { useEffect } from 'react'
interface Props {
  id: string
}

const DiaryDetail = ({ params }: { params: Props }) => {
  const num = parseInt(params.id)
  
  const getData = async() => {
    const result = await axios.get(`/api/diary/${num}`)
    console.log(result.data);
  }
  useEffect(() => {
    getData()
  },[num])
  if (isNaN(num)) {
    notFound()
  }
  return <div>자세히 보기</div>
}

export default DiaryDetail
