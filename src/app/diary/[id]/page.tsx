'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

import { notFound } from 'next/navigation'
import { IDiary } from '@/app/types/type'
interface Props {
  id: any
}

const DiaryDetail = ({ params }: { params: Props }) => {
  const [view, setView] = useState<IDiary>()
  const num = parseInt(params.id)
  // 숫자로 변환했는데 NaN이면 없는 페이지.
  if (isNaN(num)) {
    notFound()
  }

  const getDiary = async () => {
    const result = await axios.get(`/api/diary/${num}`)
    const data = result.data
    setView((prev) => data.result)
    console.log('view', data)

    if (result.data.msg === 'success') {
      console.log('Get Diary Success')
    }
  }
  useEffect(() => {
    getDiary()
  }, [num])

  return <div>{view?.diary_title}</div>
}

export default DiaryDetail
