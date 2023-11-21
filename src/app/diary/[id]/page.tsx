'use client'

import axios from 'axios'
import { useEffect } from 'react'

interface Props {
  id: string
}

const DiaryDetail = ({ params }: { params: Props }) => {
  console.log('diary function', params.id)
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
